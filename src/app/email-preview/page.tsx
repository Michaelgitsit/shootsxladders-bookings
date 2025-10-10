'use client';

export default function EmailPreviewPage() {
  const sampleBooking = {
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    formattedDate: 'Saturday, November 8, 2025',
    bookingTime: '9:00 AM',
    location: '118 E 8th St, Georgetown, TX 78626'
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2C2C2C] font-light mb-8">
          Email Preview
        </h1>
        
        <div className="mb-6">
          <h2 className="text-xl text-[#6B6B6B] mb-2">Business Owner Notification Email</h2>
          <p className="text-[#6B6B6B]">This is what you&apos;ll receive when a customer books a session</p>
        </div>

        {/* Email Preview */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Email Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">To: shootsandladders@gmail.com</div>
                <div className="text-sm text-gray-600">From: Shoots & Ladders &lt;bookings@shootsxladders.com&gt;</div>
              </div>
              <div className="text-sm text-gray-600">📧</div>
            </div>
            <div className="mt-2">
              <div className="font-medium text-gray-900">
                Subject: 🎉 New Booking Confirmed - {sampleBooking.formattedDate} at {sampleBooking.bookingTime}
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                New Booking Confirmed! 🎉
              </h2>
              
              <p className="text-gray-700 mb-6">
                A customer has successfully booked a photography session.
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Details:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2"><strong>Name:</strong> {sampleBooking.customerName}</p>
                  <p><strong>Email:</strong> {sampleBooking.customerEmail}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Session Details:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2"><strong>Date:</strong> {sampleBooking.formattedDate}</p>
                  <p className="mb-2"><strong>Time:</strong> {sampleBooking.bookingTime}</p>
                  <p><strong>Location:</strong> {sampleBooking.location}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">
                  <strong>Payment Status:</strong> <span className="text-green-600 font-medium">✅ Confirmed</span>
                </p>
              </div>

              <hr className="my-6 border-gray-200" />
              
              <p className="text-sm text-gray-500">
                This booking was automatically confirmed after successful payment processing.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Confirmation Email Preview */}
        <div className="mt-12">
          <h2 className="text-xl text-[#6B6B6B] mb-2">Customer Confirmation Email</h2>
          <p className="text-[#6B6B6B] mb-6">This is what the customer receives</p>

          <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">To: {sampleBooking.customerEmail}</div>
                  <div className="text-sm text-gray-600">From: Shoots &amp; Ladders &lt;bookings@shootsxladders.com&gt;</div>
                </div>
                <div className="text-sm text-gray-600">📧</div>
              </div>
              <div className="mt-2">
                <div className="font-medium text-gray-900">
                  Subject: Your Holiday Portrait Session is Confirmed! 📸
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Holiday Portrait Session is Confirmed! 📸
                </h2>
                
                <p className="text-gray-700 mb-4">
                  Hi {sampleBooking.customerName},
                </p>
                
                <p className="text-gray-700 mb-6">
                  Thank you for booking with Shoots &amp; Ladders! We&apos;re excited to capture your holiday memories.
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Session Details:</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="mb-2"><strong>Date:</strong> {sampleBooking.formattedDate}</p>
                    <p className="mb-2"><strong>Time:</strong> {sampleBooking.bookingTime}</p>
                    <p><strong>Location:</strong> {sampleBooking.location}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Expect:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Professional holiday portrait session</li>
                    <li>High-quality digital photos delivered within 48 hours</li>
                    <li>Fun and relaxed atmosphere</li>
                    <li>Perfect for holiday cards and family memories</li>
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Need to reschedule?</strong> Please contact us at least 24 hours in advance.
                  </p>
                </div>

                <p className="text-gray-700 mb-4">
                  We can&apos;t wait to work with you!
                </p>

                <p className="text-gray-700">
                  Best regards,<br />
                  The Shoots &amp; Ladders Team
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/admin" 
            className="inline-block bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
