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
      subject: `New Booking Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; background-color: #FAFAF8; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #F5F3ED; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 40px 30px; border-left: 1px solid #E5E3DC; border-right: 1px solid #E5E3DC; }
              .field { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #F5F3ED; }
              .field:last-child { border-bottom: none; }
              .label { font-weight: 600; color: #6B6B6B; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
              .value { color: #2C2C2C; font-size: 16px; line-height: 1.6; }
              .value a { color: #D4C5A9; text-decoration: none; font-weight: 500; }
              .footer { background: #F5F3ED; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E5E3DC; }
              .footer p { margin: 5px 0; }
              .title { margin: 0; color: #2C2C2C; font-size: 28px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">New Booking Inquiry</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
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
                <p style="margin: 0; font-weight: 500;">Shoots & Ladders</p>
                <p style="margin: 5px 0 0 0; font-size: 11px; letter-spacing: 1px;">ELEVATED EVENT PORTRAITS</p>
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

