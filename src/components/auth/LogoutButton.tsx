'use client'

import React from 'react'
import { useAppContext } from '../app-provider'
import { usePathname, useRouter } from 'next/navigation'
import authApiRequest from '@/api/auth'
import { handleErrorApi } from '@/lib/utils'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'

export default function LogoutButton() {
    const logoutTrans = useTranslations('logout');
    const { toast } = useToast();
    const { currentLocale, setUser } = useAppContext()
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        try {
            const result = await authApiRequest.logoutFromNextClientToNextServer({lang: currentLocale})
            router.push('/login')
            toast({ title: logoutTrans('title'), description: result?.payload?.message || "Đăng xuất thành công", variant:'success' })
        } catch (error) {
            handleErrorApi({ title: logoutTrans('error_message.title'), error })
            authApiRequest.logoutFromNextClientToNextServer({lang: currentLocale}, true).then((res) => {
            router.push(`/login?redirectFrom=${pathname}`)
        })
        } finally {
            setUser(null)
            router.refresh()
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('sessionTokenExpiresAt')
        }
    }
    return (
        <Button className='text-[12px] sm:text-[14px] 2xl:text-[15px]' onClick={handleLogout}>
            {logoutTrans('title')}
        </Button>
    )
}