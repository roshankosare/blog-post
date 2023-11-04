"use client";

import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import { UploadImagePreview } from "@/components/UploadImagePreview";
import { Blog, Tag } from "@prisma/client";
import TagSearchList from "@/components/TagSearchList";
import SearchTag from "@/components/SearchTag";
import SelectedTags from "@/components/SelectedTags";
import useTags from "@/app/hooks/useTags";
import useBlogEdit from "@/app/hooks/useBlogEdit";
import { set } from "zod";

const WriteBlog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [error, setError] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const {
    blog,
    blogImages,
    setBlogImageToUpload,
    markdown,
    setMarkdown,
    setShowUploadPreviewModel,
    showUploadPreviewModel,
    title,
    setTitle,
    uploadBlogImage,
    blogImageToUpload,
    saveBlog,
  } = useBlogEdit(params.id);

  const {
    searchInputTag,
    queryResponseTags,
    userSelectedTags,
    blogTags,
    setSearchInputTag,
    setBlogTags,
    insertTagInUserSeletedTags,
    deleteTagInUserSeletedTag,
  } = useTags();

  const publishBlog = async () => {
    // setPublishedDisabled(true);
    // await updateBlog({ published: true }, params.id,[]);
    // toast({
    //   title: "Published",
    //   description: "Your Blog has been published successfully",
    // });
    // setTriggerBlogUpadate((pre) => !pre);
    // setPublishedDisabled(false);
  };
  const unpublishBlog = async () => {
    // setPublishedDisabled(true);
    // await updateBlog({ published: false }, params.id);
    // toast({
    //   title: "Published",
    //   description: "Your Blog has been unpublished successfully",
    // });
    // setTriggerBlogUpadate((pre) => !pre);
    // setPublishedDisabled(false);
  };

  return (
    <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 sm:px-10  sm:py-10 px-2 py-2 mb-10">
      <SelectedTags
        tags={userSelectedTags}
        deleteTag={deleteTagInUserSeletedTag}
      />

      <SearchTag
        tag={searchInputTag}
        setTags={() => insertTagInUserSeletedTags(searchInputTag)}
        onChangeTag={(tag: string) => setSearchInputTag(tag)}
      />

      <TagSearchList
        tags={queryResponseTags}
        setTags={insertTagInUserSeletedTags}
      />

      {blog && (
        <>
          <MarkdownEditor
            images={blogImages}
            setBlogImage={(image: File) => setBlogImageToUpload(image)}
            uploadBlogImage={uploadBlogImage}
            setMarkdownValue={(value: string) => setMarkdown(value)}
            markdownValue={markdown}
          />

          <div className="flex gap-x-5">
            <Button
              disabled={saveDisabled}
              onClick={async () => {
                setSaveDisabled(true);
                await saveBlog({ tags: userSelectedTags });
                setSaveDisabled(false);
              }}
              className="w-40"
            >
              {saveDisabled ? <Loader message="Please wait"></Loader> : "Save"}
             
            </Button>
          </div>
        </>
      )}

      {blogImageToUpload && (
        <UploadImagePreview
          onImageUpload={uploadBlogImage}
          onClose={() => setShowUploadPreviewModel(false)}
          open={showUploadPreviewModel}
          url={URL.createObjectURL(blogImageToUpload)}
        ></UploadImagePreview>
      )}
    </div>
  );
};

export default WriteBlog;
