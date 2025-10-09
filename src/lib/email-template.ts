export function getConfirmationEmailHtml(
  customerName: string,
  date: string,
  time: string,
  location: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - Shoots & Ladders</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background-color: #FAFAF8;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #F5F3ED;
      padding: 40px 40px 30px;
      text-align: center;
      border-bottom: 1px solid #E5E3DC;
    }
    .logo-text {
      font-size: 20px;
      letter-spacing: 0.2em;
      color: #2C2C2C;
      font-weight: 300;
      text-transform: uppercase;
      margin: 0;
    }
    .content {
      padding: 50px 40px;
    }
    .title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 32px;
      color: #2C2C2C;
      font-weight: 300;
      line-height: 1.3;
      margin: 0 0 20px;
    }
    .subtitle {
      font-size: 16px;
      color: #6B6B6B;
      line-height: 1.6;
      margin: 0 0 40px;
    }
    .booking-details {
      background-color: #F5F3ED;
      border-radius: 12px;
      padding: 30px;
      margin: 0 0 40px;
    }
    .detail-row {
      margin-bottom: 20px;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .detail-label {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
    }
    .detail-value {
      font-size: 18px;
      color: #2C2C2C;
      font-weight: 500;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 22px;
      color: #2C2C2C;
      font-weight: 500;
      margin: 0 0 15px;
    }
    .section-content {
      font-size: 15px;
      color: #6B6B6B;
      line-height: 1.7;
    }
    .section-content ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .section-content li {
      margin-bottom: 8px;
    }
    .highlight-box {
      background-color: #D4C5A9;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .highlight-text {
      font-size: 15px;
      color: #2C2C2C;
      margin: 0;
      line-height: 1.6;
    }
    .footer {
      background-color: #F5F3ED;
      padding: 30px 40px;
      text-align: center;
      border-top: 1px solid #E5E3DC;
    }
    .footer-text {
      font-size: 13px;
      color: #999;
      line-height: 1.6;
      margin: 0 0 10px;
    }
    .footer-link {
      color: #D4C5A9;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo-text">Shoots & Ladders</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">Your Holiday Portrait Session is Confirmed!</h2>
      <p class="subtitle">
        Thank you${customerName ? `, ${customerName},` : ''} for booking with Shoots & Ladders. We're thrilled to capture your family's special moments this holiday season.
      </p>

      <!-- Booking Details -->
      <div class="booking-details">
        <div class="detail-row">
          <div class="detail-label">Date</div>
          <div class="detail-value">${date}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Time</div>
          <div class="detail-value">${time}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Location</div>
          <div class="detail-value">${location}</div>
        </div>
      </div>

      <!-- What to Expect -->
      <div class="section">
        <h3 class="section-title">What to Expect</h3>
        <div class="section-content">
          <ul>
            <li><strong>Session Duration:</strong> Your portrait session will last approximately 20 minutes</li>
            <li><strong>Arrive Early:</strong> Please arrive 5 minutes before your scheduled time</li>
            <li><strong>Wardrobe:</strong> Coordinate outfits in complementary colors for the best results</li>
            <li><strong>Photo Delivery:</strong> Your professionally edited photos will be available within 7-10 business days</li>
          </ul>
        </div>
      </div>

      <!-- Preparation Tips -->
      <div class="section">
        <h3 class="section-title">Preparation Tips</h3>
        <div class="section-content">
          <ul>
            <li>Choose outfits that make you feel confident and comfortable</li>
            <li>Avoid overly busy patterns or matching outfits</li>
            <li>Bring any props or accessories you'd like to include</li>
            <li>Well-rested children photograph best—schedule accordingly!</li>
          </ul>
        </div>
      </div>

      <!-- Highlight Box -->
      <div class="highlight-box">
        <p class="highlight-text">
          <strong>Important:</strong> Your $20 deposit has been processed and secures your time slot. This deposit will be applied to your final package purchase.
        </p>
      </div>

      <!-- Contact Section -->
      <div class="section">
        <h3 class="section-title">Need to Make Changes?</h3>
        <div class="section-content">
          If you need to reschedule or have any questions, please contact us at least 48 hours before your session. We're here to help make your portrait experience perfect!
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        <strong>Shoots & Ladders</strong><br>
        Creating timeless family memories
      </p>
      <p class="footer-text">
        <a href="https://shootsxladders.com" class="footer-link">shootsxladders.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function getConfirmationEmailText(
  customerName: string,
  date: string,
  time: string,
  location: string
) {
  return `
SHOOTS & LADDERS
Your Holiday Portrait Session is Confirmed!

Thank you${customerName ? `, ${customerName},` : ''} for booking with Shoots & Ladders. We're thrilled to capture your family's special moments this holiday season.

BOOKING DETAILS
Date: ${date}
Time: ${time}
Location: ${location}

WHAT TO EXPECT
- Session Duration: Your portrait session will last approximately 20 minutes
- Arrive Early: Please arrive 5 minutes before your scheduled time
- Wardrobe: Coordinate outfits in complementary colors for the best results
- Photo Delivery: Your professionally edited photos will be available within 7-10 business days

PREPARATION TIPS
- Choose outfits that make you feel confident and comfortable
- Avoid overly busy patterns or matching outfits
- Bring any props or accessories you'd like to include
- Well-rested children photograph best—schedule accordingly!

IMPORTANT: Your $20 deposit has been processed and secures your time slot. This deposit will be applied to your final package purchase.

NEED TO MAKE CHANGES?
If you need to reschedule or have any questions, please contact us at least 48 hours before your session. We're here to help make your portrait experience perfect!

---
Shoots & Ladders
Creating timeless family memories
shootsxladders.com
  `.trim();
}
