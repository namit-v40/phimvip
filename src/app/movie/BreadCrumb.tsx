"use client";
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from 'next-intl';
import { useAppContext } from '@/components/app-provider';

export default function BreadCrumb({data, dataEn}:{data:string; dataEn:string}) {
    const t = useTranslations('breadcrumb');
    const { currentLocale } = useAppContext();
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">{t('home')}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentLocale==='vi'?data:dataEn}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}