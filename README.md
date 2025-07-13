# Secure SMTP Email Service

A professional, secure email-sending service built with Next.js, TypeScript, and Nodemailer. Features encrypted SMTP connections, multiple provider support, and beautiful HTML email templates.

## 🚀 Features

- **Secure SMTP Configuration**: TLS/SSL encryption enforced
- **Multiple SMTP Providers**: Gmail, SendGrid, Mailgun, AWS SES, Outlook
- **Professional Email Templates**: HTML templates with inline CSS
- **Environment Variable Security**: No hardcoded credentials
- **Input Validation & Sanitization**: Prevents injection attacks
- **Error Handling**: Comprehensive error handling and logging
- **Real-time Testing**: Send test emails to real addresses
- **Health Check Endpoint**: Monitor SMTP service status

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- SMTP provider account (Gmail, SendGrid, etc.)
- Environment variables configured

## 🛠️ Installation

1. **Clone and install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment variables:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

3. **Edit `.env.local` with your SMTP credentials:**
   \`\`\`env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FROM_EMAIL=your-email@gmail.com
   FROM_NAME=Your App Name
   \`\`\`

4. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 SMTP Provider Setup

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → App passwords
3. Use the 16-character app password in `SMTP_PASS`

### SendGrid Setup
1. Create SendGrid account
2. Generate API key
3. Use `apikey` as `SMTP_USER` and API key as `SMTP_PASS`

### Mailgun Setup
1. Create Mailgun account
2. Add and verify your domain
3. Use SMTP credentials from Mailgun dashboard

### AWS SES Setup
1. Set up AWS SES and verify domain/email
2. Create SMTP credentials in SES console
3. Use provided SMTP username and password

## 📧 Email Templates

The service includes three professional email templates:

1. **Welcome Email**: User onboarding with call-to-action
2. **Notification Email**: System alerts and updates
3. **Custom Email**: Flexible template for custom messages

All templates feature:
- Responsive design
- Inline CSS for email client compatibility
- Dynamic content placeholders
- Professional styling
- Plain text fallbacks

## 🔒 Security Features

- **TLS/SSL Encryption**: All SMTP connections encrypted
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Email addresses and content validated
- **Sanitization**: User inputs sanitized to prevent injection
- **Connection Timeouts**: Prevents hanging connections
- **Error Handling**: Secure error messages without exposing internals

## 🧪 Testing

### Send Test Email
1. Open the application in your browser
2. Fill out the test form with recipient details
3. Choose an email template
4. Click "Send Email"

### Health Check
Visit `/api/send-email` (GET request) to check SMTP service status.

### API Usage
\`\`\`javascript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'recipient@example.com',
    subject: 'Test Email',
    name: 'John Doe',
    template: 'welcome'
  })
})
\`\`\`

## 📊 Error Handling

The service handles various error scenarios:
- SMTP authentication failures
- Connection timeouts
- Invalid email addresses
- Server downtime
- Rate limiting

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
Ensure all SMTP environment variables are set in your production environment.

## 📈 Monitoring

- Health check endpoint: `GET /api/send-email`
- Console logging for sent emails
- Error tracking and reporting

## 🔧 Customization

### Adding New Templates
1. Add template case in `lib/email-templates.ts`
2. Create HTML and text versions
3. Update TypeScript types

### Custom SMTP Providers
Add new provider configurations in the `.env.example` file and update documentation.

## 📝 Best Practices

1. **Use App Passwords**: For Gmail and other providers requiring 2FA
2. **Verify Domains**: Set up SPF, DKIM, and DMARC records
3. **Monitor Reputation**: Keep track of bounce rates and spam reports
4. **Rate Limiting**: Implement rate limiting for production use
5. **Logging**: Monitor email sending for debugging and analytics

## 🐛 Troubleshooting

### Common Issues

**Authentication Failed**
- Verify SMTP credentials
- Check if 2FA is enabled (Gmail requires App Password)
- Ensure correct SMTP host and port

**Connection Timeout**
- Check firewall settings
- Verify SMTP host is accessible
- Try different ports (587, 465, 25)

**Emails Not Delivered**
- Check spam folder
- Verify sender reputation
- Set up proper DNS records (SPF, DKIM, DMARC)

## 📄 License

MIT License - feel free to use this in your projects!
