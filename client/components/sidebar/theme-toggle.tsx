"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { THEME_MODES } from "@/constant";
import { cn } from "@/lib/utils";
// import { useSidebarStore } from "@/store/sidebar-store";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { value} = useSelector((state: RootState) => state.sidebar);

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "p-2 rounded-lg flex items-center bg-gray-9 first-letter:00 w-full cursor-pointer",
        value.isMinimal && "w-14 h-14 justify-center",
        // theme === "dark" ? "dark-mode" : ''
      )}
    >
      {value.isMinimal ? (
        <span>{theme === "dark" ? <Moon /> : <Sun />}</span>
      ) : (
        THEME_MODES.map(({ label, value }) => (
          <span
            key={value}
            className={cn(
              "flex items-center p-2 rounded-lg px-7 w-full justify-center cursor-pointer text-muted-foreground font-medium",
              theme === value && "bg-gray-800 shadow text-white"
            )}
          >
            {value === "dark" ? <Moon /> : <Sun />}
            <span className="ml-2">{label}</span>
          </span>
        ))
      )}
    </div>
  );
};

export default ThemeToggle;
