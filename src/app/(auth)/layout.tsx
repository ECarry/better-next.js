import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen size-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
