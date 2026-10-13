const NAMA_DESA = 'Desa Limpok';
const LOKASI_SINGKAT = 'Darussalam, Aceh Besar';

/*
  CATATAN: semua angka, nama program, dan detail di bawah ini masih DATA CONTOH
  dari desain Stitch. Ganti dengan data asli KPM setelah program berjalan
  (nanti bisa disambungkan ke tabel program_kerja di Supabase).
*/
const STATS = [
  {
    icon: 'diversity_1',
    value: '1.250+',
    label: 'Warga Terbantu',
    desc: 'Penerima manfaat langsung program gampong',
    iconColor: 'text-primary',
    valueColor: 'text-primary',
  },
  {
    icon: 'assignment_turned_in',
    value: '7',
    label: 'Program Kerja',
    desc: 'Program kerja kelompok KPM',
    iconColor: 'text-secondary',
    valueColor: 'text-secondary',
  },
  {
    icon: 'calendar_today',
    value: '45',
    label: 'Hari Pengabdian',
    desc: 'Aksi intensif pembauran bersama warga',
    iconColor: 'text-primary',
    valueColor: 'text-primary',
  },
  {
    icon: 'school',
    value: '11',
    label: 'Mahasiswa Pengabdi',
    desc: 'Kolaborasi lintas fakultas & keilmuan',
    iconColor: 'text-secondary',
    valueColor: 'text-secondary',
  },
];

const PROGRAMS = [
  {
    icon: 'storefront',
    title: 'Pemberdayaan UMKM Gampong',
    badge: 'Aktif',
    desc: 'Pendampingan perizinan halal, inovasi kemasan, dan digitalisasi penjualan produk olahan rumah tangga warga.',
    boxClass: 'bg-primary-fixed text-primary',
    metaColor: 'text-primary',
    meta: [
      { icon: 'check_circle', text: '14 Pelaku Usaha' },
      { icon: 'sell', text: '6 Produk Terdaftar' },
    ],
  },
  {
    icon: 'menu_book',
    title: 'Bimbingan Belajar & Pojok Literasi',
    badge: 'Rutin',
    desc: 'Penguatan calistung, kelas bahasa Inggris santai, dan revitalisasi perpustakaan balai desa bersama anak-anak sekolah dasar.',
    boxClass: 'bg-secondary-fixed text-secondary',
    metaColor: 'text-secondary',
    meta: [
      { icon: 'child_care', text: '65 Murid Aktif' },
      { icon: 'auto_stories', text: '320 Buku Tersedia' },
    ],
  },
  {
    icon: 'eco',
    title: 'Sanitasi Lingkungan & Gotong Royong',
    badge: 'Mingguan',
    desc: 'Pembersihan saluran irigasi, sosialisasi pemilahan sampah, dan penghijauan di sepanjang jalur jalan utama gampong.',
    boxClass: 'bg-surface-container text-primary',
    metaColor: 'text-primary',
    meta: [
      { icon: 'water_drop', text: '4 Titik Saluran' },
      { icon: 'park', text: '150 Bibit Pohon' },
    ],
  },
];

const NAV = [
  { label: 'Beranda', icon: 'cottage', href: '/' },
  { label: 'Misi Kami', icon: 'flag_circle', href: '/#misi' },
  { label: 'Program', icon: 'task_alt', href: '/program' },
  { label: 'Dampak', icon: 'analytics', href: '/dampak', active: true },
  { label: 'Tim', icon: 'group', href: '/tim' },
  { label: 'Kontak', icon: 'contact_phone', href: '/#kontak' },
];

const fill = { fontVariationSettings: "'FILL' 1" };

export default function Impact() {
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
              Kolaborasi nyata mahasiswa dan warga Gampong Limpok, Darussalam, Aceh Besar dalam membangun desa yang
              mandiri, berdaya, dan berkelanjutan.
            </p>
          </section>

          {/* Foto utama */}
          <section className="px-gutter pb-6">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-surface-container">
              <img
                alt="Mahasiswa KPM bersama warga Desa Limpok"
                className="w-full rounded-2xl shadow-sm object-cover h-56"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLbtqUDcYxt_ZHp3QKQkdWYWXP_pko2EoDqk-iQeagph2xIWcyuEZxH784mwF7OoAUHizjKLfnyCo5o-putxiWoQMJJag0PA1JUJMnukMStkfNBBbIrDc7yZ7K3uGMPF7ZbEY6Ct0vjyYTfpcRmoPn-MliitImeyiFCouzgvNJtcgKA3JVQ9H9bwdgASg3HsR_OhxUIBM7fWgzkDccrmlLmx6MejsdjNCLuBO7ELaLXIQX0TRusMFp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-on-primary">
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                  <p className="font-body-sm text-body-sm leading-snug">
                    Aktivitas pengabdian lapangan mahasiswa KPM bersama warga {NAMA_DESA}.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistik */}
          <section className="px-gutter pb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]" style={fill}>analytics</span>
                <h2 className="font-headline-sm text-headline-sm text-primary">Capaian Gotong Royong</h2>
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

          {/* Fokus program kerja */}
          <section className="px-gutter pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[20px]" style={fill}>workspace_premium</span>
              <h2 className="font-headline-sm text-headline-sm text-primary">Fokus Program Kerja</h2>
            </div>
            <div className="flex flex-col gap-3">
              {PROGRAMS.map((p) => (
                <div key={p.title} className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center ${p.boxClass}`}>
                    <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-headline-sm text-[16px] text-on-surface font-semibold leading-snug">{p.title}</h3>
                      <span className="font-label-sm text-label-sm text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full font-bold shrink-0">
                        {p.badge}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-on-surface-variant font-label-sm text-label-sm">
                      {p.meta.map((m) => (
                        <span key={m.text} className="inline-flex items-center gap-1">
                          <span className={`material-symbols-outlined text-[15px] ${p.metaColor}`}>{m.icon}</span>
                          {m.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimoni (placeholder, jangan dipublikasikan sebelum ada kutipan asli) */}
          <section className="px-gutter pb-6">
            <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-primary font-bold">Testimoni Warga &amp; Perangkat Gampong</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{NAMA_DESA}, Darussalam</p>
                </div>
              </div>
              <blockquote className="font-body-sm text-body-sm text-on-surface italic pl-3 border-l-2 border-primary/40 leading-relaxed">
                [Isi dengan kutipan asli dari warga atau perangkat gampong setelah program berjalan.]
              </blockquote>
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