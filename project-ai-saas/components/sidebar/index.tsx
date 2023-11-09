"use client";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import React from "react";
import Logo from "../logo";
import SidebarToggle from "./sidebar-toggle";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { MAX_FREE_COUNT } from "@/constant";
import { Progress } from "../ui/progress";
import SubcriptionButton from "../subcription-button";
import Navbar from "./navbar";
import ThemeToggle from "./theme-toggle";

interface SidebarProps {
  className?: string;
  isProPlan?: boolean; //de check xem user da dang ky goi pro chua
  userLimitCount: number; // user da su dung duoc bao nhiue lan goi
}
const Sidebar: React.FC<SidebarProps> = ({
  className,
  isProPlan,
  userLimitCount,
}) => {
  const { isMinimal } = useSidebarStore();
  const { user } = useUser();
  return (
    <div className={cn("text-white", className)}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        {/* scrollbar-none la custom trong global.css */}
        <Navbar />
      </div>
      <div
        className={cn(
          "fixed bottom-8 left-4 right-4",
          "lg:left-7 lg:right-auto",
          isMinimal && "lg:left-3"
        )}
      >
        <div className="mb-4 p-4 rounded-lg bg-gray-900">
          <div className="mb-4 flex items-center ">
            <UserButton afterSignOutUrl="/" />
            {/* hien thi ten user */}
            {!isMinimal && (
              <span className="text-sm ml-4">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            )}
          </div>
          {
            // hien thi so lan dung mien phi con lai
            !isMinimal && 
            <div className="border-t border-t-gray-950 pt-2">
                {
                    !isProPlan &&
                    <div className="mb-4">
                        <div className="text-center mb-2 text-muted-foreground font-semibold">
                            {userLimitCount}/{MAX_FREE_COUNT} free generate
                        </div>
                        {/* progress hien thi */}
                        <Progress
                        value={(userLimitCount/MAX_FREE_COUNT) * 100}
                        className="bg-gray-950 h-3"
                        // custom color
                        indicatorClassName="gradient-btn"
                        />
                    </div>
                }
                <SubcriptionButton isPro={isProPlan}/>
            </div>
          }
        </div>
        <ThemeToggle/>
      </div>
    </div>
  );
};

export default Sidebar;
