import {
  PencilLineIcon,
  UploadIcon,
  Trash2Icon,
  ChevronDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {ReactNode} from "react";

interface BaseDropdownProps {
  triggerText: string
  children: ReactNode,
  buttonClassnames?: string
  contentClassnames?: string
}

export default function BaseDropdown({
  triggerText,
  buttonClassnames,
  contentClassnames,
  children
}: BaseDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn(buttonClassnames)}>
          {triggerText} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cn(contentClassnames)}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
