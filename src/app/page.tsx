'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

type TimeSlot = {
  time: string;
  available: boolean;
};

type DateOption = {
  date: string;
  fullDate: string;
  location: string;
  timeSlots: TimeSlot[];
};

// Generate time slots in 25-minute intervals (20 min booking + 5 min gap) with custom start/end times
const generateTimeSlots = (startHour: number, startMinute: number, endHour: number, endMinute: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let hour = startHour;
  let minute = startMinute;
  
  while (hour < endHour || (hour === endHour && minute <= endMinute)) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const time = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    slots.push({ time, available: true });
    
    minute += 25;
    if (minute >= 60) {
      minute -= 60;
      hour++;
    }
  }
  
  return slots;
};

// Base date configurations
const baseDateConfigs = [
  {
    date: '8',
    fullDate: 'Saturday, November 8, 2025',
    dateString: '2025-11-08',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 9, startMinute: 0, endHour: 19, endMinute: 0,
  },
  {
    date: '15',
    fullDate: 'Saturday, November 15, 2025',
    dateString: '2025-11-15',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 9, startMinute: 0, endHour: 19, endMinute: 0,
  },
  {
    date: '22',
    fullDate: 'Saturday, November 22, 2025',
    dateString: '2025-11-22',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 9, startMinute: 0, endHour: 19, endMinute: 0,
  },
  {
    date: '29',
    fullDate: 'Saturday, November 29, 2025',
    dateString: '2025-11-29',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 9, startMinute: 0, endHour: 19, endMinute: 0,
  },
  {
    date: '5',
    fullDate: 'Friday, December 5, 2025',
    dateString: '2025-12-05',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 11, startMinute: 0, endHour: 21, endMinute: 0,
  },
  {
    date: '6',
    fullDate: 'Saturday, December 6, 2025',
    dateString: '2025-12-06',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 11, startMinute: 0, endHour: 21, endMinute: 0,
  },
  {
    date: '7',
    fullDate: 'Sunday, December 7, 2025',
    dateString: '2025-12-07',
    location: '118 E 8th St, Georgetown, TX 78626',
    startHour: 11, startMinute: 0, endHour: 18, endMinute: 0,
  },
];

// Initialize dates with all slots available
const getInitialDates = (): DateOption[] => {
  return baseDateConfigs.map(config => ({
    date: config.date,
    fullDate: config.fullDate,
    location: config.location,
    timeSlots: generateTimeSlots(
      config.startHour, 
      config.startMinute, 
      config.endHour, 
      config.endMinute
    ),
  }));
};

export default function Home() {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<'november' | 'december'>('november');
  const [availableDates, setAvailableDates] = useState<DateOption[]>(getInitialDates());
  const timeSlotsRef = useRef<HTMLElement>(null);
  const bookButtonRef = useRef<HTMLDivElement>(null);

  // Fetch booked slots and update availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/available-slots');
        const data = await response.json();
        
        if (data.success && data.bookedSlots) {
          // Generate dates with updated availability
          const dates = baseDateConfigs.map(config => {
            const slots = generateTimeSlots(
              config.startHour, 
              config.startMinute, 
              config.endHour, 
              config.endMinute
            );
            
            // Mark slots as unavailable if they're booked
            const updatedSlots = slots.map(slot => ({
              ...slot,
              available: !data.bookedSlots.some(
                (booked: { date: string; time: string }) => 
                  booked.date === config.dateString && booked.time === slot.time
              ),
            }));
            
            return {
              date: config.date,
              fullDate: config.fullDate,
              location: config.location,
              timeSlots: updatedSlots,
            };
          });
          
          setAvailableDates(dates);
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error);
        // Keep using the initial dates (all slots available)
      }
    };

    fetchAvailability();
  }, []);

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedTime(null); // Reset time selection when date changes
    
    // Smooth scroll to time slots section after state updates
    setTimeout(() => {
      timeSlotsRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth('november');
  };

  const handleNextMonth = () => {
    setCurrentMonth('december');
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    
    // Smooth scroll to book button after it renders
    setTimeout(() => {
      bookButtonRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 350);
  };

  const handleBookNow = async () => {
    if (selectedDateIndex !== null && selectedTime) {
      setIsLoading(true);
      const selectedDate = availableDates[selectedDateIndex];
      const dateConfig = baseDateConfigs[selectedDateIndex];

      try {
        // Create Stripe checkout session
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: dateConfig.dateString, // Use ISO date format for database
            time: selectedTime,
            location: selectedDate.location,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Stripe Checkout using the URL
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL received');
        }
      } catch (error) {
        console.error('Booking error:', error);
        alert('Something went wrong. Please try again.');
        setIsLoading(false);
      }
    }
  };

  const selectedDate = selectedDateIndex !== null ? availableDates[selectedDateIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[480px] mx-auto px-6 py-4">
        {/* Header */}
        <header className="text-center mb-6 pb-4 border-b border-[#E5E3DC]">
          <a href="https://shootsxladders.com" className="inline-block">
            <Image 
              src="/images/LOGOTRANSPARENCY2.png" 
              alt="Shoots & Ladders - Elevated Event Portraits" 
              width={200}
              height={80}
              className="h-20 mx-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </header>

        {/* Main content */}
        <main>
          <h2 className="font-serif text-4xl text-[#2C2C2C] font-light leading-tight mb-2">
            Holiday Family<br />Portraits
          </h2>
          <p className="text-[#6B6B6B] text-[15px] leading-relaxed font-light mb-5">
            Select a date and time slot to book your session.
          </p>

          {/* Calendar Section */}
          <section className="mb-5">
            <h3 className="font-serif text-[24px] text-[#2C2C2C] mb-3 font-medium">
              Available Dates
            </h3>
            
            <div className="mb-5">
              <div className="flex items-center justify-between mb-5">
                <button 
                  onClick={handlePreviousMonth}
                  disabled={currentMonth === 'november'}
                  className="w-9 h-9 flex items-center justify-center text-[#2C2C2C] text-2xl hover:bg-[#F5F3ED] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                <h4 className="font-serif text-2xl text-[#2C2C2C] font-medium">
                  {currentMonth === 'november' ? 'November 2025' : 'December 2025'}
                </h4>
                <button 
                  onClick={handleNextMonth}
                  disabled={currentMonth === 'december'}
                  className="w-9 h-9 flex items-center justify-center text-[#2C2C2C] text-2xl hover:bg-[#F5F3ED] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
              
              {/* November Calendar Grid */}
              {currentMonth === 'november' && (
              <div className="grid grid-cols-7 gap-2">
                {/* Day labels */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-[#999] font-medium py-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days - November 2025 starts on Saturday */}
                {/* Week 1: Empty days until Saturday Nov 1 */}
                {['', '', '', '', '', '', '1'].map((day, i) => (
                  day === '' ? (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ) : (
                    <button
                      key={`disabled-${day}`}
                      className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                      disabled
                    >
                      {day}
                    </button>
                  )
                ))}
                
                {/* Week 2: 2-8 (Nov 8 available) */}
                {[2, 3, 4, 5, 6, 7].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                <button
                  onClick={() => handleDateClick(0)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 0
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  8
                </button>
                
                {/* Week 3: 9-15 (Nov 15 available) */}
                {[9, 10, 11, 12, 13, 14].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                <button
                  onClick={() => handleDateClick(1)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 1
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  15
                </button>
                
                {/* Week 4: 16-22 (Nov 22 available) */}
                {[16, 17, 18, 19, 20, 21].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                <button
                  onClick={() => handleDateClick(2)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 2
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  22
                </button>
                
                {/* Week 5: 23-29 (Nov 29 available) */}
                {[23, 24, 25, 26, 27, 28].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                <button
                  onClick={() => handleDateClick(3)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 3
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  29
                </button>
                
                {/* Week 6: 30 */}
                <button
                  key="disabled-30"
                  className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                  disabled
                >
                  30
                </button>
              </div>
              )}

              {/* December Calendar Grid */}
              {currentMonth === 'december' && (
              <div className="grid grid-cols-7 gap-2">
                {/* Day labels */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-[#999] font-medium py-2">
                    {day}
        </div>
                ))}
                
                {/* Calendar days - December 2025 starts on Monday */}
                {/* Week 1: Empty Sunday, then 1-6 */}
                <div className="aspect-square" />
                {[1, 2, 3, 4].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                <button
                  onClick={() => handleDateClick(4)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 4
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  5
                </button>
                <button
                  onClick={() => handleDateClick(5)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 5
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  6
                </button>
                
                {/* Week 2: 7-13 (Dec 7 available) */}
                <button
                  onClick={() => handleDateClick(6)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                    selectedDateIndex === 6
                      ? 'bg-[#D4C5A9] text-[#2C2C2C] shadow-md'
                      : 'bg-[#F0EDE4] text-[#2C2C2C] hover:bg-[#E8E3D6]'
                  }`}
                >
                  7
                </button>
                {[8, 9, 10, 11, 12, 13].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                
                {/* Remaining days grayed out */}
                {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((day) => (
                  <button
                    key={`disabled-${day}`}
                    className="aspect-square flex items-center justify-center rounded-lg text-[#D4D4D4] text-base"
                    disabled
                  >
                    {day}
                  </button>
                ))}
              </div>
              )}
            </div>
          </section>

          {/* Time Slots Section */}
          {selectedDate && (
            <section ref={timeSlotsRef} className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-[#F5F3ED] border-none p-4 rounded-2xl">
                <h3 className="font-serif text-[20px] text-[#2C2C2C] mb-3 font-medium">
                  {selectedDate.fullDate}
                </h3>
                
                <div className="max-h-[350px] overflow-y-auto pr-2">
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDate.timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeClick(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedTime === slot.time
                            ? 'bg-[#D4C5A9] border-2 border-[#C4B599]'
                            : 'bg-[#FAFAF8] border-2 border-transparent hover:border-[#D4C5A9]'
                        } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className={`text-base font-medium text-[#2C2C2C] mb-1 ${!slot.available ? 'line-through' : ''}`}>
                          {slot.time}
                        </div>
                        <div className={`text-[11px] text-[#6B6B6B] ${!slot.available ? 'line-through' : ''}`}>
                          $20 deposit
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Location Section */}
          {selectedDate && (
            <section className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-serif text-[22px] text-[#2C2C2C] mb-3 font-medium">
                Location
              </h3>
              <Card className="bg-[#F5F3ED] border-none p-4 rounded-xl">
                <p className="text-[16px] text-[#2C2C2C] leading-relaxed">
                  {selectedDate.location.split(', ').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </Card>
            </section>
          )}

          {/* Book Button */}
          {selectedTime && (
            <div ref={bookButtonRef} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Button
                onClick={handleBookNow}
                disabled={isLoading}
                className="w-full py-5 bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] text-base font-medium tracking-wider rounded-xl transition-all hover:shadow-lg mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Book Now'}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
