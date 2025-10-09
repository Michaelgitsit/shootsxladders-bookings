"use client";

// Removed unused imports for cleaner build
import { useState } from "react";

// Photos are now directly referenced in JSX for better performance

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCorporateAccordion, setShowCorporateAccordion] = useState(false);
  const [showHolidayAccordion, setShowHolidayAccordion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    message: ''
  });

  const handleFormChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        // Reset form and close modal
        setContactForm({ name: '', email: '', company: '', date: '', message: '' });
        setShowContactModal(false);
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to send inquiry'}`);
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('There was an error sending your inquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAFAF8] text-[#2C2C2C] min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#F5F3ED] text-[#2C2C2C] relative">
        {/* Subtle texture background - covering entire hero area */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden">
          <img 
            src="/images/DSCF7223.jpg" 
            alt="Photography texture" 
            className="w-full h-full object-cover min-h-screen"
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center relative z-10">
          {/* Ladder Icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <img 
              src="/images/ladder.png" 
              alt="Shoots and Ladders Logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain opacity-80"
            />
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.05em] text-[#2C2C2C] mb-6 leading-tight">
            Shoots and Ladders
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.05em] text-[#6B6B6B]">
            Elevated Event Portraits
          </p>
        </div>
        
        {/* Welcome text in lower third - clickable button */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 text-center">
          <a 
            href="#gallery"
            className="cursor-pointer hover:opacity-70 transition-opacity duration-300 group block"
            style={{ 
              padding: '20px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '12px',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <p className="text-sm tracking-[0.3em] text-[#6B6B6B] font-light uppercase mb-4 group-hover:text-[#2C2C2C] transition-colors duration-300">
              Welcome Y&apos;all
            </p>
            {/* Down arrow */}
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-[#6B6B6B] animate-bounce group-hover:text-[#2C2C2C] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full bg-white">
        <div className="px-4 sm:px-8 py-6 sm:py-10 lg:py-20 flex justify-center">
          <div className="max-w-6xl w-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 lg:gap-16">
            <div className="flex-1 mb-6 sm:mb-8 lg:mb-0 lg:pr-8 w-full">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.05em] text-[#2C2C2C] mb-4 pb-4">01. Corporate<br/>Sessions</h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-[#6B6B6B] leading-relaxed mb-4 pl-4">Playful and elegant photo sets designed to shine light on your work family. Select themes for groups or single shots.</p>
              
              {/* Corporate Accordion */}
              <div className="mt-6">
                <button
                  onClick={() => setShowCorporateAccordion(!showCorporateAccordion)}
                  className="w-full text-left bg-[#F5F3ED] px-4 py-3 font-medium text-[#2C2C2C] tracking-[0.05em] hover:bg-[#E5E3DC] transition-all flex justify-between items-center rounded-lg"
                >
                  <span>Features & Pricing</span>
                  <span className={`transform transition-transform ${showCorporateAccordion ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {showCorporateAccordion && (
                  <div className="bg-[#F5F3ED] px-4 py-6 space-y-4 rounded-b-lg">
                    <div>
                      <h4 className="font-serif font-medium text-[#2C2C2C] mb-2 text-lg">Premium Photoshoot: Starting at $2000</h4>
                      <ul className="space-y-1 text-[#6B6B6B] font-light">
                        <li>• Custom themed photo setup</li>
                        <li>• Props and accessories</li>
                        <li>• Digital gallery with instant sharing</li>
                        <li>• On-site printing depending event type</li>
                        <li>• Fun interactive photo activities and poses</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 flex justify-center lg:justify-start w-full">
              <div className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-[#F5F3ED] relative rounded-lg overflow-hidden shadow-lg mb-2 sm:mb-4 lg:mb-0">
                <img 
                  src="/images/bunch.jpg" 
                  alt="Corporate group photography" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
          </div>
        </div>
        
        {/* Scroll down arrow for Corporate Sessions - centered on full page */}
        <div className="w-full flex justify-center pb-6 sm:pb-8">
          <button 
            onClick={() => document.getElementById('holiday')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:opacity-70 transition-opacity duration-300 cursor-pointer group"
          >
            <svg className="w-8 h-8 text-[#6B6B6B] group-hover:text-[#2C2C2C] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Second Project */}
      <section id="holiday" className="w-full bg-[#F5F3ED] text-[#2C2C2C]">
        <div className="px-4 sm:px-8 py-6 sm:py-10 lg:py-20 flex justify-center">
          <div className="max-w-6xl w-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 lg:gap-16">
            <div className="flex-1 mb-6 sm:mb-8 lg:mb-0 lg:pr-8 w-full">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.05em] text-[#2C2C2C] mb-4 pb-4">02. Holiday and<br/>Special Events</h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-[#6B6B6B] leading-relaxed mb-4 pl-4">Custom photo set built around specific themes like Christmas, Halloween, Valentine&apos;s Day, or themes to match festivals/events</p>
              
              {/* Holiday Accordion */}
              <div className="mt-6">
                <button
                  onClick={() => setShowHolidayAccordion(!showHolidayAccordion)}
                  className="w-full text-left bg-white px-4 py-3 font-medium text-[#2C2C2C] tracking-[0.05em] hover:bg-[#E5E3DC] transition-all flex justify-between items-center rounded-lg"
                >
                  <span>Features & Pricing</span>
                  <span className={`transform transition-transform ${showHolidayAccordion ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {showHolidayAccordion && (
                  <div className="bg-white px-4 py-6 space-y-4 rounded-b-lg">
                    <div>
                      <h4 className="font-serif font-medium text-[#2C2C2C] mb-2 text-lg">Festival Deal: $85.00</h4>
                      <ul className="space-y-1 text-[#6B6B6B] font-light">
                        <li>• The studio is brought to a location near you</li>
                        <li>• 20 minute sessions</li>
                        <li>• Custom themed photo setup</li>
                        <li>• Digital gallery with instant sharing</li>
                        <li>• Fun interactive photo activities and poses</li>
                        <li>• Props and accessories</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Book Holiday Session Button */}
              <div className="mt-6">
                <a
                  href="https://buy.shootsxladders.com"
                  className="block w-full text-center bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] px-4 py-3 font-medium tracking-wider transition-all rounded-lg"
                >
                  Book a Holiday Session
                </a>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center lg:justify-start w-full">
              <div className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white relative rounded-lg overflow-hidden shadow-lg mb-2 sm:mb-4 lg:mb-0">
                <img 
                  src="/images/myla.jpg" 
                  alt="Holiday themed photography" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
          </div>
        </div>
        
        {/* Scroll down arrow for Holiday Sessions - centered on full page */}
        <div className="w-full flex justify-center pb-20 sm:pb-8">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:opacity-70 transition-opacity duration-300 cursor-pointer group"
          >
            <svg className="w-8 h-8 text-[#6B6B6B] group-hover:text-[#2C2C2C] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full px-4 sm:px-8 py-10 sm:py-20 bg-white flex justify-center relative overflow-hidden">
        {/* Large Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img 
            src="/images/ladder.png" 
            alt="Shoots and Ladders Watermark" 
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain grayscale"
          />
        </div>
        
        <div className="max-w-4xl w-full relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.05em] text-[#2C2C2C] mb-8 pb-4">About</h2>
          <p className="text-base sm:text-lg lg:text-xl font-light text-[#6B6B6B] leading-relaxed pl-4">
          Shoots and Ladders is a family run company who specializes in creating stunning interactive portraits. We are based in Austin Texas but travel all around for events and festivals. Check our special event&apos;s tab to catch us at our next public event.
        </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full px-4 sm:px-8 py-10 sm:py-20 bg-[#F5F3ED] text-[#2C2C2C] flex justify-center">
        <div className="max-w-4xl w-full">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.05em] text-[#2C2C2C] mb-8 pb-4">Holler at Us</h2>
          <p className="text-base sm:text-lg lg:text-xl font-light text-[#6B6B6B] leading-relaxed mb-6 pl-4">
          If you are interested in booking us for your party or event, please hit the &quot;contact us&quot; button below.
        </p>
          <button 
            onClick={() => setShowContactModal(true)}
            className="bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium tracking-wider transition-all cursor-pointer rounded-lg"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2C2C2C] tracking-[0.05em]">Contact Us</h3>
                <button 
                  disabled={isSubmitting}
                  onClick={() => setShowContactModal(false)}
                  className="text-[#2C2C2C] hover:text-[#6B6B6B] text-2xl font-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    disabled={isSubmitting}
                    value={contactForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F3ED] text-[#2C2C2C] font-light placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#D4C5A9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    disabled={isSubmitting}
                    value={contactForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F3ED] text-[#2C2C2C] font-light placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#D4C5A9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    disabled={isSubmitting}
                    value={contactForm.company}
                    onChange={(e) => handleFormChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F3ED] text-[#2C2C2C] font-light placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#D4C5A9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Company or organization name"
                  />
                </div>

                {/* Date Field */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    disabled={isSubmitting}
                    value={contactForm.date}
                    onChange={(e) => handleFormChange('date', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F3ED] text-[#2C2C2C] font-light focus:outline-none focus:ring-2 focus:ring-[#D4C5A9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    disabled={isSubmitting}
                    value={contactForm.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F3ED] text-[#2C2C2C] font-light placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#D4C5A9] rounded-lg resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about your event, party, or photography needs..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#D4C5A9] hover:bg-[#C4B599] text-[#2C2C2C] px-6 py-3 font-medium tracking-wider transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4C5A9] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#2C2C2C] border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Inquiry'
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-3 bg-[#F5F3ED] text-[#2C2C2C] font-light hover:bg-[#E5E3DC] transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
