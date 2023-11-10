import { cn } from '@/lib/utils'
import { Aperture } from 'lucide-react'
import { Poppins } from 'next/font/google'
import React from 'react'
interface LogoProps {
    className? : string
}
const fontPoppins = Poppins({weight: "700", subsets: ["latin"]}) 
const Logo: React.FC<LogoProps> = ({className}) => {
  return (
    <div className={cn(
        "flex items-center",
        className
    )}> 
        <Aperture color='#1faf76' size={40}/>
        <span className={cn(
            "ml-2 font-bold text-3xl",
            fontPoppins.className
        )}>
            ChatGPT
        </span>
    </div>
  )
}

export default Logo