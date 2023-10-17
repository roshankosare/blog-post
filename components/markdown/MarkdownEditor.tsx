"use client";

import { useRef, useState } from "react";
import Card from "../ui/Card";
import MarkdownNavBar from "./MarkdownNavBar";
import MarkdownPreview from "./MarkdownPreview";

interface MarkdownProps {
  setFiles:(file:File)=>void,
  markdownValue: string;
  setMarkdownValue: (value: string) => void;
}
const MarkdownEditor: React.FC<MarkdownProps> = ({
  setFiles,
  markdownValue,
  setMarkdownValue,
}) => {
  const [preview, setPreview] = useState<boolean>(false);

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
      setFiles={setFiles}
        setMarkDownText={(value: string) => setMarkdownTextSnippits(value)}
        setPreview={() => setPreview((pre) => !pre)}
        preview={preview}
      />
      <div className="w-full h-full flex flex-col">
        {!preview ? (
          <textarea
            onChange={(e) => setMarkdownValue(e.target.value)}
            value={markdownValue}
            name=""
            id=""
            className="w-full min-h-screen outline-none px-2 py-2 overflow-y-scroll no-scrollbar"
            ref={markDownTextAreaRef}
          ></textarea>
        ) : (
          <MarkdownPreview markdown={markdownValue} />
        )}
      </div>
    </Card>
  );
};

export default MarkdownEditor;
