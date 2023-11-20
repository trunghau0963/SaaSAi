"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { toggleOpenOrClose } from "./sidebar/sidebarSlice";

const Topbar = () => {
  // const { handleOpenOrClose } = useSidebarStore();
  const dispatch: AppDispatch = useDispatch();
  const handleOpenOrClose = () => {
    dispatch(toggleOpenOrClose());
  };
  return (
    <div
      className={cn(
        "flex items-center p-4 justify-between sticky top-0 z-30",
        "lg:hidden"
      )}
    >
      <Logo />
      <Button variant="ghost" size="icon" onClick={handleOpenOrClose}>
        <Menu />
      </Button>
    </div>
  );
};

export default Topbar;
