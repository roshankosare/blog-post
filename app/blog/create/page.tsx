"use client";

import ErrorBox from "@/components/ErrorBox";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postBlog } from "@/lib/posts";
import { useRef, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";

interface NewBlogProps {}

const NewBlog: React.FC<NewBlogProps> = ({}) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async () => {
    setError(null);
    if (title === "") {
      setError(" plese fill the all required fields");
      return;
    }
    try {
      const res = await postBlog({
        title,
        coverImage: coverImage,
      });
      const blogId = res?.id;
      router.push(`/blog/write/${blogId}`);
    } catch (error) {
      setError("can not create blog");
    }
  };

  return (
    <Card className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col px-4 gap-y-5 sm:px-10 sm:py-10 border-none sm:border-solid">
      <h1 className="w-full text-center text-3xl font-bold">Create new Blog</h1>
      {error && <ErrorBox>{error}</ErrorBox>}

      <div className="w-full felx flex-col gap-y-2">
        <Label>Title</Label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          className="w-full my-2"
          placeholder="Title for your blog.."
          value={title}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-y-4 w-full sm:gap-x-5">
        <Label className="my-auto"> Select cover image</Label>
        <Button
          variant={"default"}
          size={"sm"}
          onClick={() => imageInputRef.current?.click()}
        >
          Chose
        </Button>
        <p className="text-sm text-gray-600 my-auto">
          *if you do not provide cover image default will be choosen
        </p>
      </div>
      {coverImage ? (
        <div className="w-full h-52">
          <Image
            className="w-auto h-full"
            src={URL.createObjectURL(coverImage)}
            alt="cover image"
            width={100}
            height={100}
          />
        </div>
      ) : null}

      <Button
        onClick={async (e) => {
          e.preventDefault();
          setLoading(true);

          await onSubmit();
          setLoading(false);
        }}
        disabled={loading}
        variant={"default"}
        size={"default"}
        className="sm:w-40 w-full"
      >
        {loading ? <Loader message="Plase wait" /> : "Next"}
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
        ref={imageInputRef}
      />
    </Card>
  );
};

export default NewBlog;
