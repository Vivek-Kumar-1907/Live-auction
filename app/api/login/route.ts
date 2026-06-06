import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const {rows : [user]} = await pool.query("SELECT * FROM users WHERE user_name = $1", [username]);
  if(!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }
  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.set("user", JSON.stringify({username: user.user_name, email: user.email, id: user.id}), 
    { 
      httpOnly: true,
      path: "/" 
    });
  return res;
}