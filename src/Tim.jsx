import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const NAMA_DESA = 'Desa Limpok';
const JUMLAH_ANGGOTA = 11;

/*
  CATATAN: isi data DPL di bawah ini dengan data asli.
  (Desain Stitch membuat nama dan kutipan DPL karangan, jadi tidak dipakai.)
*/
const DPL = {
  nama: '[Nama DPL]',
  keterangan: `Dosen Pembimbing Lapangan KPM ${NAMA_DESA}`,
};

const NAV = [
  { label: 'Beranda', icon: 'cottage', href: '/' },
  { label: 'Misi', icon: 'flag', href: '/#misi' },
  { label: 'Program', icon: 'assignment', href: '/program' },
  { label: 'Dampak', icon: 'insights', href: '/dampak' },
  { label: 'Tim', icon: 'group', href: '/tim', active: true },
  { label: 'Kontak', icon: 'chat', href: '/#kontak' },
];

function inisial(nama = '') {
  const huruf = nama
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((k) => (k ? k[0].toUpperCase() : ''))
    .join('');
  return huruf || '?';
}

function badgeClass(jabatan = '') {
  const pimpinan = /ketua/i.test(jabatan);
  return pimpinan
    ? 'bg-primary text-on-primary'
    : 'bg-primary-fixed/60 text-on-primary-fixed-variant';
}

export default function Tim() {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let aktif = true;
    async function muat() {
      const { data, error } = await supabase
        .from('tim')
        .select('*')
        .order('urutan', { ascending: true });
      if (!aktif) return;
      if (error) setError('Data tim belum bisa dimuat. Coba muat ulang halaman.');
      else setAnggota(data || []);
      setLoading(false);
    }
    muat();
    return () => {
      aktif = false;
    };
  }, []);

  // Filter divisi dibuat otomatis dari kolom "divisi" (jika diisi di Supabase)
  const divisiList = [...new Set(anggota.map((a) => a.divisi).filter(Boolean))];
  const tampil = filter === 'all' ? anggota : anggota.filter((a) => a.divisi === filter);

  return (
    <div className="impact-theme bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-gutter flex items-center justify-between gap-2 max-w-xl mx-auto">
          <a href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-primary-container/10 flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">diversity_3</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate leading-tight">
                KPM {NAMA_DESA}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 truncate">
                <span className="material-symbols-outlined text-[13px] text-secondary">location_on</span>
                Darussalam, Aceh Besar
              </span>
            </div>
          </a>
        </div>
      </header>

      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-xl mx-auto px-gutter">
          {/* Judul */}
          <header className="flex flex-col items-center text-center pt-4 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-md text-label-md mb-2 shadow-sm">
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <span>Gampong Limpok • Kec. Darussalam, Aceh Besar</span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight mb-1">
              Kenali Tim Kami
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
              Mengenal {JUMLAH_ANGGOTA} mahasiswa pengabdi dari berbagai program studi yang bergerak bersama masyarakat
              Gampong Limpok.
            </p>
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">school</span>
                <span className="font-label-md text-label-md text-primary font-semibold">
                  {JUMLAH_ANGGOTA} Mahasiswa
                </span>
              </div>
            </div>
          </header>

          {/* DPL */}
          <section className="mb-6">
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary/5 pointer-events-none" />
              <div className="flex items-center mb-2 relative z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                  Dosen Pembimbing Lapangan
                </span>
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">school</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight leading-snug">
                    {DPL.nama}
                  </h2>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-0.5 leading-tight">
                    {DPL.keterangan}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Filter + daftar anggota */}
          <section className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-headline-sm text-headline-sm text-primary">Struktur Pengabdi</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{tampil.length} Anggota</span>
            </div>

            {divisiList.length > 0 && (
              <div
                className="flex items-center gap-2 overflow-x-auto py-1 mt-2"
                style={{ scrollbarWidth: 'none' }}
              >
                {['all', ...divisiList].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFilter(d)}
                    className={`px-4 py-2 rounded-full font-label-md text-label-md font-semibold transition-all flex-shrink-0 shadow-sm ${
                      filter === d
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:text-primary'
                    }`}
                  >
                    {d === 'all' ? 'Semua' : d}
                  </button>
                ))}
              </div>
            )}
          </section>

          {loading && (
            <p className="text-center text-on-surface-variant py-10">Memuat data tim…</p>
          )}
          {error && <p className="text-center text-error py-10">{error}</p>}
          {!loading && !error && anggota.length === 0 && (
            <p className="text-center text-on-surface-variant py-10">Data anggota belum ditambahkan.</p>
          )}

          <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {tampil.map((a) => (
              <article
                key={a.id}
                className="bg-surface-container-lowest rounded-2xl p-3 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col items-center text-center">
                  {a.foto_url ? (
                    <img
                      src={a.foto_url}
                      alt={a.nama}
                      className="w-12 h-12 rounded-full object-cover mb-2 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-headline-sm text-headline-sm mb-2 shadow-sm">
                      <span>{inisial(a.nama)}</span>
                    </div>
                  )}
                  {a.jabatan && (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold tracking-tight mb-1 ${badgeClass(
                        a.jabatan
                      )}`}
                    >
                      {a.jabatan}
                    </span>
                  )}
                  <h3 className="font-headline-sm text-[15px] font-bold text-primary tracking-tight leading-tight mb-0.5">
                    {a.nama}
                  </h3>
                  {a.jurusan && (
                    <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight">{a.jurusan}</p>
                  )}
                </div>
                {a.deskripsi && (
                  <div className="mt-2.5 flex items-center justify-center bg-surface-container-low rounded-lg py-1 px-2">
                    <span className="font-label-sm text-[10px] text-primary font-semibold text-center">
                      {a.deskripsi}
                    </span>
                  </div>
                )}
              </article>
            ))}
          </section>

          {/* Ajakan */}
          <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm mb-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined text-[24px]">handshake</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-1">Mari Bergotong Royong</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto mb-4 leading-relaxed">
              Punya aspirasi atau ide program untuk gampong? Tim pengabdi siap terhubung.
            </p>
            <div className="flex flex-col gap-2.5 w-full">
              <a
                href="/#kontak"
                className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Hubungi Tim Pengabdi
              </a>
              <a
                href="/program"
                className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                Lihat Program Kerja
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Menu bawah */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(6,60,40,0.06)]">
        <div className="flex items-center justify-between h-16 px-1 max-w-xl mx-auto">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              aria-current={n.active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center flex-1 min-w-[48px] h-full transition-colors ${
                n.active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
              <span className="font-label-sm text-label-sm tracking-tight mt-0.5">{n.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}