import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Coffee,
  Sparkles,
  CheckCircle,
  Wine,
  ShieldCheck,
  ChevronRight,
  Info,
  MapPin
} from 'lucide-react';
import { LoungeBooking, TierLevel } from '../types';
import { TIERS_DATA } from '../data/mockData';

interface LoungeBookingViewProps {
  currentTier: TierLevel;
  userName: string;
  onOpenPass: () => void;
}

export const LoungeBookingView: React.FC<LoungeBookingViewProps> = ({
  currentTier,
  userName,
  onOpenPass,
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 14 Oct');
  const [selectedTime, setSelectedTime] = useState('2:30 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [refreshment, setRefreshment] = useState<'ceremonial_matcha' | 'gyokuro_tea' | 'vintage_champagne' | 'seasonal_wagashi'>('ceremonial_matcha');
  const [privateSuite, setPrivateSuite] = useState(true);
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<LoungeBooking | null>(null);

  const dates = [
    'Today, 13 Oct',
    'Tomorrow, 14 Oct',
    'Wed, 15 Oct',
    'Thu, 16 Oct',
    'Fri, 17 Oct',
    'Sat, 18 Oct'
  ];

  const timeSlots = [
    '11:30 AM - 1:00 PM',
    '1:00 PM - 2:30 PM',
    '2:30 PM - 4:00 PM',
    '4:00 PM - 5:30 PM',
    '5:30 PM - 7:00 PM',
    '7:00 PM - 8:30 PM'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: LoungeBooking = {
      id: `RL-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: userName,
      date: selectedDate,
      timeSlot: selectedTime,
      guestsCount,
      refreshment,
      privateFittingSuite: privateSuite,
      specialRequests: notes,
      status: 'confirmed'
    };
    setConfirmedBooking(newBooking);
  };

  const isLoungeEligible = currentTier === 'gold' || currentTier === 'platinum' || currentTier === 'diamond';

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#EEDCD4] bg-[#F7EDE8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1520] tracking-wider uppercase">
                <MapPin className="w-4 h-4 text-[#7A1520]" />
                <span>Level 3 North Wing · Ngee Ann City</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#201A1A]">
                The Rose VIP Lounge
              </h1>
              <p className="text-sm text-[#574141] leading-relaxed max-w-xl">
                An oasis of tranquility inspired by classical Japanese tea pavilions. Enjoy whisked Uji ceremonial matcha, champagne service, private changing salons, and dedicated concierge attendants.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#574141]">
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#EEDCD4]">
                <Clock className="w-3.5 h-3.5 text-[#7A1520]" />
                <span>Open Daily: 10:30 AM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#EEDCD4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A1520]" />
                <span>Gold, Platinum & Diamond Priority</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/vip_lounge_omotenashi_1791943420736.jpg"
              alt="The Rose VIP Lounge interior with Japanese gold screens and tea service"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201A1A]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#F7EDE8] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Confirmation State or Reservation Form */}
      {confirmedBooking ? (
        <section className="bg-white rounded-3xl border border-[#EEDCD4] p-8 sm:p-12 shadow-lg max-w-2xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold text-[#8A7170] tracking-wider">
              Omotenashi Reservation Confirmed
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#201A1A] mt-1">
              The Rose Lounge Boarding Pass
            </h2>
          </div>

          {/* Boarding Pass Ticket Box */}
          <div className="bg-[#F7EDE8] border-2 border-dashed border-[#DEBFBE] rounded-2xl p-6 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#EEDCD4]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8A7170]">Reservation Pass</span>
                <p className="font-mono text-base font-bold text-[#7A1520]">{confirmedBooking.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#8A7170]">Guest</span>
                <p className="text-sm font-bold text-[#201A1A]">{confirmedBooking.guestName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8A7170]">Date & Time</span>
                <p className="font-semibold text-[#201A1A]">{confirmedBooking.date}</p>
                <p className="text-[#574141]">{confirmedBooking.timeSlot}</p>
              </div>
              <div>
                <span className="text-[#8A7170]">Party Size</span>
                <p className="font-semibold text-[#201A1A]">{confirmedBooking.guestsCount} Guests</p>
                <p className="text-[#574141]">{confirmedBooking.privateFittingSuite ? 'Private Fitting Suite Reserved' : 'Lounge Seating'}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EEDCD4] text-xs">
              <span className="text-[#8A7170]">Selected Refreshment</span>
              <p className="font-semibold text-[#7A1520]">
                {confirmedBooking.refreshment === 'ceremonial_matcha' && 'Kyoto Uji Ceremonial Matcha & Toraya Wagashi'}
                {confirmedBooking.refreshment === 'vintage_champagne' && 'Henriot Vintage Champagne & Fine Canapés'}
                {confirmedBooking.refreshment === 'gyokuro_tea' && 'Shizuoka Cold-Brew Gyokuro Leaf Infusion'}
                {confirmedBooking.refreshment === 'seasonal_wagashi' && 'Handcrafted Seasonal Nerikiri Wagashi Tasting'}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#574141]">
            Please present this pass or your Digital Member Card at Level 3 Reception upon arrival. Our hostess will escort you to your reserved suite.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-5 py-2.5 border border-[#EEDCD4] hover:bg-[#F7EDE8] text-[#574141] text-xs font-semibold rounded-xl cursor-pointer"
            >
              Modify Reservation
            </button>
            <button
              onClick={onOpenPass}
              className="px-6 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
            >
              Open Digital Pass
            </button>
          </div>
        </section>
      ) : (
        <form onSubmit={handleBooking} className="bg-white rounded-3xl border border-[#EEDCD4] p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <span className="text-xs uppercase font-bold text-[#7A1520] tracking-wider">
              Reserve Your Salon Visit
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#201A1A] mt-1">
              Select Date, Tea Service & Salon Suite
            </h2>
          </div>

          {/* Step 1: Date Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#7A1520]" />
              <span>1. Choose Reservation Date</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedDate === d
                      ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                      : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] text-[#201A1A] border-[#EEDCD4]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Time Slot */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#7A1520]" />
              <span>2. Select Time Slot</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((ts) => (
                <button
                  type="button"
                  key={ts}
                  onClick={() => setSelectedTime(ts)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedTime === ts
                      ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                      : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] text-[#201A1A] border-[#EEDCD4]'
                  }`}
                >
                  {ts}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Guests and Suite Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Guests Count */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#7A1520]" />
                <span>3. Number of Guests</span>
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuestsCount(num)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      guestsCount === num
                        ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                        : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] text-[#201A1A] border-[#EEDCD4]'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Private Suite Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#7A1520]" />
                <span>Private Fitting Suite</span>
              </label>
              <div
                onClick={() => setPrivateSuite(!privateSuite)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  privateSuite
                    ? 'bg-[#F7EDE8] border-[#7A1520]'
                    : 'bg-[#FFF8F7] border-[#EEDCD4]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-[#201A1A]">
                    Reserve Private Dressing & Wardrobe Suite
                  </div>
                  <div className="text-[11px] text-[#8A7170]">
                    Allows trying curated looks directly inside the lounge
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border ${
                    privateSuite ? 'bg-[#7A1520] border-[#7A1520] text-white' : 'border-[#8A7170]'
                  }`}
                >
                  {privateSuite && <CheckCircle className="w-4 h-4" />}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Complimentary Omotenashi Refreshment */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#7A1520]" />
              <span>4. Complimentary Refreshment Service</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setRefreshment('ceremonial_matcha')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  refreshment === 'ceremonial_matcha'
                    ? 'bg-[#F7EDE8] border-[#7A1520] shadow-xs'
                    : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] border-[#EEDCD4]'
                }`}
              >
                <div className="text-xs font-bold text-[#201A1A] flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-[#7A1520]" />
                  <span>Kyoto Uji Ceremonial Matcha & Wagashi</span>
                </div>
                <p className="text-[11px] text-[#574141] mt-1">
                  Freshly whisked artisan matcha served with seasonal Toraya hand-carved nerikiri confection.
                </p>
              </div>

              <div
                onClick={() => setRefreshment('vintage_champagne')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  refreshment === 'vintage_champagne'
                    ? 'bg-[#F7EDE8] border-[#7A1520]'
                    : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] border-[#EEDCD4]'
                }`}
              >
                <div className="text-xs font-bold text-[#201A1A] flex items-center gap-1.5">
                  <Wine className="w-4 h-4 text-[#7A1520]" />
                  <span>Henriot Vintage Champagne & Caviar Canapés</span>
                </div>
                <p className="text-[11px] text-[#574141] mt-1">
                  Chilled Brut champagne flutes paired with Japanese savory blinis.
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141]">
              Special Requests or Personal Shopper Preferences (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Requesting private watch preview, celebratory flowers, or quiet corner..."
              className="w-full px-4 py-2.5 bg-[#FFF8F7] border border-[#EEDCD4] rounded-xl text-xs text-[#201A1A] focus:outline-none focus:ring-2 focus:ring-[#7A1520]/30"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-[#EEDCD4] flex items-center justify-between">
            <div className="text-xs text-[#574141]">
              <span>Tier Recognition: </span>
              <strong className="text-[#7A1520]">{TIERS_DATA[currentTier].name}</strong>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[#7A1520] hover:bg-[#8E1C27] active:bg-[#58000F] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Confirm Lounge Reservation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
