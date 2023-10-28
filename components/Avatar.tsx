import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  hight: number;
  src:string
}

const Avatar: React.FC<AvatarProps> = ({
  width,
  hight,
  className,
  src,
  ...props
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={hight}
      alt="DP"
      className={cn(
        "rounded-lg border-gray-300 border  bg-gray-100",
        className
      )}
    />
  );
};

export default Avatar;
