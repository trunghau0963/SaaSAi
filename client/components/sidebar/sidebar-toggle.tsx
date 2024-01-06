import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { Button } from "../ui/button";
import React from "react";
import { toggleOpenOrClose, changeSidebar} from './sidebarSlice'

const SidebarToggle = () => {
  // const { isMinimal, handleChangeSidebar, handleOpenOrClose } =
  //   useSidebarStore();
  const dispatch: AppDispatch = useDispatch()
  const { value} = useSelector((state: RootState) => state.sidebar);

  const handleOpenOrClose = () => {
    dispatch(toggleOpenOrClose());
  };
  const handleChangeSidebar = () => {
    dispatch(changeSidebar());
  };
  return (
    <div>
      <div
        className={cn("cursor-pointer hidden", "lg:block")}
        onClick={handleChangeSidebar}
        //[&:has([is-navbar-minimal])] trong layout cua dashboard
        is-navbar-minimal={value.isMinimal ? "true" : undefined}
      >
        <Image
          src={`/icons/menu-${value.isMinimal ? "open" : "close"}.svg`}
          width={24}
          height={24}
          alt="navbar-icon"
        />
      </div>
      <Button variant="ghost" className="lg:hidden" size="icon" onClick={handleOpenOrClose}/>
    </div>
  );
};

export default SidebarToggle;
