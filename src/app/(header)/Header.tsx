import dataApiRequest from "@/api/data";
import LocaleSwitcher from "@/components/language/LocaleSwitcher";
import Auth from "@/components/navbar/Auth";
import Navbar from "@/components/navbar/Navbar";
import { ModeToggle } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const categoryData = await dataApiRequest.getCategory();
  const countryData = await dataApiRequest.getCountry();
  const yearData = await dataApiRequest.getYear();
  
  return (
    <header>
      <div className="fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-[30px] sm:px-[40px] py-[10px] backdrop-blur-lg bg-transparent">
          <Link href='/' className="w-[150px] h-[30px] hidden xl:block">
            <Image src='/images/logo.png' width={150} height={30} alt="logo"/>
          </Link>
          <div className="flex justify-between xl:justify-end space-x-3 items-center w-full">
            <Navbar categoryData={categoryData.payload.categories} countryData={countryData.payload.countries} yearData={yearData.payload.years}/>
            <div className="flex space-x-3 items-center">
              <Separator className="h-[25px] hidden xl:block" orientation="vertical" />
              <div className="hidden space-x-3 items-center sm:flex">
                <ModeToggle />
                <LocaleSwitcher />
              </div>
              <Separator className="h-[25px] hidden sm:block" orientation="vertical" />
              <Auth />
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </header>
  )
}
