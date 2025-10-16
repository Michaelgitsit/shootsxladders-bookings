import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, date, message } = body;

    // Validate required fields
    if (!name || !email || !date || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email notification to business
    const { error } = await resend.emails.send({
      from: 'Shoots & Ladders <bookings@shootsxladders.com>',
      to: ['shoots.ladders.photo@gmail.com'],
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #F5F3ED; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border: 1px solid #E5E3DC; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
              .value { color: #2C2C2C; font-size: 16px; margin-top: 5px; }
              .footer { background: #F5F3ED; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6B6B6B; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; color: #2C2C2C; font-size: 24px; font-weight: 300; letter-spacing: 2px;">New Contact Inquiry</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}" style="color: #D4C5A9; text-decoration: none;">${email}</a></div>
                </div>
                
                ${company ? `
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Preferred Date</div>
                  <div class="value">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p style="margin: 0;">Shoots & Ladders - Elevated Event Portraits</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send inquiry email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Inquiry sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

