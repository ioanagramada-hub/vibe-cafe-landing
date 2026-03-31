'use client';

import { useState } from 'react';
import { salveazaRezervare } from '@/lib/actions/rezervari';

// --- Helpers ---
function getDatesForNext14Days(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const total = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= total; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateRo(d: Date): string {
  return d.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'short' });
}

const MONTHS_RO = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
const DAYS_RO = ['Lu','Ma','Mi','Jo','Vi','Sâ','Du'];

function getTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 10; h <= 21; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  slots.push('22:00');
  return slots;
}

// --- Component ---
export default function RezervariPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [form, setForm] = useState({ nume: '', email: '', telefon: '', nr_persoane: 2 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const next14 = getDatesForNext14Days();
  const calendarDays = getDaysInMonth(calendarYear, calendarMonth);
  const timeSlots = getTimeSlots();

  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  function isDateDisabled(d: Date) {
    return d < today || d > maxDate;
  }

  function prevMonth() {
    if (calendarYear === today.getFullYear() && calendarMonth === today.getMonth()) return;
    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(y => y - 1); }
    else setCalendarMonth(m => m - 1);
  }

  function nextMonth() {
    const limit = new Date(today);
    limit.setMonth(limit.getMonth() + 6);
    if (calendarYear === limit.getFullYear() && calendarMonth === limit.getMonth()) return;
    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(y => y + 1); }
    else setCalendarMonth(m => m + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await salveazaRezervare({
      ...form,
      data: selectedDate,
      ora: selectedTime,
    });
    setResult(res);
    setLoading(false);
  }

  function resetForm() {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setForm({ nume: '', email: '', telefon: '', nr_persoane: 2 });
    setResult(null);
  }

  // --- Confirmed screen ---
  if (result?.success) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6 py-20">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Rezervare confirmată!</h2>
          <p className="text-gray-500 mb-2">
            <span className="font-semibold text-gray-700">{form.nume}</span>, te așteptăm pe
          </p>
          <p className="text-2xl font-bold text-teal-500 mb-1">{selectedDate}</p>
          <p className="text-xl text-gray-700 mb-6">ora {selectedTime} · {form.nr_persoane} {form.nr_persoane === 1 ? 'persoană' : 'persoane'}</p>
          <button
            onClick={resetForm}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            Rezervare nouă
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-6 py-20">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Rezervă o masă</h1>
          <p className="text-gray-500 text-lg">La Vibe Caffè te așteptăm cu brațele deschise</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step === s ? 'bg-teal-500 text-white scale-110' :
                step > s ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-400'
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 transition-all duration-300 ${step > s ? 'bg-teal-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* ---- STEP 1: Data ---- */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Alege data</h2>

              {/* Quick 14 days */}
              <p className="text-sm text-gray-500 mb-3 font-medium">Următoarele 14 zile</p>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
                {next14.map((d) => {
                  const key = formatDate(d);
                  const isSelected = selectedDate === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDate(key)}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-100 hover:border-teal-200 text-gray-600'
                      }`}
                    >
                      <span className="text-xs font-medium">
                        {d.toLocaleDateString('ro-RO', { weekday: 'short' })}
                      </span>
                      <span className="text-lg font-bold">{d.getDate()}</span>
                      <span className="text-xs">
                        {d.toLocaleDateString('ro-RO', { month: 'short' })}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Calendar */}
              <p className="text-sm text-gray-500 mb-3 font-medium">Sau alege din calendar</p>
              <div className="border border-gray-100 rounded-2xl p-4">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-semibold text-gray-800">{MONTHS_RO[calendarMonth]} {calendarYear}</span>
                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAYS_RO.map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                  ))}
                </div>
                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} />)}
                  {calendarDays.map((d) => {
                    const key = formatDate(d);
                    const disabled = isDateDisabled(d);
                    const isSelected = selectedDate === key;
                    return (
                      <button
                        key={key}
                        disabled={disabled}
                        onClick={() => setSelectedDate(key)}
                        className={`aspect-square rounded-full text-sm font-medium transition-all duration-200 ${
                          disabled ? 'text-gray-200 cursor-not-allowed' :
                          isSelected ? 'bg-teal-500 text-white' :
                          'hover:bg-teal-50 text-gray-700'
                        }`}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                disabled={!selectedDate}
                onClick={() => setStep(2)}
                className="mt-6 w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
              >
                {selectedDate ? `Continuă → ${formatDateRo(new Date(selectedDate + 'T12:00:00'))}` : 'Alege o dată'}
              </button>
            </div>
          )}

          {/* ---- STEP 2: Ora ---- */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 mb-6 transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Înapoi</span>
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Alege ora</h2>
              <p className="text-gray-400 text-sm mb-6">{formatDateRo(new Date(selectedDate + 'T12:00:00'))}</p>

              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                      selectedTime === slot
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-100 hover:border-teal-200 text-gray-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedTime}
                onClick={() => setStep(3)}
                className="mt-6 w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
              >
                {selectedTime ? `Continuă → ora ${selectedTime}` : 'Alege o oră'}
              </button>
            </div>
          )}

          {/* ---- STEP 3: Detalii ---- */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 mb-6 transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Înapoi</span>
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Detaliile tale</h2>
              <p className="text-gray-400 text-sm mb-6">{formatDateRo(new Date(selectedDate + 'T12:00:00'))} · ora {selectedTime}</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nume complet</label>
                  <input
                    type="text"
                    required
                    value={form.nume}
                    onChange={e => setForm(f => ({ ...f, nume: e.target.value }))}
                    placeholder="ex: Maria Ionescu"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="ex: maria@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    required
                    value={form.telefon}
                    onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                    placeholder="ex: 0722 123 456"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Număr de persoane</label>
                  <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, nr_persoane: n }))}
                        className={`w-11 h-11 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                          form.nr_persoane === n
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-gray-100 hover:border-teal-200 text-gray-600'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {result?.success === false && (
                  <p className="text-red-500 text-sm text-center">{result.message}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Se trimite...
                    </>
                  ) : 'Confirmă rezervarea'}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
