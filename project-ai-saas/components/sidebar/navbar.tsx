"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { NAVIGATIONS } from "@/constant";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import {closeSidebar} from './sidebarSlice'


const Navigation = () => {
  // const { isMinimal, handleClose } = useSidebarStore();
  const dispatch: AppDispatch = useDispatch()
  const { value} = useSelector((state: RootState) => state.sidebar);

  const pathName = usePathname();

  const handleClose = () => {
    dispatch(closeSidebar());
  };
  return (
    <div className="px-4">
      {NAVIGATIONS.map(({ title, url, icon }, index) => (
        <div key={index} className="mb-2">
          <Link href={url} onClick={handleClose}>
            <div
              className={cn(
                "flex items-center py-1 rounded-lg px-5 opacity-50",
                "hover:opacity-100",
                value.isMinimal && "px-1",
                // dung pathname de kiem tra ng dung dang o
                // url nao de shadow len
                pathName.includes(url) &&
                  "transition-colors bg-gradient-to-l from-slate-700 to-slate-800 shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] opacity-100"
              )}
            >
              <div className="flex items-center p-2">
                <div>
                  <Image width={24} height={24} src={icon} alt={title} />
                </div>
                {!value.isMinimal && <span className="ml-4 text-sm">{title}</span>}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
