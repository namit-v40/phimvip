import { toast } from "@/hooks/use-toast"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { UseFormSetError } from "react-hook-form"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  title,
  error,
  setError,
  duration
}: {
  title: string,
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    setError(error?.payload?.field, {
      type: 'server',
      message: error?.payload?.message
    })
  } else {
    toast({
      title: title,
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}