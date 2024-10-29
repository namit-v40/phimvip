"use client"
import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react';

export default function ToastMessage() {
    const { toast } = useToast();

    useEffect(() => {
        // get message from cookie
        const toastMessage = document.cookie.split('; ').find(row => row.startsWith('toastMessage='))?.split('=')[1];

        if (toastMessage) {
            // Decode URL-encoded message
            const decodedMessage = decodeURIComponent(toastMessage);

            // show message
            toast({ description: decodedMessage, variant:"warning" })

            // delete cookie after displaying notification
            document.cookie = 'toastMessage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        }
    },[])

    return (
        <div></div>
    )
}