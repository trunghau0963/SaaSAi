// import { SignIn } from "@clerk/nextjs";

// import React from "react";

// const SignInPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen">
//       <SignIn />
//     </div>
//   );
// };

// export default SignInPage;
'use client'
import { Login } from "@/components/auth/login";
const SignInPage = () => {
  return (
    <Login/>
  );
};

export default SignInPage;
