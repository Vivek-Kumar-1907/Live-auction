import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getUserDetails } from '@/lib/handleCookies';

export async function GET() {
  const { id: userId } = await getUserDetails() || {};
  if (!userId) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }
  const { rows: items } = await pool.query("SELECT items.*, users.user_name FROM items JOIN users ON items.user_id = users.id WHERE user_id != $1 AND items.created_at > $2", [userId, new Date(Date.now() - 24 * 60 * 60 * 1000)]);
  return NextResponse.json(items);
}