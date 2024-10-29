import LogoutButton from "@/components/auth/LogoutButton";
import LocaleSwitcher from "@/components/language/LocaleSwitcher";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import Auth from "@/components/navbar/Auth";
import Navbar from "@/components/navbar/Navbar";
import { ModeToggle } from "@/components/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function AdminHeader() {
    const cookieStore = cookies();
  
    const user = cookieStore.get("user")?.value;

    return (
        <header>
        <div className="fixed top-0 w-full z-50">
            <div className="flex justify-between items-center px-[30px] sm:px-[40px] py-[10px] backdrop-blur-lg bg-transparent">
            <Link href='/' className="w-[150px] h-[30px] hidden xl:block">
                <Image src='/images/logo.png' width={150} height={30} alt="logo"/>
            </Link>
            <div className="flex justify-between xl:justify-end space-x-3 items-center w-full">
                <div className="flex space-x-3 items-center">
                    <AdminNavbar />
                    <Separator className="h-[25px] hidden xl:block" orientation="vertical" />
                    <div className="hidden space-x-3 items-center sm:flex">
                        <ModeToggle />
                        <LocaleSwitcher />
                    </div>
                    <Separator className="h-[25px] hidden sm:block" orientation="vertical" />
                    <div className='flex items-center space-x-2'>
                        <Link href="/admin" className='flex items-center space-x-1'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback><Skeleton className="w-[40px] h-[40px] rounded-full" /></AvatarFallback>
                            </Avatar>
                            <p className='text-[12px] sm:text-[14px] 2xl:text-[16px]] hover:text-[#1496d5]'>{user}</p>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>
            </div>
            <Separator />
        </div>
        </header>
    )
}
