import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './useAuth';

const NAMA_DESA = 'Desa Limpok';

function pesanError(msg = '') {
  if (/invalid login credentials/i.test(msg)) return 'Email atau kata sandi salah.';
  if (/email not confirmed/i.test(msg)) return 'Email belum dikonfirmasi. Hubungi admin.';
  return 'Gagal masuk. Coba lagi beberapa saat.';
}

export default function Masuk() {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [sandi, setSandi] = useState('');
  const [lihat, setLihat] = useState(false);
  const [proses, setProses] = useState(false);
  const [error, setError] = useState('');

  // Kalau sudah login, langsung ke dashboard
  useEffect(() => {
    if (!loading && session) window.location.replace('/dashboard');
  }, [loading, session]);

  async function kirim(e) {
    e.preventDefault();
    setError('');
    setProses(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: sandi,
    });
    if (error) {
      setError(pesanError(error.message));
      setProses(false);
      return;
    }
    window.location.replace('/dashboard');
  }

  return (
    <div className="impact-theme bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col items-center justify-center px-gutter py-10">
      <div className="w-full max-w-sm">
        <a href="/" className="flex flex-col items-center gap-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-[0_4px_12px_rgba(6,60,40,0.18)]">
            <span className="material-symbols-outlined text-on-primary text-[30px]">nature_people</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight">KPM {NAMA_DESA}</span>
        </a>

        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight mb-1">Masuk</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-5">
            Khusus mahasiswa KPM dan dosen pembimbing.
          </p>

          <form onSubmit={kirim} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="font-label-md text-label-md text-on-surface">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 font-body-md text-body-md outline-none focus:border-primary"
                placeholder="nama@email.com"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label-md text-label-md text-on-surface">Kata sandi</span>
              <div className="relative">
                <input
                  type={lihat ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={sandi}
                  onChange={(e) => setSandi(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 pr-11 font-body-md text-body-md outline-none focus:border-primary"
                />
                <button
                  type="button"
                  aria-label={lihat ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  onClick={() => setLihat((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {lihat ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </label>

            {error && (
              <p className="font-body-sm text-body-sm text-error bg-error-container/60 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={proses}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm active:scale-[0.98] transition-transform disabled:opacity-60"
            >
              {proses ? 'Memproses…' : 'Masuk'}
            </button>
          </form>
        </div>

        <a href="/" className="block text-center mt-5 font-label-md text-label-md text-primary">
          ← Kembali ke beranda
        </a>
      </div>
    </div>
  );
}