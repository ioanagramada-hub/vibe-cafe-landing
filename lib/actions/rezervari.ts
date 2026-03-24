'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type RezervareData = {
  nume: string;
  email: string;
  telefon: string;
  nr_persoane: number;
  data: string;   // format: YYYY-MM-DD
  ora: string;    // format: HH:MM
};

export async function salveazaRezervare(formData: RezervareData) {
  const { error } = await supabase.from('rezervari').insert({
    ...formData,
    status: 'în așteptare',
  });

  if (error) {
    return { success: false, message: 'A apărut o eroare. Încearcă din nou.' };
  }

  return { success: true, message: 'Rezervarea a fost trimisă cu succes!' };
}

export async function citesteRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, data: [] };
  }

  return { success: true, data };
}
