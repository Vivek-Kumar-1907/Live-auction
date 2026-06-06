import {redirect} from "next/navigation";
import {getUserDetails} from "@/lib/handleCookies";
import DashboardButtons from "@/components/DashboardButtons";

export default async function Dashboard() {
    const userDetails = await getUserDetails();
    if(!userDetails) {
        redirect("/login");
    }
    const username = userDetails.username;
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">         
        { username && <h1 className="text-2xl font-bold">Welcome, {username}!</h1> }            
            <DashboardButtons />         
        </div>
    )
}