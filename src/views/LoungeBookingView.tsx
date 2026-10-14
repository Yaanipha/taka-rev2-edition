import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Coffee,
  CheckCircle,
  Wine,
  ShieldCheck,
  ChevronRight,
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
    'Fri, 17 Oct'
  ];

  const timeSlots = [
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
    '7:00 PM'
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

  return (
    <div className="space-y-6 pb-24 max-w-[430px] mx-auto px-4">
      {/* Header Banner */}
      <div className="rounded-2xl overflow-hidden border border-[#EEDCD4] bg-white shadow-xs">
        <div className="relative aspect-[16/9]">
          <img
            src="/src/assets/images/vip_lounge_omotenashi_1791943420736.jpg"
            alt="The Rose VIP Lounge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 text-white">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#FFB3B2] block">
                Level 3 North Wing · Ngee Ann City
              </span>
              <h2 className="font-serif text-xl font-bold">
                The Rose VIP Lounge
              </h2>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#F7EDE8]/60 flex items-center justify-between text-[11px] text-[#574141]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7A1520]" />
            <span>Open: 10:30 AM – 9:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7A1520]" />
            <span className="font-semibold text-[#7A1520]">{TIERS_DATA[currentTier].name}</span>
          </div>
        </div>
      </div>

      {confirmedBooking ? (
        /* Confirmed Boarding Pass Ticket */
        <div className="bg-white rounded-2xl border border-[#EEDCD4] p-5 shadow-md space-y-4 text-center animate-in fade-in duration-300">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#7A1520]/10 text-[#7A1520] flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8A7170] tracking-wider">
              Omotenashi Reservation Confirmed
            </span>
            <h3 className="font-serif text-lg font-bold text-[#201A1A]">
              Lounge Boarding Pass
            </h3>
          </div>

          <div className="bg-[#F7EDE8] border border-dashed border-[#DEBFBE] rounded-xl p-4 text-left space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#EEDCD4]">
              <div>
                <span className="text-[9px] uppercase text-[#8A7170] block">Reservation Pass</span>
                <span className="font-mono text-sm font-bold text-[#7A1520]">{confirmedBooking.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase text-[#8A7170] block">Guest</span>
                <span className="text-xs font-bold text-[#201A1A]">{confirmedBooking.guestName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-[#8A7170] block">Date & Time</span>
                <strong className="text-[#201A1A] block">{confirmedBooking.date}</strong>
                <span className="text-[#574141] text-[11px]">{confirmedBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7170] block">Party & Suite</span>
                <strong className="text-[#201A1A] block">{confirmedBooking.guestsCount} Guests</strong>
                <span className="text-[#574141] text-[11px]">{confirmedBooking.privateFittingSuite ? 'Private Suite' : 'Salon Area'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="flex-1 py-2.5 border border-[#EEDCD4] text-xs font-semibold text-[#574141] rounded-xl hover:bg-[#F7EDE8] transition-colors cursor-pointer"
            >
              Modify
            </button>
            <button
              onClick={onOpenPass}
              className="flex-1 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Show Pass
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form onSubmit={handleBooking} className="bg-white rounded-2xl border border-[#EEDCD4] p-5 shadow-xs space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7A1520]" />
              <span>1. Choose Date</span>
            </label>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    selectedDate === d
                      ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-xs'
                      : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] text-[#201A1A] border-[#EEDCD4]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7A1520]" />
              <span>2. Select Time</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((ts) => (
                <button
                  type="button"
                  key={ts}
                  onClick={() => setSelectedTime(ts)}
                  className={`py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    selectedTime === ts
                      ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-xs'
                      : 'bg-[#FFF8F7] hover:bg-[#F7EDE8] text-[#201A1A] border-[#EEDCD4]'
                  }`}
                >
                  {ts}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#7A1520]" />
              <span>3. Guests & Suite</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setGuestsCount(num)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    guestsCount === num
                      ? 'bg-[#7A1520] text-white border-[#7A1520]'
                      : 'bg-[#FFF8F7] text-[#201A1A] border-[#EEDCD4]'
                  }`}
                >
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </button>
              ))}
            </div>

            <div
              onClick={() => setPrivateSuite(!privateSuite)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer mt-2 ${
                privateSuite ? 'bg-[#F7EDE8] border-[#7A1520]' : 'bg-[#FFF8F7] border-[#EEDCD4]'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-[#201A1A] block">
                  Private Fitting & Dressing Suite
                </span>
                <span className="text-[10px] text-[#8A7170]">
                  Wardrobe styling in complete privacy
                </span>
              </div>
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border ${
                  privateSuite ? 'bg-[#7A1520] border-[#7A1520] text-white' : 'border-[#8A7170]'
                }`}
              >
                {privateSuite && <CheckCircle className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#574141] flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-[#7A1520]" />
              <span>4. Refreshment Pairing</span>
            </label>
            <div className="space-y-2">
              <div
                onClick={() => setRefreshment('ceremonial_matcha')}
                className={`p-3 rounded-xl border cursor-pointer ${
                  refreshment === 'ceremonial_matcha'
                    ? 'bg-[#F7EDE8] border-[#7A1520]'
                    : 'bg-[#FFF8F7] border-[#EEDCD4]'
                }`}
              >
                <span className="text-xs font-bold text-[#201A1A] block">
                  🍵 Kyoto Uji Ceremonial Matcha & Wagashi
                </span>
                <span className="text-[10px] text-[#574141]">
                  Freshly whisked with Toraya nerikiri confection.
                </span>
              </div>

              <div
                onClick={() => setRefreshment('vintage_champagne')}
                className={`p-3 rounded-xl border cursor-pointer ${
                  refreshment === 'vintage_champagne'
                    ? 'bg-[#F7EDE8] border-[#7A1520]'
                    : 'bg-[#FFF8F7] border-[#EEDCD4]'
                }`}
              >
                <span className="text-xs font-bold text-[#201A1A] block">
                  🍾 Henriot Brut Champagne & Canapés
                </span>
                <span className="text-[10px] text-[#574141]">
                  Chilled champagne flutes with Japanese savory bites.
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7A1520] hover:bg-[#8E1C27] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Confirm Lounge Reservation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
