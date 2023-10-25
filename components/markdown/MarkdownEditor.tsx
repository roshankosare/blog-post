"use client";

import { useRef, useState } from "react";
import Card from "../ui/Card";
import MarkdownNavBar from "./MarkdownNavBar";
import MarkdownPreview from "./MarkdownPreview";
import UploadedImages from "./UploadedImages";

interface MarkdownProps {
  markdownValue: string;
  setMarkdownValue: (value: string) => void;
  setBlogImage: (image: File) => void;
  uploadBlogImage: () => Promise<string>;
  images:string[]
}
const MarkdownEditor: React.FC<MarkdownProps> = ({
  markdownValue,
  setMarkdownValue,
  setBlogImage,
  uploadBlogImage,
  images
}) => {
  const [preview, setPreview] = useState<boolean>(false);
  const [showUploadedImages, setShowUploadedImages] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(true);

  const markDownTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const setMarkdownTextSnippits = (value: string) => {
    const textarea = markDownTextAreaRef.current;
    if (!textarea) return;
    const cursorPosition = textarea?.selectionStart;
    const currentText = markdownValue;
    const newText =
      currentText.substring(0, cursorPosition) +
      value +
      currentText.substring(cursorPosition);

    setMarkdownValue(newText);

    // textarea.selectionStart = cursorPosition + value.length;
    // textarea.selectionEnd = cursorPosition + value.length;
    // console.log(textarea.selectionStart,textarea.selectionEnd)

    // textarea.focus(); 
    return;
  };
  return (
    <Card className="w-full min-h-screen  flex flex-col px-2 py-2 rounded-sm">
      <MarkdownNavBar
        setMarkDownText={(value: string) => setMarkdownTextSnippits(value)}
        setBlogImage={setBlogImage}
        uploadBlogImage={uploadBlogImage}
        setPreview={() => {
          setPreview((pre) => !pre);
          setShowEditor((pre) => !pre);
        }}
        showImageUpload={() => {
          setShowUploadedImages((pre) => !pre);
          setShowEditor((pre) => !pre);
        }}
        preview={preview}
      />
      <div className="w-full h-full flex flex-col">
        {showEditor ? (
          <textarea
            onChange={(e) => setMarkdownValue(e.target.value)}
            value={markdownValue}
            name=""
            id=""
            className="w-full min-h-screen outline-none px-2 py-2 overflow-y-scroll no-scrollbar"
            ref={markDownTextAreaRef}
          ></textarea>
        ) : null}
        {preview ? <MarkdownPreview markdown={markdownValue} /> : null}
        {showUploadedImages ? (
          <UploadedImages
            onImageDelete={() => {}}
            images={images}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default MarkdownEditor;
