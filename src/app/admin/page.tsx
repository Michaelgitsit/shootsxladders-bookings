'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Booking {
  id: number;
  booking_date: string;
  booking_time: string;
  location: string;
  customer_email: string;
  customer_name: string;
  payment_status: string;
  created_at: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings || []);
        } else {
          setError('Failed to fetch bookings');
        }
      } catch {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = (dateFilter?: string) => {
    let filteredBookings = bookingsWithCompany;
    
    if (dateFilter) {
      filteredBookings = bookingsWithCompany.filter(booking => booking.booking_date === dateFilter);
    }

    // Sort by time
    filteredBookings.sort((a, b) => {
      const timeA = a.booking_time;
      const timeB = b.booking_time;
      return timeA.localeCompare(timeB);
    });

    // Create CSV content
    const headers = ['Date', 'Time', 'Customer Name', 'Email', 'Company', 'Location', 'Status', 'Booked On'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(booking => [
        formatDate(booking.booking_date),
        booking.booking_time,
        `"${booking.customer_name || ''}"`,
        `"${booking.customer_email || ''}"`,
        `"${(booking as { company?: string }).company || ''}"`,
        `"${booking.location}"`,
        booking.payment_status,
        formatDateTime(booking.created_at)
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const filename = dateFilter 
      ? `bookings-${dateFilter}.csv`
      : `all-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get unique dates for filtering
  const availableDates = [...new Set(bookingsWithCompany.map(booking => booking.booking_date))].sort();

  // Add company field to bookings if missing (for backwards compatibility)
  const bookingsWithCompany = bookings.map(booking => ({
    ...booking,
    company: (booking as { company?: string }).company || ''
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#2C2C2C]">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl text-[#2C2C2C] font-light mb-8">
          Booking Management
        </h1>
        
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-lg text-[#6B6B6B]">
              Total Bookings: <span className="font-medium text-[#2C2C2C]">{bookingsWithCompany.length}</span>
            </div>
            <div className="text-lg text-[#6B6B6B]">
              Confirmed: <span className="font-medium text-green-600">
                {bookingsWithCompany.filter(b => b.payment_status === 'confirmed').length}
              </span>
            </div>
            <div className="text-lg text-[#6B6B6B]">
              Pending: <span className="font-medium text-orange-600">
                {bookingsWithCompany.filter(b => b.payment_status === 'pending').length}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => exportToCSV()}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                📊 Export All
              </button>
            </div>
          </div>

          {/* Date Filter and Export */}
          {availableDates.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-[#2C2C2C] mb-3">Export by Date:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {availableDates.map(date => {
                  const dateBookings = bookingsWithCompany.filter(b => b.booking_date === date);
                  const confirmedCount = dateBookings.filter(b => b.payment_status === 'confirmed').length;
                  const pendingCount = dateBookings.filter(b => b.payment_status === 'pending').length;
                  
                  return (
                    <button
                      key={date}
                      onClick={() => exportToCSV(date)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                    >
                      <div className="font-medium text-[#2C2C2C] text-sm">
                        {formatDate(date)}
                      </div>
                      <div className="text-xs text-[#6B6B6B] mt-1">
                        {confirmedCount} confirmed, {pendingCount} pending
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        📥 Export CSV
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {bookingsWithCompany.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-[#6B6B6B] text-lg">No bookings yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-[#2C2C2C] font-medium mb-2">
                        {booking.customer_name || 'No name provided'}
                      </h3>
                      <p className="text-[#6B6B6B]">{booking.customer_email}</p>
                      <p className="text-[#6B6B6B] text-sm">
                        Booked: {formatDateTime(booking.created_at)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-[#2C2C2C] mb-1">
                        {formatDate(booking.booking_date)}
                      </p>
                      <p className="text-[#6B6B6B] mb-1">
                        Time: {booking.booking_time}
                      </p>
                      <p className="text-[#6B6B6B] text-sm">
                        Location: {booking.location}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.payment_status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {booking.payment_status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
