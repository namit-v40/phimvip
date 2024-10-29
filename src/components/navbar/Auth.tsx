import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cookies } from 'next/headers';
import LogoutButton from '../auth/LogoutButton';
import { Skeleton } from "@/components/ui/skeleton"



export default function Auth() {
  const t = useTranslations('home_navbar');
  const cookieStore = cookies();
  
  const user = cookieStore.get("user")?.value;
  const isAdmin = cookieStore.get("isAdmin")?.value;

  return (
    user
    ?
      <div className='flex items-center space-x-2'>
        {isAdmin
        ?
          <Link href="/admin" className='flex items-center space-x-1'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback><Skeleton className="w-[40px] h-[40px] rounded-full" /></AvatarFallback>
            </Avatar>
            <p className='text-[12px] sm:text-[14px] 2xl:text-[16px]] hover:text-[#1496d5]'>{user}</p>
          </Link>
        :
          <Link href="/" className='flex items-center space-x-1'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback><Skeleton className="w-[40px] h-[40px] rounded-full" /></AvatarFallback>
            </Avatar>
            <p className='text-[12px] sm:text-[14px] 2xl:text-[16px] hover:text-[#1496d5]'>{user}</p>
          </Link>
        }
        <LogoutButton />
      </div>
      :
      <div className='space-x-2'>
          <Link href="/login"><Button className='bg-blue-400 dark:bg-foreground px-[8px] text-[12px] sm:text-[14px] 2xl:text-[15px]'>{t('login')}</Button></Link>
          <Link href="/register"><Button className='bg-blue-400 dark:bg-foreground px-[8px] text-[12px] sm:text-[14px] 2xl:text-[15px]'>{t('register')}</Button></Link>
      </div>
  )
}