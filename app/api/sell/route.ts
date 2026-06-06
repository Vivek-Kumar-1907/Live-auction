import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import { getUserDetails } from '@/lib/handleCookies';

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("startingBid"));
  const image = formData.get("image") as File;
  const userDetails = await getUserDetails();
  if (!userDetails) {
    return NextResponse.json({ error: "Wrong user-id" }, { status: 401 });
  }
  const userId = userDetails.id;

  const arrayBuf = await image.arrayBuffer();
  const imbase64 = Buffer.from(arrayBuf).toString("base64");
  const formattedimagebase64 = `data:${image.type};base64,${imbase64}`;

  const uploaded = await cloudinary.uploader.upload(formattedimagebase64, {
    folder: "items",
    public_id: `${Date.now()}-${image.name}`,
  });
  const imageUrl = uploaded.secure_url;

  await pool.query(
    "INSERT INTO items (title, description, starting_bid, image_url, user_id) VALUES ($1, $2, $3, $4, $5)",
    [title, description, price, imageUrl, userId]
  );
  return NextResponse.json({ success: true }, { status: 201 });
}