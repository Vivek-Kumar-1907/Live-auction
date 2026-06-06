"use client";

import ViewCard from "./ViewCard";
import Link from "next/link";

export default function BuyCard({ id, imageurl, title, description, startingBid, createdAt, createdBy, auctionLength}: {
  id: number;
  imageurl: string;
  title: string;
  description: string;
  startingBid: number;
  createdAt: string;
  createdBy?: string;
  auctionLength: string;
}) {
  return (
    <Link href={`/auction/${id}`} className="block">
    <ViewCard imageurl={imageurl} title={title} description={description} startingBid={startingBid} createdAt={createdAt} createdBy={createdBy} auctionLength={auctionLength}/>
    </Link>
  );
}