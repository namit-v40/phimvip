'use client';

import authApiRequest from '@/api/auth';
import { useAppContext } from '@/components/app-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function LogoutLogic() {
  const router = useRouter()
  const pathname = usePathname()
  const { currentLocale } = useAppContext();
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    if (sessionToken === localStorage.getItem('sessionToken')) {
      authApiRequest
        .logoutFromNextClientToNextServer({lang: currentLocale}, true, signal)
        .then((res) => {
          console.log(res)
          router.push(`/login?redirectFrom=${pathname}`)
        })
    }
    return () => {
      controller.abort()
    }
  }, [sessionToken, router, pathname])
  return <div>page</div>
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}