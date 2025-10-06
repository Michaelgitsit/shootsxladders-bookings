'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[480px] mx-auto px-6 py-6">
        {/* Header */}
        <header className="text-center mb-10 pb-6 border-b border-[#E5E3DC]">
          <h1 className="text-base tracking-[0.2em] text-[#2C2C2C] font-light uppercase">
            Shoots & Ladders
          </h1>
        </header>

        {/* Success Message */}
        <main className="text-center py-12">
          <div className="mb-8">
            <div className="w-20 h-20 bg-[#D4C5A9] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-[#2C2C2C]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="font-serif text-4xl text-[#2C2C2C] font-light leading-tight mb-4">
              Booking Confirmed!
            </h2>
            
            <p className="text-[#6B6B6B] text-base leading-relaxed mb-8 max-w-md mx-auto">
              Thank you for your $20 deposit. Your holiday family portrait session has been confirmed.
            </p>
          </div>

          <Card className="bg-[#F5F3ED] border-none p-6 rounded-2xl mb-8 text-left">
            <h3 className="font-serif text-xl text-[#2C2C2C] mb-4 font-medium">
              What's Next?
            </h3>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li className="flex items-start gap-3">
                <span className="text-[#D4C5A9] font-bold">1.</span>
                <span>Check your email for a confirmation with all session details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4C5A9] font-bold">2.</span>
                <span>The remaining balance is due at your session</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4C5A9] font-bold">3.</span>
                <span>Bring your family ready for beautiful holiday portraits!</span>
              </li>
            </ul>
          </Card>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] text-base font-medium tracking-wider rounded-xl transition-all"
          >
            Return Home
          </Link>

          {sessionId && (
            <p className="text-xs text-[#999] mt-8">
              Confirmation ID: {sessionId}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
