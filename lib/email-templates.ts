interface TemplateData {
  name: string
  message?: string
  date: string
  subject: string
}

export function getEmailTemplate(
  template: "welcome" | "notification" | "custom",
  data: TemplateData,
): { html: string; text: string } {
  const { name, message, date, subject } = data

  const baseStyles = `
    <style>
      body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
      .content { background: #ffffff; padding: 30px; }
      .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
      .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      .alert { padding: 15px; border-radius: 5px; margin: 20px 0; }
      .alert-info { background: #d1ecf1; border: 1px solid #bee5eb; color: #0c5460; }
      .alert-warning { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; }
      h1 { margin: 0 0 20px 0; }
      p { line-height: 1.6; margin: 0 0 15px 0; }
    </style>
  `

  switch (template) {
    case "welcome":
      return {
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome, ${name}!</h1>
              </div>
              <div class="content">
                <p>Thank you for joining our platform. We're excited to have you on board!</p>
                
                <div class="alert alert-info">
                  <strong>🚀 Getting Started:</strong><br>
                  Your account has been successfully created and is ready to use.
                </div>
                
                <p>Here's what you can do next:</p>
                <ul>
                  <li>Complete your profile setup</li>
                  <li>Explore our features and tools</li>
                  <li>Connect with our community</li>
                </ul>
                
                <a href="#" class="button">Get Started</a>
                
                <p>If you have any questions, don't hesitate to reach out to our support team.</p>
              </div>
              <div class="footer">
                <p>Account created on: <strong>${date}</strong></p>
                <p>Best regards,<br>Your App Team</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>This email was sent to you because you created an account with us.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Welcome, ${name}!

Thank you for joining our platform. We're excited to have you on board!

Getting Started:
Your account has been successfully created and is ready to use.

Here's what you can do next:
- Complete your profile setup
- Explore our features and tools
- Connect with our community

If you have any questions, don't hesitate to reach out to our support team.

Account created on: ${date}

Best regards,
Your App Team

This email was sent to you because you created an account with us.
        `,
      }

    case "notification":
      return {
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 Important Notification</h1>
              </div>
              <div class="content">
                <p>Hello ${name},</p>
                
                <p>We have an important update regarding your account that requires your attention.</p>
                
                <div class="alert alert-warning">
                  <strong>⚠️ System Notification:</strong><br>
                  This is an automated message from our system.
                </div>
                
                <p>Please review the following information:</p>
                <ul>
                  <li>Notification sent on: ${date}</li>
                  <li>Account status: Active</li>
                  <li>Action required: Review account settings</li>
                </ul>
                
                <a href="#" class="button">Review Account</a>
                
                <p>If you believe this notification was sent in error, please contact our support team immediately.</p>
              </div>
              <div class="footer">
                <p>Notification sent on: <strong>${date}</strong></p>
                <p>This is an automated message. Please do not reply to this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>© 2024 Your App Name. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Important Notification

Hello ${name},

We have an important update regarding your account that requires your attention.

System Notification:
This is an automated message from our system.

Please review the following information:
- Notification sent on: ${date}
- Account status: Active
- Action required: Review account settings

If you believe this notification was sent in error, please contact our support team immediately.

Notification sent on: ${date}

This is an automated message. Please do not reply to this email.

© 2024 Your App Name. All rights reserved.
        `,
      }

    case "custom":
      return {
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 ${subject}</h1>
              </div>
              <div class="content">
                <p>Hello ${name},</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  ${message ? message.replace(/\n/g, "<br>") : "This is a custom email message."}
                </div>
                
                <p>Thank you for your time and attention.</p>
              </div>
              <div class="footer">
                <p>Message sent on: <strong>${date}</strong></p>
                <p>Best regards,<br>Your App Team</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>© 2024 Your App Name. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
${subject}

Hello ${name},

${message || "This is a custom email message."}

Thank you for your time and attention.

Message sent on: ${date}

Best regards,
Your App Team

© 2024 Your App Name. All rights reserved.
        `,
      }

    default:
      throw new Error("Invalid email template")
  }
}

// Utility function to create plain text from HTML
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim()
}
