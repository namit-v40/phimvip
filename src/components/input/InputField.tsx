import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { UseFormReturn } from 'react-hook-form';

type Form = UseFormReturn<{
  field: string;
}, any, undefined>

export default function InputField({form, label ,name}: {form:Form; label:string; name:string}) {
  return (
    <FormField control={form.control} name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...field}/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}