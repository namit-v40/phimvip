import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const footer = useTranslations('footer');
  return (
    <footer className="sm:flex grid w-full sm:flex-wrap sm:justify-between items-center justify-center gap-y-2 gap-x-8 border-t py-4 text-center">
      <div className="sm:ml-3">
        <Link href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px]">
          &copy; 2023 Phim Vip
        </Link>
      </div>
      <ul className="hidden sm:flex sm:flex-wrap justify-center items-center gap-y-2 gap-x-8 sm:mr-4">
        <li>
          <Link href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] transition-colors hover:text-blue-500 focus:text-blue-500">
            {footer('about_us')}
          </Link>
        </li>
        <li>
          <Link href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] transition-colors hover:text-blue-500 focus:text-blue-500">
            {footer('license')}
          </Link>
        </li>
        <li>
          <Link href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] transition-colors hover:text-blue-500 focus:text-blue-500">
            {footer('contribute')}
          </Link>
        </li>
        <li>
          <Link href="#" color="blue-gray" className="font-normal text-[12px] sm:text-[14px] transition-colors hover:text-blue-500 focus:text-blue-500">
            {footer('contact_us')}
          </Link>
        </li>
      </ul>
    </footer>
  )
}
