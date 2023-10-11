import { parse } from "marked";

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  const parsedMarkdown = parse(markdown);
  return (
    <div
      className="w-full h-full px-2 py-5 prose  overflow-y-scroll no-scrollbar"
      dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
    ></div>
  );
};

export default MarkdownPreview;
