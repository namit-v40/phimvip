import Layout from '@/app/(layout)/Layout';
import { useTranslations } from 'next-intl';
import React from 'react';
import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default function Register() {
  const register = useTranslations("register");

  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <h1 className='font-bold'>{register('title')}</h1>
      </div>
      <div className='flex justify-center items-center'>
        <RegisterForm />
      </div>
      <div className='text-center mt-[10px]'>
        <p className='text-[10px] sm:text-[12px] 2xl:text-[14px]'>{register('reference.or')}</p>
        <Link href='/login' className='underline text-[10px] sm:text-[12px] 2xl:text-[14px]'>{register('reference.href')}</Link>
      </div>
    </Layout>
  )
}