import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const NAMA_DESA = 'Desa Limpok';

const NAV = [
  { label: 'Beranda', icon: 'cottage', href: '/' },
  { label: 'Misi', icon: 'flag', href: '/#misi' },
  { label: 'Program', icon: 'assignment', href: '/program', active: true },
  { label: 'Dampak', icon: 'insights', href: '/dampak' },
  { label: 'Tim', icon: 'group', href: '/tim' },
  { label: 'Kontak', icon: 'chat', href: '/#kontak' },
];

// Ikon kartu mengikuti kategori program
const IKON = {
  keagamaan: 'mosque',
  pendidikan: 'auto_stories',
  kesehatan: 'directions_run',
  lingkungan: 'delete_sweep',
};
const IKON_DEFAULT = 'explore';

const STATUS = {
  rencana: { label: 'Rencana', badge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', dot: 'bg-secondary' },
  berjalan: { label: 'Berjalan', badge: 'bg-primary-fixed text-primary', dot: 'bg-primary animate-pulse' },
  selesai: { label: 'Selesai', badge: 'bg-primary text-on-primary', dot: 'bg-on-primary' },
};

const fill = { fontVariationSettings: "'FILL' 1" };

function fmt(tgl) {
  if (!tgl) return '';
  return new Date(`${tgl}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function rentangTanggal(mulai, selesai) {
  if (mulai && selesai) return `${fmt(mulai)} – ${fmt(selesai)}`;
  if (mulai) return `Mulai ${fmt(mulai)}`;
  if (selesai) return `Sampai ${fmt(selesai)}`;
  return '';
}

export default function Programs() {
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let aktif = true;
    async function muat() {
      const { data, error } = await supabase.from('program_kerja').select('*');
      if (!aktif) return;
      if (error) {
        setError('Data program belum bisa dimuat. Coba muat ulang halaman.');
      } else {
        const urut = [...(data || [])].sort((a, b) => (a.urutan ?? 999) - (b.urutan ?? 999));
        setProgram(urut);
      }
      setLoading(false);
    }
    muat();
    return () => {
      aktif = false;
    };
  }, []);

  // Filter kategori dibuat otomatis dari kolom "kategori" di Supabase
  const kategoriList = [...new Set(program.map((p) => p.kategori).filter(Boolean))];
  const tampil = filter === 'all' ? program : program.filter((p) => p.kategori === filter);
  const hitung = (k) => program.filter((p) => p.kategori === k).length;

  return (
    <div className="impact-theme bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-gutter flex items-center justify-between gap-2 max-w-3xl mx-auto">
          <a href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(6,60,40,0.18)]">
              <span className="material-symbols-outlined text-on-primary text-[22px]">nature_people</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate leading-tight">
                KPM {NAMA_DESA}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate leading-tight">
                Darussalam, Aceh Besar
              </span>
            </div>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
        <div className="flex flex-col w-full max-w-3xl mx-auto px-gutter pb-8">
          {/* Judul */}
          <div className="flex flex-col gap-2 pt-2 pb-4">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
              <span className="font-label-md text-label-md tracking-wide">
                Gampong Limpok • Kec. Darussalam, Aceh Besar
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-bold">
              Program Kerja KPM {NAMA_DESA}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Daftar program kerja pengabdian mahasiswa bersama masyarakat Gampong Limpok.
            </p>
            {!loading && !error && program.length > 0 && (
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span className="font-label-md text-label-md text-primary font-semibold">
                    {program.length} Program Kerja
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Filter kategori */}
          {kategoriList.length > 0 && (
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4"
              style={{ scrollbarWidth: 'none' }}
            >
              {['all', ...kategoriList].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setFilter(k)}
                  className={`shrink-0 px-4 py-2 rounded-xl font-label-md text-label-md transition-all active:scale-95 shadow-sm flex items-center gap-1.5 ${
                    filter === k
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {k === 'all' ? 'apps' : IKON[k.toLowerCase()] || 'label'}
                  </span>
                  <span>{k === 'all' ? 'Semua' : k}</span>
                  <span className="ml-1 px-1.5 rounded-full bg-black/10 text-[10px]">
                    {k === 'all' ? program.length : hitung(k)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Status muat */}
          {loading && <p className="text-center text-on-surface-variant py-10">Memuat program kerja…</p>}
          {error && <p className="text-center text-error py-10">{error}</p>}
          {!loading && !error && program.length === 0 && (
            <p className="text-center text-on-surface-variant py-10">Belum ada program kerja yang ditambahkan.</p>
          )}

          {/* Daftar program */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {tampil.map((p) => {
              const st = STATUS[(p.status || 'rencana').toLowerCase()] || STATUS.rencana;
              const tanggal = rentangTanggal(p.tanggal_mulai, p.tanggal_selesai);
              const progres = Number(p.progress_percentage) || 0;
              return (
                <article
                  key={p.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    {p.foto_url ? (
                      <img
                        src={p.foto_url}
                        alt={p.judul}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container/15 to-primary-fixed/40 flex items-center justify-center shrink-0 text-primary shadow-sm">
                        <span className="material-symbols-outlined text-[30px]" style={fill}>
                          {IKON[(p.kategori || '').toLowerCase()] || IKON_DEFAULT}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {p.kategori && (
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                          {p.kategori}
                        </span>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${st.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                      {p.judul}
                    </h3>
                    {p.deskripsi && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {p.deskripsi}
                      </p>
                    )}
                  </div>

                  {(tanggal || progres > 0) && (
                    <div className="mt-auto flex flex-col gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
                      {tanggal && (
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <span className="material-symbols-outlined text-secondary text-[16px]">schedule</span>
                          <span className="font-label-sm text-label-sm font-medium">{tanggal}</span>
                        </div>
                      )}
                      {progres > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${Math.min(progres, 100)}%` }} />
                          </div>
                          <span className="font-label-sm text-label-sm text-primary font-semibold">{progres}%</span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Ajakan */}
          <div className="mt-6 bg-surface-container-low rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">handshake</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Punya Ide atau Ingin Berpartisipasi?
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Masyarakat Gampong Limpok dapat memberikan masukan atau bergabung dalam kegiatan KPM.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <a
                href="/#kontak"
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Hubungi Kami
              </a>
              <a
                href="/dampak"
                className="w-full py-2.5 px-4 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">insights</span>
                Lihat Dampak
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Menu bawah */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(35,83,62,0.06)]">
        <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              aria-current={n.active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[48px] h-14 transition-colors ${
                n.active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
              <span className="font-label-sm text-label-sm mt-0.5">{n.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}