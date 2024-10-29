import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

const EyeIcon = ({ className } : React.HTMLAttributes<HTMLElement>) => (
  <Eye className={cn("w-[20px] md:w-[25px]", className)}/>
)
EyeIcon.displayName = "EyeIcon"

const EyeOffIcon = ({ className } : React.HTMLAttributes<HTMLElement>) => (
  <EyeOff className={cn("w-[20px] md:w-[25px]", className)}/>
)
EyeOffIcon.displayName = "EyeOffIcon"

export {
  EyeIcon,
  EyeOffIcon
}