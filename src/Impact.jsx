import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const NAMA_DESA = 'Desa Limpok';
const LOKASI_SINGKAT = 'Darussalam, Aceh Besar';

// Jumlah mahasiswa KPM (sama dengan JUMLAH_ANGGOTA di Tim.jsx)
const JUMLAH_MAHASISWA = 11;

// Isi dengan link foto kegiatan asli (misalnya '/foto-kegiatan.jpg' dari folder public).
// Kalau dikosongkan, bagian foto utama tidak ditampilkan.
const FOTO_UTAMA = '';

const NAV = [
  { label: 'Beranda', icon: 'cottage', href: '/' },
  { label: 'Misi Kami', icon: 'flag_circle', href: '/#misi' },
  { label: 'Program', icon: 'task_alt', href: '/program' },
  { label: 'Dampak', icon: 'analytics', href: '/dampak', active: true },
  { label: 'Tim', icon: 'group', href: '/tim' },
  { label: 'Kontak', icon: 'contact_phone', href: '/#kontak' },
];

const IKON = {
  keagamaan: 'mosque',
  pendidikan: 'auto_stories',
  kesehatan: 'directions_run',
  lingkungan: 'delete_sweep',
};
const IKON_DEFAULT = 'explore';

const STATUS = {
  rencana: { label: 'Rencana', badge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
  berjalan: { label: 'Berjalan', badge: 'bg-primary-fixed text-primary' },
  selesai: { label: 'Selesai', badge: 'bg-primary text-on-primary' },
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

export default function Impact() {
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const hitungStatus = (s) => program.filter((p) => (p.status || 'rencana').toLowerCase() === s).length;
  const angka = (n) => (loading || error ? '…' : n);

  const STATS = [
    {
      icon: 'assignment_turned_in',
      value: angka(program.length),
      label: 'Program Kerja',
      desc: 'Program kerja kelompok KPM',
      iconColor: 'text-primary',
      valueColor: 'text-primary',
    },
    {
      icon: 'task_alt',
      value: angka(hitungStatus('selesai')),
      label: 'Program Selesai',
      desc: 'Program yang sudah dilaksanakan',
      iconColor: 'text-secondary',
      valueColor: 'text-secondary',
    },
    {
      icon: 'autorenew',
      value: angka(hitungStatus('berjalan')),
      label: 'Program Berjalan',
      desc: 'Program yang sedang dilaksanakan',
      iconColor: 'text-primary',
      valueColor: 'text-primary',
    },
    {
      icon: 'school',
      value: JUMLAH_MAHASISWA,
      label: 'Mahasiswa Pengabdi',
      desc: 'Kolaborasi lintas program studi',
      iconColor: 'text-secondary',
      valueColor: 'text-secondary',
    },
  ];

  return (
    <div className="impact-theme bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(35,83,62,0.06)]">
        <div className="h-16 px-gutter flex items-center justify-between max-w-xl mx-auto">
          <a href="/" className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary tracking-tight leading-none">
                KPM {NAMA_DESA}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-normal leading-tight mt-0.5">
                {LOKASI_SINGKAT}
              </span>
            </div>
          </a>
        </div>
      </header>

      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full max-w-xl mx-auto">
          {/* Chip lokasi */}
          <div className="px-gutter pt-4 pb-2">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px] text-primary" style={fill}>location_on</span>
              <span>Gampong Limpok • Kec. Darussalam, Aceh Besar</span>
            </div>
          </div>

          {/* Judul */}
          <section className="px-gutter pb-4">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-bold">
              Dampak Pengabdian Kami
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Perkembangan program kerja mahasiswa KPM bersama warga Gampong Limpok, Darussalam, Aceh Besar.
            </p>
          </section>

          {/* Foto utama (tampil hanya kalau FOTO_UTAMA diisi) */}
          {FOTO_UTAMA && (
            <section className="px-gutter pb-6">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-surface-container">
                <img
                  alt="Mahasiswa KPM bersama warga Desa Limpok"
                  className="w-full rounded-2xl shadow-sm object-cover h-56"
                  src={FOTO_UTAMA}
                />
              </div>
            </section>
          )}

          {/* Statistik */}
          <section className="px-gutter pb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]" style={fill}>analytics</span>
                <h2 className="font-headline-sm text-headline-sm text-primary">Capaian Pengabdian</h2>
              </div>
              <span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2.5 py-1 rounded-full">
                Siklus 2026
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between">
                  <div className={`w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center mb-2 ${s.iconColor}`}>
                    <span className="material-symbols-outlined text-[20px]" style={fill}>{s.icon}</span>
                  </div>
                  <div>
                    <span className={`font-display-mobile text-display-mobile font-bold tracking-tight ${s.valueColor}`}>
                      {s.value}
                    </span>
                    <p className="font-label-md text-label-md text-on-surface font-semibold mt-0.5">{s.label}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fokus program kerja (dari Supabase) */}
          <section className="px-gutter pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[20px]" style={fill}>workspace_premium</span>
              <h2 className="font-headline-sm text-headline-sm text-primary">Fokus Program Kerja</h2>
            </div>

            {loading && <p className="text-center text-on-surface-variant py-6">Memuat program kerja…</p>}
            {error && <p className="text-center text-error py-6">{error}</p>}
            {!loading && !error && program.length === 0 && (
              <p className="text-center text-on-surface-variant py-6">Belum ada program kerja yang ditambahkan.</p>
            )}

            <div className="flex flex-col gap-3">
              {program.map((p) => {
                const st = STATUS[(p.status || 'rencana').toLowerCase()] || STATUS.rencana;
                const tanggal = rentangTanggal(p.tanggal_mulai, p.tanggal_selesai);
                const progres = Number(p.progress_percentage) || 0;
                return (
                  <div key={p.id} className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center bg-primary-fixed text-primary">
                      <span className="material-symbols-outlined text-[24px]">
                        {IKON[(p.kategori || '').toLowerCase()] || IKON_DEFAULT}
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-headline-sm text-[16px] text-on-surface font-semibold leading-snug">{p.judul}</h3>
                        <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold shrink-0 ${st.badge}`}>
                          {st.label}
                        </span>
                      </div>
                      {p.deskripsi && (
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{p.deskripsi}</p>
                      )}
                      {(p.kategori || tanggal) && (
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-on-surface-variant font-label-sm text-label-sm">
                          {p.kategori && (
                            <span className="inline-flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-primary">label</span>
                              {p.kategori}
                            </span>
                          )}
                          {tanggal && (
                            <span className="inline-flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-secondary">schedule</span>
                              {tanggal}
                            </span>
                          )}
                        </div>
                      )}
                      {progres > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${Math.min(progres, 100)}%` }} />
                          </div>
                          <span className="font-label-sm text-label-sm text-primary font-semibold">{progres}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="px-gutter pb-4 flex flex-col gap-3">
            <a
              href="/program"
              className="w-full bg-primary text-on-primary py-3.5 px-5 rounded-xl font-label-lg text-label-lg font-semibold shadow-md flex items-center justify-center gap-2 active:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Lihat Program Lengkap</span>
            </a>
            <a
              href="/#kontak"
              className="w-full bg-surface-container-lowest text-primary py-3.5 px-5 rounded-xl font-label-lg text-label-lg font-semibold shadow-sm flex items-center justify-center gap-2 active:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">forum</span>
              <span>Hubungi Koordinator KPM</span>
            </a>
          </section>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(35,83,62,0.06)]">
        <div className="flex justify-around items-center h-16 px-gutter max-w-xl mx-auto">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              aria-current={n.active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
                n.active ? 'text-primary font-bold' : 'text-on-surface-variant'
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