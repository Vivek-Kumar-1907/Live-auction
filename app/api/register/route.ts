import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  const existingUser = await pool.query("SELECT id FROM users WHERE user_name = $1 OR email = $2", [username, email]);
  if(existingUser.rows.length > 0) {
    return NextResponse.json({ error: "Username or email already exists" }, { status: 400 });
  }
  await pool.query(
    "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)",
    [username, email, hashPassword(password)]
  );
  console.log(`Registered new user: ${username} (${email})`);
  return NextResponse.json({ success: true }, { status: 201 });
}