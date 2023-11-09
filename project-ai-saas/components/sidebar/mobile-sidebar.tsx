'use client'
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSidebarStore } from "@/store/sidebar-store";
import Sidebar from ".";

interface MobileSidebarProps {
  userLimitCount: number;
  isProPlan?: boolean;
}
const MobileSidebar: React.FC<MobileSidebarProps> = ({
  userLimitCount,
  isProPlan,
}) => {
  const { isOpen } = useSidebarStore();
  return (
    <div>
      <Sheet open={isOpen}>
        <SheetContent
          side="left"
          className="w-screen border-none bg-black p-0 pt-8"
        >
          <Sidebar isProPlan={isProPlan} userLimitCount={userLimitCount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
