"use client";

import MarkdownEditor from "@/components/markdown/MarkdownEditor";

import { Skeleton } from "@/components/ui/skeleton";

import { useState } from "react";

import { UploadImagePreview } from "@/components/UploadImagePreview";
import TagSearchList from "@/components/TagSearchList";
import SearchTag, { SearchTagSkeleton } from "@/components/SearchTag";
import SelectedTags, { SelectedTagsSkeleton } from "@/components/SelectedTags";
import useTags from "@/app/hooks/useTags";
import useBlogEdit from "@/app/hooks/useBlogEdit";
import useBlog from "@/app/hooks/useBlog";
import { notFound } from "next/navigation";
import EditTitle, { EditBlogTitleSkeleton } from "@/components/EditTitle";
import UpdateBlogButtons from "@/components/UpdateBlogButtons";
import { updateBlog } from "@/lib/posts";

const WriteBlog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [error, setError] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const [publishDisabled, setPublishedDisabled] = useState<boolean>(false);

  const {
    setBlogImageToUpload,
    setShowUploadPreviewModel,
    showUploadPreviewModel,
    uploadBlogImage,
    blogImageToUpload,
    saveBlog,
    setEditedMarkdown,
    setTitleEditValue,
    titleEditValue,
    publishBlog,
    editedMarkdown,
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
      {loading === true ||
      isNotFound === null ||
      (blog === null && isNotFound === false) ? (
        <BlogLoadignSkeleton />
      ) : !isNotFound && blog ? (
        <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 sm:px-10  sm:py-10 px-2 py-2 mb-10">
          <EditTitle
            title={titleEditValue ? titleEditValue : blog.title}
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

          <MarkdownEditor
            images={blogImages}
            setBlogImage={(image: File) => setBlogImageToUpload(image)}
            uploadBlogImage={uploadBlogImage}
            setMarkdownValue={(value: string) => setEditedMarkdown(value)}
            markdownValue={
              editedMarkdown ? editedMarkdown : blog.markdownString
            }
          />
          <UpdateBlogButtons
            publishDisabled={publishDisabled}
            saveDisabled={saveDisabled}
            onSave={async () => {
              setSaveDisabled(true);
              await saveBlog({ tags: userSelectedTags });
              setSaveDisabled(false);
            }}
            onPublish={async () => {
              setPublishedDisabled(true);
              await publishBlog();
              setPublishedDisabled(false);
            }}
            published={blog.published}
          ></UpdateBlogButtons>

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
        notFound()
      )}
    </>
  );
};

const BlogLoadignSkeleton = () => {
  return (
    <div className="w-full sm:max-w-5xl h-auto mx-auto  bg-white  flex flex-col gap-y-5 sm:px-10  sm:py-10 px-2 py-2 mb-10">
      <EditBlogTitleSkeleton />
      <SelectedTagsSkeleton />
      <SearchTagSkeleton />
      <Skeleton className="w-full  min-h-[700px]" />
    </div>
  );
};

export default WriteBlog;
