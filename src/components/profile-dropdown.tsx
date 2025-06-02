"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, CreditCard, HelpCircle, LogOut } from "lucide-react"
import {useAuth} from "@/hooks/useAuth";
import {toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogout , setLogout] = useState(false);
  const router = useRouter();

  const {user , logout} = useAuth();

  const handleLogout = async()=>{
    setLogout(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');

    }finally{
      setLogout(false);
    }
  }


  return (
     
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} >
      <div className="z-10">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-medium">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <span className="hidden md:inline">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{user?.name}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 cursor-pointer" disabled={isLogout} onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLogout ? 'Logging out...':'Log out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </div>
    </DropdownMenu>

  )
}
