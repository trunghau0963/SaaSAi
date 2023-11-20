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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { toggleOpenOrClose, closeProModel } from "../getPro/getProSlice";
interface UpgradeProModalProps {
  isProPlan?: boolean;
}

const UpgradeProModal: React.FC<UpgradeProModalProps> = ({isProPlan}) => {
  // const {isOpen, handleCloseProModal} = useProStore();
  const dispatch: AppDispatch = useDispatch()
  const { value} = useSelector((state: RootState) => state.sidebar);
  const handleCloseProModal = () => {
    dispatch(toggleOpenOrClose());
  };
  return (
    <div>
      <Dialog open={value.isOpen}>
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
