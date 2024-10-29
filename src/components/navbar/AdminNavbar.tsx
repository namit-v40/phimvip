"use client";
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../app-provider';
import { Skeleton } from '../ui/skeleton';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ModeToggle } from '../toggle-theme';
import LocaleSwitcher from '../language/LocaleSwitcher';
import { Separator } from '../ui/separator';

type Props = {}

export default function AdminNavbar({}: Props) {
    const t = useTranslations('admin_navbar');
    const { currentLocale } = useAppContext();

    const isDesktop = useMediaQuery('(min-width: 1280px)');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) {
        return <SkeletonMenu />
    }

    return (
    isDesktop
        ?
        <DesktopNav t={t}/>
        :
        <MobileDrawer t={t} />
    )
}


const SkeletonMenu = () => (
    <NavigationMenu>
      <NavigationMenuList className='gap-4 hidden xl:flex'>
        {Array(2).fill(null).map((_, index) => (
          <Skeleton key={index} className="w-[70px] h-[20px] rounded-full" />
        ))}
      </NavigationMenuList>
      <NavigationMenuList className='flex xl:hidden'>
        <Skeleton className="w-[30px] h-[30px] rounded-md" />
      </NavigationMenuList>
    </NavigationMenu>
);

const DesktopNav: React.FC<{ t: any }> = ({ t }) => (
    <NavigationMenu className='hidden xl:block'>
      <NavigationMenuList>
        <NavigationMenuItem>
            <Link href={`/admin`} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                    Danh sách phim
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <Link href={`/admin/create`} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                    Tạo phim
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
);
  
const MobileDrawer: React.FC<{ t: any }> = ({ t }) => (
    <Drawer direction='left'>
        <DrawerTrigger><MenuIcon /></DrawerTrigger>
        <DrawerContent className='h-screen top-0 left-0 right-auto mt-0 rounded-none'>
        <DrawerHeader>
            <DrawerTitle className='flex justify-between items-center space-x-3 w-full'>
            <Link href='/' className="w-[100px] h-[20px]">
                <Image src='/images/logo.png' width={100} height={20} alt="logo"/>
            </Link>
            <div className='flex space-x-3 sm:hidden'>
                <ModeToggle />
                <LocaleSwitcher />
            </div>
            </DrawerTitle>
        </DrawerHeader>
        <Separator />
        <DrawerFooter>
            <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href={`/admin`} legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                            Danh sách phim
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={`/admin/create`} legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                            Tạo phim
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
);