import { type NextRequest, NextResponse } from "next/server"
import { getEmailTemplate } from "@/lib/email-templates"

// Use require for nodemailer to avoid ES6 import issues
const nodemailer = require("nodemailer")

// Validate environment variables
const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "FROM_EMAIL"]
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars)
}

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Additional security options
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      // Connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    })
  } catch (error) {
    console.error("Failed to create SMTP transporter:", error)
    throw new Error("SMTP configuration error")
  }
}

// Input validation
const validateEmailInput = (data: any) => {
  const { to, subject, name, template } = data

  if (!to || !subject || !name || !template) {
    return { isValid: false, error: "Missing required fields" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(to)) {
    return { isValid: false, error: "Invalid email address" }
  }

  // Sanitize inputs
  const sanitizedData = {
    to: to.trim().toLowerCase(),
    subject: subject.trim().substring(0, 200), // Limit subject length
    name: name.trim().substring(0, 100), // Limit name length
    template: template,
    message: data.message ? data.message.trim().substring(0, 1000) : "", // Limit message length
  }

  return { isValid: true, data: sanitizedData }
}

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are present
    if (missingEnvVars.length > 0) {
      return NextResponse.json({ error: "Server configuration error. Please check SMTP settings." }, { status: 500 })
    }

    const body = await request.json()

    // Validate input
    const validation = validateEmailInput(body)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { to, subject, name, template, message } = validation.data!

    // Create transporter
    const transporter = createTransporter()

    // Verify SMTP connection
    try {
      await transporter.verify()
    } catch (error) {
      console.error("SMTP connection failed:", error)
      return NextResponse.json(
        { error: "Email service temporarily unavailable. Please try again later." },
        { status: 503 },
      )
    }

    // Get email template
    const { html, text } = getEmailTemplate(template, {
      name,
      message,
      date: new Date().toLocaleString(),
      subject,
    })

    // Email options
    const mailOptions = {
      from: {
        name: process.env.FROM_NAME || "Secure SMTP Service",
        address: process.env.FROM_EMAIL!,
      },
      to: to,
      subject: subject,
      text: text,
      html: html,
      // Additional headers for better deliverability
      headers: {
        "X-Mailer": "Secure SMTP Service",
        "X-Priority": "3",
      },
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully:", {
      messageId: info.messageId,
      to: to,
      subject: subject,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    })
  } catch (error) {
    console.error("Email sending error:", error)

    // Return appropriate error message based on error type
    let errorMessage = "Failed to send email"

    if (error instanceof Error) {
      if (error.message.includes("authentication")) {
        errorMessage = "SMTP authentication failed. Please check credentials."
      } else if (error.message.includes("connection")) {
        errorMessage = "Unable to connect to email server. Please try again later."
      } else if (error.message.includes("timeout")) {
        errorMessage = "Email sending timed out. Please try again."
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Check if environment variables are configured
    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "SMTP not configured",
          missingVars: missingEnvVars,
        },
        { status: 500 },
      )
    }

    // Test SMTP connection
    const transporter = createTransporter()
    await transporter.verify()

    return NextResponse.json({
      status: "healthy",
      message: "SMTP service is operational",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "SMTP service unavailable",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
