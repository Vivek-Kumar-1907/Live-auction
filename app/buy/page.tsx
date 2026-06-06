"use client"

import {useEffect, useState} from "react";
import BuyCard from "@/components/BuyCard";
import BackToDashNav from "@/components/BackToDashNav";

export default function Buy(){
    const [items, setItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() => {
        setIsProcessing(true);
        fetch("/api/buy", {
            method: "GET"
        }).then((response) => {
            if(!response.ok) {
                console.error("Failed to fetch items for buying");
            }
            return response.json();
        }).catch((error) => {
            console.error("Error fetching items for buying:", error);
        }).then((data) => {
            setItems(data);
            if (data.length === 0) {
                setIsEmpty(true);
            }
            console.log("Items for buying:", data);
        }).finally(() => {
            setIsProcessing(false);
        });
    }, []);
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <BackToDashNav/>
             <div className="py-8 px-8">
            <h1 className="text-3xl font-bold">Buy Items</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400" >
                {isProcessing ? "Loading..." : ""}
            </p>
            {isEmpty && !isProcessing && <p className="text-zinc-600 dark:text-zinc-400">No items are on sale :((</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {
                items.map((item: {id: number, title: string, description: string, starting_bid: number, image_url: string, created_at: string, user_name: string, auctionlength: string}) => (
                    <div key={item.id} className="w-full max-w-md p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                        <BuyCard auctionLength={item.auctionlength} key={item.id} id={item.id} imageurl={item.image_url} title={item.title} description={item.description} startingBid={item.starting_bid} createdAt={item.created_at} createdBy={item.user_name}/>
                    </div>
                ))
            }
            </div>
            </div>
        </div>
    )
}