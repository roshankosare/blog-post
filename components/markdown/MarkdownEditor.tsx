"use client";
import Card from "../ui/Card";
import MarkdownNavBar from "./MarkdownNavBar";
import MarkdownPreview from "./MarkdownPreview";
import UploadedImages from "./UploadedImages";
import useMarkdown from "./hooks/useMarkdown";

interface MarkdownProps {
  markdownValue: string;
  setMarkdownValue: (value: string) => void;
  setBlogImage: (image: File) => void;
  onDeleteImage: (id: string) => void;
  images: string[];
}
const MarkdownEditor: React.FC<MarkdownProps> = ({
  markdownValue,
  setMarkdownValue,
  setBlogImage,
  images,
  onDeleteImage,
}) => {
  const {
    preview,
    showEditor,
    showPreviewTab,
    showUplaodedImagesTab,
    showUploadedImages,
    setMarkdownTextSnippits,
    markDownTextAreaRef,
  } = useMarkdown({ markdownValue, setMarkdownValue });

  return (
    <Card className="w-full  min-h-[700px]   flex flex-col rounded-sm border-none p-0">
      <MarkdownNavBar
        setMarkDownText={(value: string) => setMarkdownTextSnippits(value)}
        setBlogImage={setBlogImage}
        setPreview={() => showPreviewTab()}
        showImageUpload={() => showUplaodedImagesTab()}
        preview={preview}
      />
      <div className="w-full h-full flex flex-col">
        {showEditor ? (
          <textarea
            onChange={(e) => setMarkdownValue(e.target.value)}
            value={markdownValue}
            name=""
            id=""
            className="w-full bg-gray-50 h-[600px] sm:h-[700px] outline-none px-2 py-2 overflow-y-scroll no-scrollbar"
            ref={markDownTextAreaRef}
          ></textarea>
        ) : null}
        {preview ? <MarkdownPreview markdown={markdownValue} /> : null}
        {showUploadedImages ? (
          <UploadedImages
            onImageDelete={(id: string) => {
              onDeleteImage(id);
            }}
            images={images}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default MarkdownEditor;
