import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
};

export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        const transporter = createTransporter();

        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            html,
        });

        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error };
    }
}

// Email templates
export const emailTemplates = {
    // Email to business owner when new contact form is submitted
    newContactNotification: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #8B5CF6; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #8B5CF6; }
        .footer { text-align: center; margin-top: 20px; color: #6B7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          <div class="field">
            <div class="label">Service Interested:</div>
            <div class="value">${data.service}</div>
          </div>
          ${data.preferredDate ? `
          <div class="field">
            <div class="label">Preferred Date:</div>
            <div class="value">${data.preferredDate}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${data.message}</div>
          </div>
          <div class="footer">
            <p>Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,

    // Confirmation email to client
    clientConfirmation: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .message { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6B7280; font-size: 14px; }
        .cta { display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <div class="message">
            <p>Thank you for your interest in my services. I've received your message and will get back to you within 24 hours.</p>
            <p><strong>Service you're interested in:</strong> ${data.service}</p>
            ${data.preferredDate ? `<p><strong>Your preferred date:</strong> ${data.preferredDate}</p>` : ''}
          </div>
          <p>In the meantime, feel free to explore my social media for more insights into tarot reading and energy healing.</p>
          <p>Looking forward to connecting with you!</p>
          <p><strong>With love and light,</strong><br>Sharrvarri</p>
          <div class="footer">
            <p>🔮 Tarot Reading | 🌟 Energy Healing | 💎 Crystal Therapy</p>
            <p style="font-size: 12px;">This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
};
