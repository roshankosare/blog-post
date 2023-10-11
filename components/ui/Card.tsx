import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "broder border-gray-500 shadow-sm rounded-sm bg-white p-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
