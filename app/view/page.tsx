"use client"

import {useEffect, useState} from "react";
import ViewCard from "@/components/ViewCard";

export default function View(){
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("/api/view", {
            method: "GET"
        }).then((response) => {
            if(!response.ok) {
                console.error("Failed to fetch items for viewing");
            }
            return response.json();
        }).catch((error) => {
            console.error("Error fetching items for viewing:", error);
        }).then((data) => {
            setItems(data);
            console.log("Items for viewing:", data);
        });
    }, []);
    return (
        <div className="min-h-screen px-8 py-12 bg-zinc-50 dark:bg-black">
            <h1 className="text-3xl font-bold">View Items</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {
                items.map((item: {id: number, title: string, description: string, starting_bid: number, image_url: string, created_at: string}) => (
                    <div key={item.id} className="w-full max-w-md p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                        <ViewCard key={item.id} imageurl={item.image_url} title={item.title} description={item.description} startingBid={item.starting_bid} createdAt={item.created_at} />
                    </div>
                ))
            }
            </div>
        </div>
    )
}