"use client";
import React, { useEffect, useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { ModeToggle } from '../toggle-theme';
import LocaleSwitcher from '../language/LocaleSwitcher';
import { useAppContext } from '../app-provider';
import { Skeleton } from '../ui/skeleton';
import { useParams, usePathname } from 'next/navigation';

type Props = {
  categoryData: Array<any>,
  countryData: Array<any>,
  yearData: Array<any>
}

type DataItem = {
  value: string;
  title: string;
};

export default function Navbar({categoryData, countryData, yearData}: Props) {
  const t = useTranslations('home_navbar');
  const { currentLocale } = useAppContext();
  const params = useParams();
  const path = usePathname().split("/")[2];

  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => setIsMounted(true), []);

  const mapData = (data: Array<any>, localeFields: { viName: string, enName: string, viSlug: string, enSlug: string }) =>
    data?.filter(item => item[localeFields.viName] && item[localeFields.enName] && item[localeFields.viSlug] && item[localeFields.enSlug])
         ?.map(item => ({
            value: currentLocale === "vi" ? item[localeFields.viSlug] : item[localeFields.enSlug],
            title: currentLocale === "vi" ? item[localeFields.viName] : item[localeFields.enName]
  }));

  const categories = mapData(categoryData, { viName: "cat_name", enName: "cat_en_name", viSlug: "cat_slug", enSlug: "cat_en_slug" });
  const countries = mapData(countryData, { viName: "ctr_name", enName: "ctr_en_name", viSlug: "ctr_slug", enSlug: "ctr_en_slug" });
  const years = yearData?.map(year => ({ value: year.year_name, title: year.year_name }));

  if (!isMounted) {
    return <SkeletonMenu />
  }

  return (
    isDesktop
    ?
      <DesktopNav slug={params?.slug||""} categories={categories} countries={countries} years={years} t={t}/>
    :
      <MobileDrawer slug={params?.slug||""} categories={categories} countries={countries} years={years} t={t} />
  )
}

const SkeletonMenu = () => (
  <NavigationMenu>
    <NavigationMenuList className='gap-4 hidden xl:flex'>
      {Array(7).fill(null).map((_, index) => (
        <Skeleton key={index} className="w-[70px] h-[20px] rounded-full" />
      ))}
    </NavigationMenuList>
    <NavigationMenuList className='flex xl:hidden'>
      <Skeleton className="w-[30px] h-[30px] rounded-md" />
    </NavigationMenuList>
  </NavigationMenu>
);

const DesktopNav: React.FC<{ slug:string|string[], categories: DataItem[], countries: DataItem[], years: DataItem[], t: any }> = ({ slug, categories, countries, years, t }) => (
  <NavigationMenu className='hidden xl:block'>
    <NavigationMenuList>
      {["series", "single", "hoathinh", "tvshow"].map(type => (
        <ListType key={type} title={t(`type.${type}.title`)} value={t(`type.${type}.value`)} slug={slug}/>
      ))}
      <ListDropdown href="category" title={t('category')} data={categories} slug={slug}/>
      <ListDropdown href="country" title={t('country')} data={countries} slug={slug}/>
      <ListDropdown href="year" title={t('year')} data={years} slug={slug}/>
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileDrawer: React.FC<{ slug:string|string[], categories: DataItem[], countries: DataItem[], years: DataItem[], t: any }> = ({ slug, categories, countries, years, t }) => (
  <Drawer direction='left'>
    <DrawerTrigger><MenuIcon /></DrawerTrigger>
    <DrawerContent className='h-screen top-0 left-0 right-auto mt-0 rounded-none'>
      <DrawerHeader>
        <DrawerTitle className='flex justify-between items-center space-x-3 w-full'>
          <Link href='/' className="w-[100px] h-[20px]">
            <Image src='/images/logo.png' width={100} height={20} alt="logo"/>
          </Link>
          <div className='flex space-x-3 sm:hidden'>
            <ModeToggle />
            <LocaleSwitcher />
          </div>
        </DrawerTitle>
      </DrawerHeader>
      <Separator />
      <DrawerFooter>
        <NavigationMenu>
          <NavigationMenuList>
            {["series", "single", "hoathinh", "tvshow"].map(type => (
              <ListType key={type} title={t(`type.${type}.title`)} value={t(`type.${type}.value`)} slug={slug}/>
            ))}
            <ListDropdown href="category" title={t('category')} data={categories} slug={slug}/>
            <ListDropdown href="country" title={t('country')} data={countries} slug={slug}/>
            <ListDropdown href="year" title={t('year')} data={years} slug={slug}/>
          </NavigationMenuList>
        </NavigationMenu>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

type ListTypeProps = {
  slug:string|string[];
  title: string;
  value: string;
};

const ListType: React.FC<ListTypeProps> = ({ slug, title, value }) => {
  return (
    <NavigationMenuItem>
      <Link key={value} href={`/movie/type/${value}`} legacyBehavior passHref>
        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), `${slug===value?'underline text-[#1496d5]':''}`)}>
          {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

type ListDropdownProps = {
  slug: string|string[];
  href: string;
  title: string;
  data: { 
    value: string;
    title: string 
  }[]
};

const ListDropdown: React.FC<ListDropdownProps> = ({ slug, href, title, data }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-3 md:grid-cols-4 overflow-auto scrollbar-hide p-4 h-[250px] w-[90vw] xl:h-fit xl:w-[600px]">
          {data?.map(component => (
            <ListItem key={component.value} title={component.title} href={`/movie/${href}/${component.value}`} className={`${slug===component?.value?'underline text-[#1496d5]':''}`}>
              {component.title}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, ...props}, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"