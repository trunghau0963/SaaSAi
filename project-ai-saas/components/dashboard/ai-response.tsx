import React from "react";
import { Aperture } from 'lucide-react'

interface AiResponseProps {
  children: React.ReactNode;
}
const AiResponse: React.FC<AiResponseProps> = ({ children }) => {
  return (
    <div>
      {children}
      <div className="bg-sky-500 w-14 h-14 rounded-lg flex justify-center items-center absolute-bottom-6 right-6">
        <Aperture color="white" size={40} />
      </div>
    </div>
  );
};

export default AiResponse;
