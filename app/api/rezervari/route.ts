import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/rezervari — citește toate rezervările, cele mai noi primele
export async function GET() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

// PATCH /api/rezervari — schimbă statusul unei rezervări
// Body: { id: number, status: 'în așteptare' | 'confirmat' | 'respins' }
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, status } = body;

  const statusuriValide = ['în așteptare', 'confirmat', 'respins'];
  if (!id || !statusuriValide.includes(status)) {
    return NextResponse.json({ success: false, message: 'Date invalide.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Status actualizat.' });
}

// DELETE /api/rezervari — șterge o rezervare
// Body: { id: number }
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ success: false, message: 'ID lipsă.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Rezervarea a fost ștearsă.' });
}
