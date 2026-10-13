import { useState, useEffect } from 'react';

const NAMA_DESA = 'Desa Limpok';
const LOKASI = 'Kecamatan Darussalam, Kabupaten Aceh Besar';

const ALAMAT = 'Jl. Tgk. Syik Dipasi, Desa Limpok, Kec. Darussalam, Kabupaten Aceh Besar, Aceh';
const KOORDINAT_TEKS = '5°33′43″N 95°22′23″E';
const MAPS_LAT = 5.56194;
const MAPS_LNG = 95.37306;
const KONTAK = [
  { label: 'WhatsApp 1', tampil: '0831-7276-2408', wa: '6283172762408' },
  { label: 'WhatsApp 2', tampil: '0813-7243-115', wa: '628137243115' },
];

const BATAS_WILAYAH = [
  { arah: 'Utara', ket: 'Dekat kawasan Kampus Universitas Syiah Kuala (USK) / Kopelma Darussalam' },
  { arah: 'Selatan', ket: 'Berbatasan dengan Gampong Cot Cut' },
  { arah: 'Timur', ket: 'Berbatasan dengan Gampong Berabung' },
];

const MENU = [
  { label: 'Misi Kami', href: '#misi', icon: 'volunteer_activism' },
  { label: 'Program', href: '/program', icon: 'folder_shared' },
  { label: 'Dampak', href: '/dampak', icon: 'analytics' },
  { label: 'Tim', href: '/tim', icon: 'group' },
  { label: 'Lokasi', href: '#lokasi', icon: 'location_on' },
  { label: 'Kontak', href: '#kontak', icon: 'mail' },
];

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#F5EFE6] text-on-surface font-body-md min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'shadow-md bg-surface/95 backdrop-blur-md' : 'bg-surface'
        }`}
      >
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-4">
            <button
              aria-label="Menu"
              className="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-200 p-2 rounded-full md:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <a className="font-headline-md text-headline-md font-bold text-primary tracking-tight" href="#">
              KPM {NAMA_DESA}
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {MENU.slice(0, 5).map((m) => (
              <a
                key={m.href}
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-medium"
                href={m.href}
              >
                {m.label}
              </a>
            ))}
            <a
              href="#kontak"
              className="bg-primary-container text-on-primary hover:opacity-90 transition-opacity px-6 py-2 rounded-full font-label-sm text-label-sm active:scale-95 duration-200"
            >
              Hubungi Kami
            </a>
          </nav>
        </div>
      </header>

      {/* Drawer Mobile */}
      <div
        className={`fixed inset-0 z-50 flex transform transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
        <div className="relative bg-surface h-full w-80 shadow-2xl flex flex-col gap-2 p-stack-md">
          <div className="flex items-center justify-between mb-8">
            <span className="font-headline-md text-headline-md font-bold text-primary">KPM {NAMA_DESA}</span>
            <button className="p-2 rounded-full hover:bg-surface-container-highest" onClick={() => setDrawerOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {MENU.map((m) => (
              <a
                key={m.href}
                href={m.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-all duration-300 font-body-lg text-body-lg"
              >
                <span className="material-symbols-outlined">{m.icon}</span>
                {m.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-grow pt-24 pb-16">
        {/* Hero */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[618px]">
            <div className="md:col-span-5 flex flex-col gap-stack-lg z-10 md:pr-12">
              <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface leading-tight">
                Membangun Desa, Merajut Kebersamaan
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[480px]">
                Program Kegiatan Pengabdian Masyarakat (KPM) mahasiswa di {NAMA_DESA}, {LOKASI}, untuk mendorong pemberdayaan
                masyarakat dan pembangunan berkelanjutan di tingkat desa.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/program"
                  className="bg-primary-container text-on-primary hover:opacity-90 transition-opacity px-8 py-4 rounded-full font-label-sm text-label-sm shadow-sm active:scale-95 duration-200"
                >
                  Lihat Program
                </a>
                <a
                  href="#misi"
                  className="bg-transparent border border-outline hover:bg-surface-container transition-colors px-8 py-4 rounded-full font-label-sm text-label-sm text-on-surface-variant active:scale-95 duration-200"
                >
                  Tentang Kami
                </a>
              </div>
            </div>
            <div className="md:col-span-7 relative h-[442px] md:h-[707px] w-full mt-12 md:mt-0 rounded-2xl overflow-hidden soft-shadow group">
              <img
                alt="Mahasiswa KPM berkegiatan bersama warga"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfpU7mctKHQ8XIoZMXlJEG3kaJYlGJxhielseEDVykYICpko68Ds9Eps4q0fWXHELhLeuIiN9pChD8vlxnjs3mHqhW_e3dYmfSThO1V4HbboynkwuPnDJgRYHSc62g0L9pHS_27Hm8ySlJH8mBFN-8hIn-Uzld1VCpINwu2kQQ6tCqb-SJzAlXbJeW6NDjSsGKsrleY5L5IObXfU8tryEkG5BqitqVBNGgPRdL_xcXKda_eHhidxkT"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Misi */}
        <section id="misi" className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 relative scroll-mt-28">
          <div className="max-w-[800px] mx-auto text-center space-y-stack-md py-stack-lg">
            <span className="material-symbols-outlined text-primary-container text-4xl mb-4 opacity-80">volunteer_activism</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Misi kami sederhana: memberdayakan potensi {NAMA_DESA} melalui kolaborasi nyata dan pengabdian yang tulus.
            </h2>
            <div className="h-1 w-24 bg-primary-container mx-auto rounded-full mt-8 opacity-50" />
          </div>
        </section>

        {/* Program Kerja */}
        <section id="program" className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 scroll-mt-28">
          <div className="mb-stack-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Program Kerja Kami</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pendekatan holistik untuk pemberdayaan masyarakat {NAMA_DESA}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[300px]">
            <div className="md:col-span-8 bg-surface rounded-xl p-8 flex flex-col justify-between soft-shadow">
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-6 text-on-secondary-container">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Pemberdayaan Masyarakat</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[400px]">
                  Mendorong kemandirian warga desa melalui pelatihan dan pendampingan berkelanjutan.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface rounded-xl p-8 flex flex-col justify-between soft-shadow">
              <div>
                <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-6 text-tertiary">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Gotong Royong</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Menjunjung tinggi nilai kebersamaan dalam setiap langkah pembangunan fisik maupun sosial.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bg-primary-container text-on-primary rounded-xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[150px]">public</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md mb-4">Program Kerja</h3>
                <div className="text-4xl font-bold font-headline-lg tracking-tight mb-2">0</div>
                <p className="font-body-md text-body-md opacity-90">
                  Angka ini nanti diisi otomatis dari data program kerja di database.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 bg-surface rounded-xl flex flex-col md:flex-row overflow-hidden soft-shadow">
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-6 text-primary-container">
                  <span className="material-symbols-outlined">eco</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Edukasi Berkelanjutan</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Fokus pada peningkatan kualitas sumber daya manusia melalui program bimbingan belajar dan literasi.
                </p>
              </div>
              <div className="md:w-1/2 relative h-48 md:h-full">
                <img
                  alt="Kegiatan edukasi berkelanjutan"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHiUITF0RoP3O4qvb2QIwjyOe5QSbdL0mQO7p65s2isCVv4xDBjaX4hN_o8AxhvWe2X-63nLpTNmPs_437MlqSBqD6tUqJjsSFqibXhEnY2yvj4-kOudkl8kWpNlkzQF8hHB3MR0USnrqgiYueQZaxJsrDk0yKEAZU-TeEr7rW_zdKJcRtJ1hev4gZkNgBB2cxRUnZLJSt9f4aiXdy0kqHjQzjUlon6judSiyC7dp8tEPZNFBbMi3F"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lokasi & Batas Wilayah */}
        <section id="lokasi" className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32 scroll-mt-28">
          <div className="mb-stack-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Lokasi &amp; Batas Wilayah</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Detail letak {NAMA_DESA}, {LOKASI}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-surface rounded-xl p-8 soft-shadow flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Alamat Pusat Gampong</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{ALAMAT}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Koordinat: {KOORDINAT_TEKS}</p>
                </div>
              </div>

              <div>
                <h3 className="font-label-sm text-label-sm text-on-surface mb-3 uppercase">Batas Wilayah</h3>
                <ul className="flex flex-col gap-3">
                  {BATAS_WILAYAH.map((b) => (
                    <li key={b.arah} className="flex gap-3 font-body-md text-body-md text-on-surface-variant">
                      <span className="font-semibold text-on-surface w-20 shrink-0">{b.arah}</span>
                      <span>{b.ket}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Berada di dekat kawasan kampus USK dan UIN Ar-Raniry, dikelilingi fasilitas umum dan area kos-kosan,
                serta dilalui jalan utama seperti Jl. Tgk. Syik Dipasi dan Jl. Lingkar Kampus.
              </p>

              <a
                href={`https://www.google.com/maps?q=${MAPS_LAT},${MAPS_LNG}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:opacity-90 transition-opacity px-8 py-4 rounded-full font-label-sm text-label-sm shadow-sm active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined text-[20px]">map</span>
                Buka di Google Maps
              </a>
            </div>

            <div className="md:col-span-7 rounded-xl overflow-hidden soft-shadow min-h-[360px] bg-surface">
              <iframe
                title={`Peta ${NAMA_DESA}`}
                src={`https://www.google.com/maps?q=${MAPS_LAT},${MAPS_LNG}&z=15&output=embed`}
                className="w-full h-full min-h-[360px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="kontak" className="bg-surface-container mt-auto border-t border-surface-variant scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-stack-lg px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full">
          <div className="flex flex-col gap-4">
            <span className="font-headline-md text-headline-md text-primary font-bold">KPM {NAMA_DESA}</span>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-80 max-w-[320px]">
              {LOKASI}. © 2026 KPM {NAMA_DESA}. Berbakti untuk Negeri.
            </p>
          </div>
          <nav className="flex flex-col gap-3">
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 font-body-md text-body-md" href="#misi">Misi Kami</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 font-body-md text-body-md" href="/program">Program Kerja</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 font-body-md text-body-md" href="#lokasi">Lokasi</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 font-body-md text-body-md font-semibold" href="#kontak">Kontak</a>
          </nav>
          <div className="flex flex-col gap-3">
  <h3 className="font-label-sm text-label-sm text-on-surface uppercase">Hubungi Kami</h3>
  {KONTAK.map((k) => (
    <a
      key={k.wa}
      href={`https://wa.me/${k.wa}?text=${encodeURIComponent('Halo KPM Desa Limpok')}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
    >
      <span className="material-symbols-outlined text-[20px]">call</span>
      <span>
        {k.label}
        <span className="block text-sm opacity-80">{k.tampil}</span>
      </span>
    </a>
  ))}
</div>
        </div>
      </footer>
    </div>
  );
}
