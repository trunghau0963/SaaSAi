"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
// import axios, {isCancel, AxiosError} from 'axios';
import api from "@/lib/utils";
import { useToast } from "./ui/use-toast";

interface SubcriptionButtonProps {
  className?: string;
  isPro?: boolean;
}

const SubcriptionButton: React.FC<SubcriptionButtonProps> = ({
  className,
  isPro,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleSubcribe = async () => {
    // call api 
    try {
      setLoading(true);
      const {} = await api.get("/api/stripe");
    }
    catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong from stripe. Please try again",
      })
    }finally {
      setLoading(false);
      //neu kh su dung thi khi co loi no se setloading o catch va o try
    }

  };
  return (
    <div className={className}>
      <Button
        variant="outline"
        size="lg"
        disabled={loading}
        onClick={handleSubcribe}
        className = {cn(
            "text-white w-full font-semibold border-none gradient-btn",
            "hover:text-white"
        )}
      >
        <span>{isPro ? "Manage Subscription" : "Upgrade To Pro"}</span>
        <Sparkles />
      </Button>
    </div>
  );
};

export default SubcriptionButton;
