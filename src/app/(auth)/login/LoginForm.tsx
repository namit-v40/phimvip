"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/api/auth";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CustomPending from "../../../components/loading/CustomPending";
import { useAppContext } from "@/components/app-provider";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icon/EyeIcon";

export default function LoginForm() {
    const loginTrans = useTranslations('login');
    const { currentLocale } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const { setUser } = useAppContext();
    const { toast } = useToast();
    const router = useRouter();

    const formSchema = z.object({
        user_name: z.string().min(2, { message: loginTrans('error_message.user_name') }),
        password: z.string().min(2, { message: loginTrans('error_message.password') }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { user_name: "", password: "" }
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (loading) return
        setLoading(true)
        try {
            const result = await authApiRequest.login({...values, lang: currentLocale})

            await authApiRequest.auth({
                sessionToken: result?.payload?.data?.accessToken,
                expiresAt: result?.payload?.data?.expiresAt,
                user: result?.payload?.data?.account?.user_name,
                isAdmin: result?.payload?.data.isAdmin
            })
            setUser(result?.payload?.data?.account)
            if(result?.payload?.data?.isAdmin){
                router.push('/admin');
                router.refresh();
            }else{
                router.push('/');
                router.refresh();
            }
            toast({ title: loginTrans('title'), description: result?.payload?.message, variant:'success' })
        } catch (error: any) {
            handleErrorApi({ title: loginTrans('error_message.title'), error, setError: form.setError })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] flex-shrink-0 w-full">
                <FormField control={form.control} name="user_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{loginTrans('user_name')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{loginTrans('password')}</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} type={`${isVisible?'text':'password'}`}/>
                                    <div onClick={()=>{setIsVisible(!isVisible)}} className="absolute right-[10px] top-[7px] cursor-pointer">
                                        {isVisible?<EyeIcon />:<EyeOffIcon />}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="!mt-8 w-full">{loading?<CustomPending />:loginTrans('button')}</Button>
            </form>
        </Form>
    )
}