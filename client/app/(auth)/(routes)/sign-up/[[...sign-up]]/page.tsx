// import { SignUp } from "@clerk/nextjs";

// import React from "react";

// const SignInPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen">
//       <SignUp />
//     </div>
//   );
// };

// export default SignInPage;
'use client'
import { Signup } from "@/components/auth/signup";
const SignInPage = () => {

  return (
    <Signup/>
  );
};

export default SignInPage;
