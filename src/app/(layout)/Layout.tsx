import React, { ReactNode, Suspense } from 'react';
import Header from '../(header)/Header';
import Footer from '@/components/footer/Footer';
import Pending from '@/components/loading/Pending';
import ToastMessage from '@/components/navbar/ToastMessage';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<Pending />}>
      <div className="font-[family-name:var(--font-geist-sans)]">
        <Header />
        <ToastMessage />
        <main className="mt-[80px] px-[20px] w-full min-h-[80vh]">
            {children}
        </main>
        <Footer />
      </div>
    </Suspense>
  )
}