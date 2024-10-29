'use client';

import {useTransition} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Locale} from '@/i18n/config';
import {setUserLocale} from '@/services/locale';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  defaultValue: string;
  items: Array<{value: string; label: string}>
};

export default function LocaleSwitcherSelect({defaultValue, items}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      localStorage.setItem('language', locale);
      setUserLocale(locale);
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger disabled={isPending?true:false} asChild>
            <Button className="w-[32px] text-[12px] sm:text-[14px] 2xl:text-[15px]">{defaultValue==="vi"?'VI':'EN'}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-14">
            <DropdownMenuRadioGroup value={defaultValue} onValueChange={onChange}>
                {items.map((item)=>(
                    <DropdownMenuRadioItem className='text-[12px] sm:text-[14px] 2xl:text-[15px]' key={item.value} value={item.value}>{item.label}</DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}