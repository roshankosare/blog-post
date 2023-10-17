"use client";

import ErrorBox from "@/components/ErrorBox";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postBlog } from "@/lib/posts";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface NewBlogProps {}

const NewBlog: React.FC<NewBlogProps> = ({}) => {
  const session = useSession();

  const [title, setTitle] = useState<string>("");
  const [markdownBody, setMarkdownBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [blogImages, setBlogImages] = useState<File[]>([]);

  const onSubmit = async () => {
    setError(null);
    if (title === "" || markdownBody === "") {
      setError(" plese fill the all required fields");
      return;
    }
    try {
      await postBlog({ title, markdown: markdownBody, coverImage: coverImage ,blogImages:blogImages});
      setSuccess(true);
      setTitle("");
      setMarkdownBody("");
    } catch (error) {
      setError("can not create blog");
    }
  };

  if (!session.data?.user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 px-10 py-5">
      <h1 className="w-full text-center text-3xl font-bold">Create new Blog</h1>
      {error && <ErrorBox>{error}</ErrorBox>}
      {success && (
        <div className="w-full text-lg font-bold text-center text-gray-600">
          Your Blog has been published succefully.{" "}
          <Link className="text-blue-500" href="/">
            Click here{" "}
          </Link>
          for Home page
        </div>
      )}

      <div className="w-full felx flex-col gap-y-2">
        <Label>Title</Label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          className="w-full my-2"
          placeholder="Title for your blog.."
          value={title}
        />
      </div>
      <div className="flex flex-row w-full gap-x-5">
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

      <MarkdownEditor
        setFiles={(file: File) => setBlogImages((pre) => [...pre, file])}
        markdownValue={markdownBody}
        setMarkdownValue={(value: string) => setMarkdownBody(value)}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        variant={"default"}
        size={"default"}
        className="w-20"
      >
        Create
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
        ref={imageInputRef}
      />
    </div>
  );
};

export default NewBlog;
