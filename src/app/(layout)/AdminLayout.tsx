import React, { ReactNode, Suspense } from 'react';
import Pending from '@/components/loading/Pending';
import ToastMessage from '@/components/navbar/ToastMessage';
import AdminHeader from '../(header)/AdminHeader';

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<Pending />}>
      <div className="font-[family-name:var(--font-geist-sans)]">
        <AdminHeader />
        <ToastMessage />
        <main className="mt-[80px] px-[20px] w-full min-h-[80vh]">
            {children}
        </main>
      </div>
    </Suspense>
  )
}