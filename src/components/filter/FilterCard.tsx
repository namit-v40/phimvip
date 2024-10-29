"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "../app-provider";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Pending from "../loading/Pending";

type Props = {
    categories: { cat_slug:string; cat_en_slug:string;cat_name:string; cat_en_name:string }[]
    countries: { ctr_slug:string; ctr_en_slug:string;ctr_name:string; ctr_en_name:string }[]
    years: { year_name:string}[]
}

type FilterState = {
    query: string,
    year: string,
    type: string,
    category: string,
    country: string,
    lang: string,
    quality: string,
    actor: string,
    director: string
}

export default function FilterCard({props,filterState}:{props:Props;filterState:FilterState}) {
    const router = useRouter();
    const t = useTranslations('select_data');
    const filter = useTranslations('filter');
    const type = useTranslations('home_navbar');
    const pathName = usePathname();
    const { currentLocale } = useAppContext();

    const [filters, setFilters] = useState({
        query:filterState?.query||'',
        year:filterState?.year||'',
        type:filterState?.type||'',
        category:filterState?.category||'',
        country:filterState?.country||'',
        lang:filterState?.lang||'',
        quality:filterState?.quality||'',
        actor:filterState?.actor||'',
        director:filterState?.director||''
    })

    const updateState = (key:string, value:string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }

    const handleClear = () => {
        if(pathName==='/'){
            router.push(`/`);
        }else{
            router.push(`/movie`);
        }
        setFilters(prev => 
            Object.keys(prev).reduce((acc, key) => {
              acc[key as keyof FilterState] = '';
              return acc;
            }, {} as FilterState)
        );    
    };
    

    const categories = 
        currentLocale==='vi'
          ?props.categories?.filter(cat => cat.cat_name&&cat.cat_slug).map(cat=>({value:cat.cat_slug, label:cat.cat_name}))
          :props.categories?.filter(cat => cat.cat_name&&cat.cat_slug).map(cat=>({value:cat.cat_en_slug, label:cat.cat_en_name})) 
        
    const countries = 
        currentLocale==='vi'
          ?props.countries?.map(ctr=>({value:ctr.ctr_slug, label:ctr.ctr_name}))
          :props.countries?.map(ctr=>({value:ctr.ctr_en_slug, label:ctr.ctr_en_name})) 
    
    const years = props.years?.map(year=>({value:year.year_name?.toString(), label:year.year_name?.toString()}))

    const types = [
        {value:type('type.series.value'), label:type('type.series.title')},
        {value:type('type.single.value'), label:type('type.single.title')},
        {value:type('type.hoathinh.value'), label:type('type.hoathinh.title')},
        {value:type('type.tvshow.value'), label:type('type.tvshow.title')}
    ]

    const languages = [
        {value:t('vietsub.value'), label:t('vietsub.label')},
        {value:t('voice_over.value'), label:t('voice_over.label')},
        {value:t('special.value'), label:t('special.label')},
    ]

    const qualities = [
        {value:'SD', label:'SD'},
        {value:'HD', label:'HD'},
        {value:'FHD', label:'FHD'}
    ]
    
    return (
        <Card className="mb-4">
            <CardContent>
                {!categories||!countries||!years?
                    <Pending />
                :
                    <form action="/movie">
                        <div className="grid w-full items-center gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                                <div className="flex flex-col space-y-1.5 w-full">
                                    <Input value={filters?.actor} onChange={(e)=>updateState("actor",e.target.value)} id="actor" name="actor" placeholder={filter('actor')} className="text-[12px] md:text-[14px]"/>
                                </div>
                                <div className="flex flex-col space-y-1.5 w-full">
                                    <Input value={filters?.director} onChange={(e)=>updateState("director",e.target.value)} id="director" name="director" placeholder={filter('director')} className="text-[12px] md:text-[14px]"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
                                <SelectComponent title={filter('category')} name="category" data={categories} value={filters.category}/>
                                <SelectComponent title={filter('country')} name="country" data={countries} value={filters.country}/>
                                <SelectComponent title={filter('year')} name="year" data={years} value={filters.year?.toString()}/>
                                <SelectComponent title={filter('type')} name="type" data={types} value={filters.type}/>
                                <SelectComponent title={filter('language')} name="lang" data={languages} value={filters.lang}/>
                                <SelectComponent title={filter('quality')} name="quality" data={qualities} value={filters.quality}/>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <Button className="text-[12px] md:text-[14px]" onClick={(e)=>{e.preventDefault();handleClear()}} variant="outline">{filter('clear')}</Button>
                            <Button className="text-[12px] md:text-[14px]" type="submit">{filter('filter')}</Button>
                        </div>
                    </form>
                }
            </CardContent>
        </Card>
    )
}

type SelectProps = {
    title:string
    name:string
    data:{
        value:string
        label:string
    }[]
    value:string
}

export const SelectComponent = ({title, name, data, value}:SelectProps) => {
    return(
        <div className="flex flex-col space-y-1.5 w-full">
            <Select name={name} defaultValue={value}>
                <SelectTrigger className="text-[12px] md:text-[14px]" id={name}>
                    <SelectValue placeholder={title} />
                </SelectTrigger>
                <SelectContent className="text-[12px] md:text-[14px]" position="popper">
                    <SelectGroup>
                        <SelectLabel>{title}</SelectLabel>
                        {data?.map((item, idx) => (
                            <SelectItem key={idx} value={item.value}>{item.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}