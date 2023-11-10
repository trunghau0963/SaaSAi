import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

interface UserMessageProps {
  children: React.ReactNode;
}

const UserMessage: React.FC<UserMessageProps> = ({ children }) => {
  const { user } = useUser();
  return (
    <div className="border p-4 pb-10 rounded-lg mr-20 relative">
      {children}
      <div className="bg-secondary w-14 h-14 rounded-lg flex justify-center items-center absolute-bottom left-6">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          {/* <AvatarFallback></AvatarFallback> */}
        </Avatar>
      </div>
    </div>
  );
};

export default UserMessage;
