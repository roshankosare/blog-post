import { useRef, useState } from "react";

const useMarkdown = ({
  markdownValue,
  setMarkdownValue,
}: {
  markdownValue: string;
  setMarkdownValue: (value: string) => void;
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

  const showPreviewTab = () => {
    if (!preview) {
      setPreview(true);
      setShowEditor(false);
      setShowUploadedImages(false);
      return;
    }
    setPreview(false);
    setShowEditor(true);
    setShowUploadedImages(false);
  };

  const showUplaodedImagesTab = () => {
    if (showUploadedImages) {
      setPreview(false);
      setShowUploadedImages(true);
      setShowEditor(false);
      return;
    }
    setPreview(false);
    setShowUploadedImages(false);
    setShowEditor(true);
  };

  return {
    preview,
    showEditor,
    showUploadedImages,
    showUplaodedImagesTab,
    showPreviewTab,
    setMarkdownTextSnippits,
    markDownTextAreaRef,
  };
};

export default useMarkdown;
