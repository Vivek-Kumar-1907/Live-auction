"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
      fetch("/api/logout", {
        method: "POST"
      }).then(() => {
      router.push("/");
      }).catch((error) => {
        console.error("Error during logout:", error);
        router.push("/");
      });
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
            <h1 className="text-2xl font-bold">Logging out...</h1>
        </div>
    );
}