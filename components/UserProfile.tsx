import { type UserProfile } from "@prisma/client";
import Card from "./ui/Card";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
interface UserProfileProps {
  profile: Pick<UserProfile, "avatar" | "email" | "username">;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <Card className="w-full flex flex-row sm:h-48 h-32  border-none sm:gap-x-5 gap-x-2 ">
      <div className="sm:w-32 sm:h-32 w-16 h-16 px-1 py-1">
        <Image
          src={profile.avatar || "/avatar.png"}
          width={300}
          height={400}
          alt="profile"
          className="w-full h-full rounded-full"
        ></Image>
      </div>
      <div className="flex flex-col  gap-y-2 w-3/4   px-2 sm:px-5 py-1 sm:py-2">
        <p className="w-full text-start  font-bold font-gray-600 text-lg sm:text-2xl">
          {profile.username}
        </p>

        <p className="w-full text-start font-bol font-gray-600 tex-md sm:text-xl">
          {profile.email}
        </p>
      </div>
    </Card>
  );
};

export const UserProfileSkeleton = ()=>{
    return(
        <Card className="w-full flex flex-row sm:h-48 h-32  border-none sm:gap-x-5 gap-x-2 ">
            <div className="sm:w-32 sm:h-32 w-16 h-16 px-1 py-1">
                <Skeleton   className="w-full h-full rounded-full"/>
            </div>
            <div className="flex flex-col  gap-y-2 w-3/4   px-2 sm:px-5 py-1 sm:py-2">
                <Skeleton className="w-40 h-6  sm:h-10"/>
                <Skeleton className="w-40 h-6 sm:h-10"/>
                </div>
            </Card>
    )
}

export default UserProfile
