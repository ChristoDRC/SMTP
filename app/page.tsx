"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

interface EmailData {
  to: string
  subject: string
  name: string
  message: string
  template: "welcome" | "notification" | "custom"
}

export default function EmailTestPage() {
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "Test Email from Secure SMTP Service",
    name: "",
    message: "",
    template: "welcome",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: "Email sent successfully!" })
        // Reset form
        setEmailData({
          to: "",
          subject: "Test Email from Secure SMTP Service",
          name: "",
          message: "",
          template: "welcome",
        })
      } else {
        setResult({ success: false, message: data.error || "Failed to send email" })
      }
    } catch (error) {
      setResult({ success: false, message: "Network error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof EmailData, value: string) => {
    setEmailData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Secure SMTP Service</h1>
          </div>
          <p className="text-lg text-gray-600">Professional email sending with encrypted SMTP connections</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Send Test Email
              </CardTitle>
              <CardDescription>Test the secure SMTP email service with real email delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="to">Recipient Email</Label>
                  <Input
                    id="to"
                    type="email"
                    placeholder="recipient@example.com"
                    value={emailData.to}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="name">Recipient Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={emailData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Email subject"
                    value={emailData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="template">Email Template</Label>
                  <select
                    id="template"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={emailData.template}
                    onChange={(e) =>
                      handleInputChange("template", e.target.value as "welcome" | "notification" | "custom")
                    }
                  >
                    <option value="welcome">Welcome Email</option>
                    <option value="notification">Notification Email</option>
                    <option value="custom">Custom Message</option>
                  </select>
                </div>

                {emailData.template === "custom" && (
                  <div>
                    <Label htmlFor="message">Custom Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your custom message here..."
                      value={emailData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                    />
                  </div>
                )}

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending Email...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
              </form>

              {result && (
                <Alert
                  className={`mt-4 ${result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  {result.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                    {result.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>Configure your SMTP credentials and start sending emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Environment Variables</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file:
                </p>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {`# Gmail SMTP (App Password required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Your App Name

# Alternative: SendGrid
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_USER=apikey
# SMTP_PASS=your-sendgrid-api-key
# FROM_EMAIL=noreply@yourdomain.com
# FROM_NAME=Your App Name`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. SMTP Providers</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • <strong>Gmail:</strong> Requires App Password (2FA enabled)
                  </li>
                  <li>
                    • <strong>SendGrid:</strong> Use API key as password
                  </li>
                  <li>
                    • <strong>Mailgun:</strong> SMTP credentials from dashboard
                  </li>
                  <li>
                    • <strong>AWS SES:</strong> IAM user with SES permissions
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Security Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• TLS/SSL encryption enforced</li>
                  <li>• Environment variable credential storage</li>
                  <li>• Input validation and sanitization</li>
                  <li>• Error handling and logging</li>
                  <li>• Rate limiting ready</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Templates Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Professional HTML email templates with dynamic content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Welcome Email Template</h3>
                <div className="border rounded p-4 bg-gray-50 text-xs">
                  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px" }}>
                    <h1 style={{ color: "#0066cc", marginBottom: "20px" }}>Welcome, John!</h1>
                    <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
                      Thank you for joining our platform. We're excited to have you on board!
                    </p>
                    <div
                      style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}
                    >
                      <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                        Account created on: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "30px" }}>
                      Best regards,
                      <br />
                      Your App Team
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Notification Email Template</h3>
                <div className="border rounded p-4 bg-gray-50 text-xs">
                  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px" }}>
                    <h1 style={{ color: "#dc3545", marginBottom: "20px" }}>Important Notification</h1>
                    <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
                      Hello John, we have an important update for your account.
                    </p>
                    <div
                      style={{
                        backgroundColor: "#fff3cd",
                        padding: "15px",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        border: "1px solid #ffeaa7",
                      }}
                    >
                      <p style={{ margin: "0", color: "#856404" }}>⚠️ This is a system-generated notification</p>
                    </div>
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "30px" }}>
                      Sent on: {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
