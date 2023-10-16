import Image from "next/image";

interface AvatarProps {
    width:number,
    hight:number
}

const Avatar: React.FC<AvatarProps> = ({width,hight}) => {
  return (
    <Image
      src={"/avatar.png"}
      width={width}
      height={hight}
      alt="DP"
      className="rounded-full border-gray-500 border p-1"
    />
  );
};

export default Avatar;
