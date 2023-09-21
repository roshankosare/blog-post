import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className=" w-auto border border-gray-200 rounded-md  shadow-sm h-auto  fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white">
      <div className="mx-auto w-96 px-8 py-10 h-auto ">{children}</div>
    </div>
  );
};

export default AuthLayout;
