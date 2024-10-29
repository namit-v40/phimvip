import Layout from '@/app/(layout)/Layout';
import { useTranslations } from 'next-intl';
import React from 'react';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default function Login() {
  const login = useTranslations("login");

  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <h1 className='font-bold'>{login('title')}</h1>
      </div>
      <div className='flex justify-center items-center'>
        <LoginForm />
      </div>
      <div className='text-center mt-[10px]'>
        <p className='text-[10px] sm:text-[12px] 2xl:text-[14px]'>{login('reference.or')}</p>
        <Link href='/register' className='underline text-[10px] sm:text-[12px] 2xl:text-[14px]'>{login('reference.href')}</Link>
      </div>
    </Layout>
  )
}