"use client";
import React from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type Data = Record<"value" | "label", string>;

type Props = {
    data:{
        categories:Data[]
        countries:Data[]
        years:Data[]
        types:Data[]
        actors:Data[]
        directors:Data[]
    }
}
const TypeSchema = z.object({ value: z.string(), label: z.string() })

const FormSchema = z.object({
    name: z.string().min(2, { message: "Username must be at least 2 characters."}),
    slug: z.string().min(2, { message: "Username must be at least 2 characters."}),
    origin_name: z.string().min(2, { message: "Username must be at least 2 characters."}),
    content: z.string().min(2, { message: "Username must be at least 2 characters."}),
    type: z.string().min(2, { message: "Username must be at least 2 characters."}),
    status: z.boolean(),
    poster_url: z.string().min(2, { message: "Username must be at least 2 characters."}),
    thumb_url: z.string().min(2, { message: "Username must be at least 2 characters."}),
    time: z.string().min(2, { message: "Username must be at least 2 characters."}),
    episode_current: z.string().min(2, { message: "Username must be at least 2 characters."}),
    episode_total: z.string().min(2, { message: "Username must be at least 2 characters."}),
    quality: z.string().min(2, { message: "Username must be at least 2 characters."}),
    lang: z.string().min(2, { message: "Username must be at least 2 characters."}),
    year: z.string().min(2, { message: "Username must be at least 2 characters."}),
    category: z.array(TypeSchema).min(1, { message: "Username must be at least 2 characters."}),
    country: z.array(TypeSchema).min(1, { message: "Country must be at least 2 characters."}),
    actor: z.array(TypeSchema).min(1, { message: "Actor must be at least 2 characters."}),
    director: z.array(TypeSchema).min(1, { message: "Director must be at least 2 characters."}),
})

export default function FormCreateMovie({ data } : Props) {
    const create = useTranslations('create');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "", slug: "", origin_name: "", content: "", type: "series", status: false,
            poster_url: "", thumb_url: "", time: "", episode_current: "", episode_total: "",
            quality: "HD", lang: "Vietsub", year: "2024", category: [], country: [], actor: [], director: []
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }
    
    return (
        <div className='px-[16px] xl:px-[40px] 3xl:px-[60px] rounded-md'>
            <h1 className='text-[16px] xl:text-[20px] 3xl:text-[30px] my-4 font-bold text-center text-white'>MOVIE</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <div className="grid gap-2 md:grid-cols-2 mb-4">
                        <FormField control={form.control} name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data?.years?.map(year => (
                                                <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}