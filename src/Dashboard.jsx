import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './useAuth';

const NAMA_DESA = 'Desa Limpok';

const LABEL_ROLE = {
  mahasiswa: 'Mahasiswa KPM',
  dpl: 'Dosen Pembimbing Lapangan',
  admin: 'Admin',
};

export default function Dashboard() {
  const { session, profil, loading } = useAuth();
  const [jumlah, setJumlah] = useState(null);

  // Belum login -> ke halaman masuk
  useEffect(() => {
    if (!loading && !session) window.location.replace('/masuk');
  }, [loading, session]);

  // Angka ringkas (sekaligus tes aturan akses database)
  useEffect(() => {
    if (!profil) return;
    let aktif = true;
    async function hitung() {
      let q;
      if (profil.role === 'dpl') {
        q = supabase.from('bimbingan').select('id', { count: 'exact', head: true }).eq('dpl_id', profil.id);
      } else {
        q = supabase.from('logbook').select('id', { count: 'exact', head: true }).eq('mahasiswa_id', profil.id);
      }
      const { count } = await q;
      if (aktif) setJumlah(count ?? 0);
    }
    hitung();
    return () => {
      aktif = false;
    };
  }, [profil]);

  async function keluar() {
    await supabase.auth.signOut();
    window.location.replace('/');
  }

  if (loading || !session) {
    return (
      <div className="impact-theme bg-surface min-h-screen flex items-center justify-center text-on-surface-variant">
        Memuat…
      </div>
    );
  }

  const isDpl = profil?.role === 'dpl';

  return (
    <div className="impact-theme bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-gutter flex items-center justify-between gap-2 max-w-3xl mx-auto">
          <a href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[22px]">nature_people</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate">
              KPM {NAMA_DESA}
            </span>
          </a>
          <button
            type="button"
            onClick={keluar}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Keluar
          </button>
        </div>
      </header>

      <main className="flex-1 w-full pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-gutter flex flex-col gap-4">
          {!profil ? (
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
              <h1 className="font-headline-sm text-headline-sm text-primary mb-1">Profil belum diatur</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Akun kamu sudah masuk, tetapi profilnya belum ada. Hubungi admin untuk mengaturnya.
              </p>
            </div>
          ) : (
            <>
              <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">{isDpl ? 'school' : 'person'}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-on-surface-variant">Selamat datang,</p>
                  <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight leading-tight">
                    {profil.nama}
                  </h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {LABEL_ROLE[profil.role] || profil.role}
                    {profil.jurusan ? ` • ${profil.jurusan}` : ''}
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {isDpl ? 'groups' : 'edit_note'}
                  </span>
                  <p className="font-display-mobile text-display-mobile text-primary mt-1">
                    {jumlah === null ? '…' : jumlah}
                  </p>
                  <p className="font-label-md text-label-md text-on-surface">
                    {isDpl ? 'Mahasiswa Bimbingan' : 'Catatan Logbook'}
                  </p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
                  <p className="font-label-md text-label-md text-on-surface mt-2">Akun aktif</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {session.user.email}
                  </p>
                </div>
              </section>

              <section className="bg-surface-container-low rounded-2xl p-5 shadow-sm">
                <h2 className="font-headline-sm text-headline-sm text-primary mb-1">Segera hadir</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {isDpl
                    ? 'Review logbook, persetujuan laporan, dan pemantauan progres mahasiswa.'
                    : 'Catatan logbook harian, unggah laporan, dan pelacak progres.'}
                </p>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}