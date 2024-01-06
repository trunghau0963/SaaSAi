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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import Sidebar from ".";

interface MobileSidebarProps {
  userLimitCount: number;
  isProPlan?: boolean;
}
const MobileSidebar: React.FC<MobileSidebarProps> = ({
  userLimitCount,
  isProPlan,
}) => {
  // const { isOpen } = useSidebarStore();
  const dispatch: AppDispatch = useDispatch()
  const { value} = useSelector((state: RootState) => state.sidebar);
  return (
    <div>
      <Sheet open={value.isOpen}>
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
