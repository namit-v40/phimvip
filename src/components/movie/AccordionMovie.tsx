import React, { ReactNode } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

export default function AccordionMovie({ title, children }: { title:string, children: ReactNode }) {
  const t = useTranslations('accordion');

  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>{t(`${title}`)}</AccordionTrigger>
            <AccordionContent>
              {children}
            </AccordionContent>
        </AccordionItem>
    </Accordion>

  )
}