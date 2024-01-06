import React from "react";
import { TOOLS } from "@/constant";
import ToolItems from "./tool-items";

interface ToolNavigation {
  title?: string;
}

const ToolNavigation: React.FC<ToolNavigation> = ({
  title = "Chat with the smartest AI",
}) => {
  return (
    <div className="flex flex-col w-full items-center relative grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 lg:px-4 lg:pt-0 lg:pb-6">
      <div className="text-center mb-14">
      <h1 className="fontweight-bold">Chat GPT 5.0</h1>
        <h3 className="text-muted-foreground text-lg mt-2">{title}</h3>
      </div>
      <div className="w-full max-w-[30.75rem] mx-auto">
        {TOOLS.map((tool, index) => (
          <ToolItems key={index} {...tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolNavigation;
