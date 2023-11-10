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
import BlogTags from "@/components/BlogTags";

const WriteBlog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [error, setError] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const [publishDisabled, setPublishedDisabled] = useState<boolean>(false);
  const { blog, loading, isNotFound, fetchBlog } = useBlog(params.id);

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
    deleteBlogImage,
    userSelectedTags,
    insertTagInUserSeletedTags,
    deleteTagInUserSeletedTag,
  } = useBlogEdit(params.id, fetchBlog);

  const {
    searchInputTag,
    queryResponseTags,

    setSearchInputTag,
  } = useTags();

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
          <BlogTags tags={[...blog.tags.map((tag) => tag.name)]} />
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

          <MarkdownEditor
            images={blog.images.map((image) => image.url)}
            setBlogImage={(image: File) => setBlogImageToUpload(image)}
            setMarkdownValue={(value: string) => setEditedMarkdown(value)}
            markdownValue={
              editedMarkdown ? editedMarkdown : blog.markdownString
            }
            onDeleteImage={deleteBlogImage}
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
