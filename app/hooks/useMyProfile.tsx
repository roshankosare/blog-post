import { type Blog, type UserProfile } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


const useMyProfile = ()=>{
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [blogs, setBlogs] = useState<Blog[] | null>(null);
    const [showDeletePost, setShowDeletePost] = useState<boolean>(false);
    const [seletedPost, setSeletedPost] = useState<string | null>(null);
    const [triggerRender, setTriggerRender] = useState<boolean>(false);
  
    const session = useSession();
  
    const onDeletePost = async () => {
        if (seletedPost) {
          try {
            await axios.delete(`/api/blog/${seletedPost}`);
            setTriggerRender((pre) => !pre);
            setShowDeletePost(false);
          } catch (error) {
            console.log(error);
          }
        }
      };
    
      useEffect(() => {
        if (session.status === "unauthenticated") {
          redirect("/sign-in");
        }
    
        if (session.status === "authenticated") {
          axios
            .get("/api/user/private")
            .then((data) => setProfile(data.data))
            .catch((error) => {
              redirect("/");
            });
        }
      }, [session, setProfile, triggerRender]);
    
      useEffect(() => {
        if (profile) {
          axios
            .get("/api/blog", {
              params: {
                autherId: profile.id,
              },
            })
            .then((res) => setBlogs(res.data))
            .catch((error) => {
              console.log(error);
            });
        }
      }, [profile]);

    return {

        profile,
        blogs,
        showDeletePost,
        setSeletedPost,
        setShowDeletePost,
        onDeletePost
    }
}

export default useMyProfile;