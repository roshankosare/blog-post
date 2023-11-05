"use client";

import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useState } from "react";

import Loader from "@/components/Loader";
import { UploadImagePreview } from "@/components/UploadImagePreview";
import TagSearchList from "@/components/TagSearchList";
import SearchTag from "@/components/SearchTag";
import SelectedTags from "@/components/SelectedTags";
import useTags from "@/app/hooks/useTags";
import useBlogEdit from "@/app/hooks/useBlogEdit";
import useBlog from "@/app/hooks/useBlog";
import { notFound } from "next/navigation";
import EditTitle from "@/components/EditTitle";
const WriteBlog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [error, setError] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);

  const {
    setBlogImageToUpload,
    setShowUploadPreviewModel,
    showUploadPreviewModel,
    uploadBlogImage,
    blogImageToUpload,
    saveBlog,
    setEditedMarkdown,
    setTitleEditValue,
  } = useBlogEdit(params.id);

  const {
    searchInputTag,
    queryResponseTags,
    userSelectedTags,
    setSearchInputTag,
    insertTagInUserSeletedTags,
    deleteTagInUserSeletedTag,
  } = useTags();
  const { blog, blogImages, blogTags, loading, isNotFound } = useBlog(
    params.id
  );
  return (
    <>
      {loading === true ? (
        <div>Loading</div>
      ) : blog ? (
        <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 sm:px-10  sm:py-10 px-2 py-2 mb-10">
          <EditTitle
            title={blog.title}
            setTitle={(value: string) => setTitleEditValue(value)}
          />
          <SelectedTags
            tags={[...blogTags, ...userSelectedTags]}
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
                setMarkdownValue={(value: string) => setEditedMarkdown(value)}
                markdownValue={blog.markdownString}
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
                  {saveDisabled ? (
                    <Loader message="Please wait"></Loader>
                  ) : (
                    "Save"
                  )}
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
      ) : (
        <div>Not Found</div>
      )}
    </>
  );
};

export default WriteBlog;
