import {cookies} from "next/headers";

export async function getUserDetails() {
    const cookieStore = await cookies();
    const user = cookieStore.get("user")?.value;
    if(!user) return null;
    const {username, email, id} = JSON.parse(user);
    if((!username) || (!email) || (!id))
        return null;
    return {username, email, id};
}

export async function clearUserCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("user");
}