import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Hook untuk membaca status login dan profil user (nama, role, dll)
export function useAuth() {
  const [session, setSession] = useState(null);
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aktif = true;

    async function muatProfil(user) {
      if (!user) {
        if (aktif) setProfil(null);
        return;
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (aktif) setProfil(data || null);
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!aktif) return;
      setSession(data.session);
      await muatProfil(data.session?.user);
      if (aktif) setLoading(false);
    });

    const { data: langganan } = supabase.auth.onAuthStateChange((_event, sesi) => {
      setSession(sesi);
      // setTimeout: hindari memanggil Supabase langsung di dalam callback ini
      setTimeout(() => muatProfil(sesi?.user), 0);
    });

    return () => {
      aktif = false;
      langganan.subscription.unsubscribe();
    };
  }, []);

  return { session, profil, loading };
}