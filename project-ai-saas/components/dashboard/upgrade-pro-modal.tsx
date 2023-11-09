'use client'
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubcriptionButton from "../subcription-button";
import { useProStore } from "@/store/pro-store";

interface UpgradeProModalProps {
  isProPlan?: boolean;
}

const UpgradeProModal: React.FC<UpgradeProModalProps> = ({isProPlan}) => {
  const {isOpen, handleCloseProModal} = useProStore();
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent 
        onClose={handleCloseProModal}
        showOverlay
        >
          <SubcriptionButton isPro={isProPlan}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpgradeProModal;
