"use client";
import { useAppContext } from '@/components/app-provider';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  props:{
    type:{
      vi:{ label:string, href:string },
      en:{ label:string, href:string }
    }
    country:{
      vi:{ label:string, href:string },
      en:{ label:string, href:string }
    }
    data:{ vi:string, en:string }
  }
}

export default function BreadCrumbDetail({ props }: Props) {
  const t = useTranslations('breadcrumb');

  const { currentLocale } = useAppContext();
  return (
      <Breadcrumb className='mb-[10px]'>
          <BreadcrumbList>
              <BreadcrumbItem className="text-[10px] sm:text-[12px] 2xl:text-[14px] text-nowrap">
                  <BreadcrumbLink href="/">{t('home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-[10px] sm:text-[12px] 2xl:text-[14px] text-nowrap md:block hidden">
                  <BreadcrumbLink href={`/movie/type/${currentLocale==='vi'?props.type.vi.href:props.type.en.href}`}>{currentLocale==='vi'?props.type.vi.label:props.type.en.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='md:block hidden'/>
              <BreadcrumbItem className="text-[10px] sm:text-[12px] 2xl:text-[14px] text-nowrap md:block hidden">
                  <BreadcrumbLink href={`/movie/country/${currentLocale==='vi'?props.country.vi.href:props.country.en.href}`}>{currentLocale==='vi'?props.country.vi.label:props.country.en.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='md:block hidden'/>
              <BreadcrumbItem className="text-[10px] sm:text-[12px] 2xl:text-[14px] text-nowrap">
                  <BreadcrumbPage>{currentLocale==='vi'?props.data.vi:props.data.en}</BreadcrumbPage>
              </BreadcrumbItem>
          </BreadcrumbList>
      </Breadcrumb>
  )
}