import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ErrorBox: React.FC<ErrorProps> = ({ className, children, ...props }) => {
  return (
    <div
    {...props}
      className={cn(
        className,
        "w-full px-2 py-2 bg-red-200 border text-red-600 border-red-500 text-sm rounded-md"
      )}
    >
      {children}
    </div>
  );
};
export default ErrorBox;
