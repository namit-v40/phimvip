'use client';

import authApiRequest from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { handleErrorApi } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomPending from '../../../components/loading/CustomPending';
import { z } from 'zod';
import { useAppContext } from '@/components/app-provider';
import { EyeIcon, EyeOffIcon } from '@/components/icon/EyeIcon';

export default function RegisterForm() {
  const registerTrans = useTranslations('register');
  const { currentLocale } = useAppContext();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const registerBody = z
  .object({
    name: z.string().trim().min(2, { message: registerTrans('error_message.name') }).max(256),
    user_name: z.string().trim().min(2, { message: registerTrans('error_message.user_name') }).max(100),
    password: z.string().min(6, { message: registerTrans('error_message.password') }).max(100),
    confirmPassword: z.string().min(6, { message: registerTrans('error_message.password') }).max(100)
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: registerTrans('error_message.password_not_match'),
        path: ['confirmPassword']
      })
    }
  })

  const form = useForm<z.infer<typeof registerBody>>({
    resolver: zodResolver(registerBody),
    defaultValues: {
        name: '',
        user_name: '',
        password: '',
        confirmPassword: ''
    }
  })

  
  async function onSubmit(values: z.infer<typeof registerBody>) {
    if (loading) return
    setLoading(true)
    try {
      const result = await authApiRequest.register({...values, lang: currentLocale})

      toast({ title: registerTrans('title'), description: result?.payload?.message, variant:'success' })

      router.push('/login')
    } catch (error: any) {
      handleErrorApi({ title: registerTrans('error_message.title'), error, setError: form.setError })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 max-w-[600px] flex-shrink-0 w-full' noValidate>
        <FormField control={form.control} name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{registerTrans('name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name='user_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{registerTrans('user_name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{registerTrans('password')}</FormLabel>
              <FormControl>
                <div className="relative">
                    <Input {...field} type={`${isPassVisible?'text':'password'}`}/>
                    <div onClick={()=>{setIsPassVisible(!isPassVisible)}} className="absolute right-[10px] top-[7px] cursor-pointer">
                        {isPassVisible?<EyeIcon />:<EyeOffIcon />}
                    </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{registerTrans('confirm_password')}</FormLabel>
              <FormControl>
              <div className="relative">
                  <Input {...field} type={`${isConfirmPassVisible?'text':'password'}`}/>
                  <div onClick={()=>{setIsConfirmPassVisible(!isConfirmPassVisible)}} className="absolute right-[10px] top-[7px] cursor-pointer">
                      {isConfirmPassVisible?<EyeIcon />:<EyeOffIcon />}
                  </div>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='!mt-8 w-full'> {loading?<CustomPending/>:registerTrans('button')} </Button>
      </form>
    </Form>
  )
}