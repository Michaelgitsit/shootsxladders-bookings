"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking the session
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4C5A9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] font-light">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3ED] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-light text-center text-[#2C2C2C] mb-4 tracking-[0.05em]">
          Booking Confirmed!
        </h1>

        {/* Message */}
        <p className="text-lg text-[#6B6B6B] text-center mb-8 font-light leading-relaxed">
          Thank you for booking your Holiday Family Portrait session with Shoots & Ladders!
        </p>

        {/* Details */}
        <div className="bg-[#F5F3ED] rounded-lg p-6 mb-8">
          <h2 className="font-serif text-xl font-medium text-[#2C2C2C] mb-4">What&apos;s Next?</h2>
          <ul className="space-y-3 text-[#6B6B6B] font-light">
            <li className="flex items-start">
              <span className="text-[#D4C5A9] mr-2">✓</span>
              <span>You&apos;ll receive a confirmation email shortly with all the details</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#D4C5A9] mr-2">✓</span>
              <span>We&apos;ll send you a reminder 24 hours before your session</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#D4C5A9] mr-2">✓</span>
              <span>Arrive 5-10 minutes early to ensure we start on time</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#D4C5A9] mr-2">✓</span>
              <span>Your deposit is non-refundable but can be transferred to another date</span>
            </li>
          </ul>
        </div>

        {/* Session ID */}
        {sessionId && (
          <div className="mb-8 text-center">
            <p className="text-sm text-[#6B6B6B] font-light">
              Confirmation ID: <span className="font-mono text-[#2C2C2C]">{sessionId.slice(-10)}</span>
            </p>
          </div>
        )}

        {/* Important Info */}
        <div className="border-t border-[#E5E3DC] pt-6 mb-8">
          <h3 className="font-serif text-lg font-medium text-[#2C2C2C] mb-3">Preparation Tips</h3>
          <ul className="space-y-2 text-[#6B6B6B] font-light text-sm">
            <li>• Plan coordinating outfits (not matching!) in warm, holiday tones</li>
            <li>• Avoid logos, busy patterns, or neon colors</li>
            <li>• Bring a few outfit options if you&apos;d like variety</li>
            <li>• Keep makeup natural and avoid heavy powder (it can look harsh in photos)</li>
            <li>• Bring any props or special items you&apos;d like to include</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/"
            className="flex-1 text-center bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] px-6 py-3 rounded-lg font-medium tracking-wider transition-all"
          >
            Return Home
          </Link>
          <a 
            href="https://www.shootsxladders.com"
            className="flex-1 text-center bg-[#F5F3ED] hover:bg-[#E5E3DC] text-[#2C2C2C] px-6 py-3 rounded-lg font-medium tracking-wider transition-all"
          >
            View Portfolio
          </a>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-sm text-[#6B6B6B] font-light">
          <p>Questions? Contact us at{' '}
            <a href="mailto:shootsandladders@gmail.com" className="text-[#D4C5A9] hover:underline">
              shootsandladders@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F3ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4C5A9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] font-light">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

