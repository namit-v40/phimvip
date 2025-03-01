"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl"

export function ModeToggle() {
  const { setTheme } = useTheme();

  const t = useTranslations('theme');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[32px] text-[12px] sm:text-[14px] 2xl:text-[15px]">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-[12px] sm:text-[14px] 2xl:text-[15px]" onClick={() => setTheme("dark")}>{t('dark')}</DropdownMenuItem>
        <DropdownMenuItem className="text-[12px] sm:text-[14px] 2xl:text-[15px]" onClick={() => setTheme("light")}>{t('light')}</DropdownMenuItem>
        <DropdownMenuItem className="text-[12px] sm:text-[14px] 2xl:text-[15px]" onClick={() => setTheme("system")}>{t('system')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}