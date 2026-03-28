'use client';

import { useState, useEffect } from 'react';
import { schimbaStatus, stergeRezervare, citesteRezervari, Status } from '@/lib/actions/rezervari';

type Rezervare = {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  nr_persoane: number;
  data: string;
  ora: string;
  status: Status;
  created_at: string;
};

const statusColors: Record<Status, string> = {
  'în așteptare': 'bg-yellow-100 text-yellow-800',
  'confirmat':    'bg-green-100 text-green-800',
  'respins':      'bg-red-100 text-red-800',
};

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [filtruStatus, setFiltruStatus] = useState<string>('toate');
  const [cautare, setCautare] = useState('');
  const [loading, setLoading] = useState(true);
  const [actiune, setActiune] = useState<number | null>(null);

  async function incarca() {
    setLoading(true);
    const result = await citesteRezervari();
    if (result.success) setRezervari(result.data as Rezervare[]);
    setLoading(false);
  }

  useEffect(() => { incarca(); }, []);

  async function handleStatus(id: number, status: Status) {
    setActiune(id);
    await schimbaStatus(id, status);
    await incarca();
    setActiune(null);
  }

  async function handleSterge(id: number) {
    if (!confirm('Ești sigur că vrei să ștergi această rezervare?')) return;
    setActiune(id);
    await stergeRezervare(id);
    await incarca();
    setActiune(null);
  }

  const filtrate = rezervari.filter((r) => {
    const potrivireStatus = filtruStatus === 'toate' || r.status === filtruStatus;
    const potrivireCautare = r.nume.toLowerCase().includes(cautare.toLowerCase());
    return potrivireStatus && potrivireCautare;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Înapoi */}
        <a href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-6">
          ← Înapoi
        </a>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Panou Admin
            </h1>
            <p className="text-gray-500 mt-1">Gestionează rezervările Vibe Caffè</p>
          </div>

          {/* Sumar statusuri */}
          <div className="flex gap-2 items-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
              În așteptare: {rezervari.filter(r => r.status === 'în așteptare').length}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Confirmate: {rezervari.filter(r => r.status === 'confirmat').length}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
              Respinse: {rezervari.filter(r => r.status === 'respins').length}
            </span>
          </div>
        </div>

        {/* Filtre */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-5 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <input
            type="text"
            placeholder="Caută după nume..."
            value={cautare}
            onChange={(e) => setCautare(e.target.value)}
            className="border border-gray-200 rounded-full px-5 py-2.5 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <div className="flex flex-wrap gap-2">
            {['toate', 'în așteptare', 'confirmat', 'respins'].map((s) => (
              <button
                key={s}
                onClick={() => setFiltruStatus(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filtruStatus === s
                    ? 'bg-teal-500 text-white shadow'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-400'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">Se încarcă rezervările...</div>
        )}

        {/* Fără rezultate */}
        {!loading && filtrate.length === 0 && (
          <div className="text-center py-20 text-gray-400">Nicio rezervare găsită.</div>
        )}

        {/* TABEL — desktop */}
        {!loading && filtrate.length > 0 && (
          <div className="hidden md:block backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-teal-500 text-white text-left">
                  <th className="px-5 py-4">Nume</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Telefon</th>
                  <th className="px-5 py-4">Persoane</th>
                  <th className="px-5 py-4">Data</th>
                  <th className="px-5 py-4">Ora</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {filtrate.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-white/60' : 'bg-teal-50/40'}>
                    <td className="px-5 py-4 font-medium text-gray-800">{r.nume}</td>
                    <td className="px-5 py-4 text-gray-600">{r.email}</td>
                    <td className="px-5 py-4 text-gray-600">{r.telefon}</td>
                    <td className="px-5 py-4 text-center">{r.nr_persoane}</td>
                    <td className="px-5 py-4">{r.data}</td>
                    <td className="px-5 py-4">{r.ora}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {r.status !== 'confirmat' && (
                          <button
                            disabled={actiune === r.id}
                            onClick={() => handleStatus(r.id, 'confirmat')}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded-full transition-all disabled:opacity-50"
                          >
                            Confirmă
                          </button>
                        )}
                        {r.status !== 'respins' && (
                          <button
                            disabled={actiune === r.id}
                            onClick={() => handleStatus(r.id, 'respins')}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-full transition-all disabled:opacity-50"
                          >
                            Respinge
                          </button>
                        )}
                        <button
                          disabled={actiune === r.id}
                          onClick={() => handleSterge(r.id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full transition-all disabled:opacity-50"
                        >
                          Șterge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CARDURI — mobil */}
        {!loading && filtrate.length > 0 && (
          <div className="flex flex-col gap-4 md:hidden">
            {filtrate.map((r) => (
              <div
                key={r.id}
                className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{r.nume}</p>
                    <p className="text-gray-500 text-sm">{r.email}</p>
                    <p className="text-gray-500 text-sm">{r.telefon}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                  <span>📅 {r.data}</span>
                  <span>🕐 {r.ora}</span>
                  <span>👥 {r.nr_persoane} pers.</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.status !== 'confirmat' && (
                    <button
                      disabled={actiune === r.id}
                      onClick={() => handleStatus(r.id, 'confirmat')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition-all disabled:opacity-50"
                    >
                      Confirmă
                    </button>
                  )}
                  {r.status !== 'respins' && (
                    <button
                      disabled={actiune === r.id}
                      onClick={() => handleStatus(r.id, 'respins')}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-full transition-all disabled:opacity-50"
                    >
                      Respinge
                    </button>
                  )}
                  <button
                    disabled={actiune === r.id}
                    onClick={() => handleSterge(r.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-full transition-all disabled:opacity-50"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        {!loading && (
          <p className="text-center text-gray-400 text-sm mt-6">
            {filtrate.length} rezervări afișate
          </p>
        )}
      </div>
    </div>
  );
}
