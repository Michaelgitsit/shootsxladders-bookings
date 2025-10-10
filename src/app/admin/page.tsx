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
          <div className="text-lg text-[#6B6B6B]">
            Total Bookings: <span className="font-medium text-[#2C2C2C]">{bookings.length}</span>
          </div>
          <div className="text-lg text-[#6B6B6B]">
            Confirmed: <span className="font-medium text-green-600">
              {bookings.filter(b => b.payment_status === 'confirmed').length}
            </span>
          </div>
          <div className="text-lg text-[#6B6B6B]">
            Pending: <span className="font-medium text-orange-600">
              {bookings.filter(b => b.payment_status === 'pending').length}
            </span>
          </div>
        </div>

        {bookings.length === 0 ? (
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
