import {
  FaHeading,
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaLink,
} from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { Button } from "../ui/button";
import { nanoid } from "nanoid";
import Toggle from "../ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRef } from "react";

const md = {
  h1: "# Enter main heading here",
  h2: "## Enter secong heading here",
  h3: "### Enter third heading here",
  bold: "**Enter bold Text**",
  italic: "*Enter italic Text*",
  ol: "1.First item\n 2.Second item \n 3.Third item",
  ul: "*.First item\n *.Second item \n *.Third item",
  link: "[Text](link:https://google.com)",
  image:
    "![image-title](https://fleek-team-bucket.storage.fleek.co/thumbnails-blog/Next.png)",
};
type MarkdownNavBarProps = {
  setFiles: (file: File) => void;
  setMarkDownText: (value: string) => void;
  setPreview: () => void;
  preview: boolean;
};

const MarkdownNavBar: React.FC<MarkdownNavBarProps> = ({
  setFiles,
  setMarkDownText,
  setPreview,
  preview,
}) => {
  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-full h-12 flex  px-5 py-2 border border-gray-200 rounded-sm justify-between">
      <div className="flex gap-x-5">
        <Button
          variant={"outline"}
          size={"icon_sm"}
          onClick={() => setMarkDownText(md.h1)}
          disabled={preview}
        >
          <FaHeading />
        </Button>
        <Button
          variant={"outline"}
          size={"icon_sm"}
          onClick={() => setMarkDownText(md.bold)}
          disabled={preview}
        >
          <FaBold />
        </Button>
        <Button
          variant={"outline"}
          size={"icon_sm"}
          onClick={() => setMarkDownText(md.italic)}
          disabled={preview}
        >
          <FaItalic />
        </Button>

        <Button
          variant={"outline"}
          size={"icon_sm"}
          onClick={() => setMarkDownText(md.ol)}
          disabled={preview}
        >
          <FaListOl />
        </Button>
        <Button
          variant={"outline"}
          size={"icon_sm"}
          onClick={() => setMarkDownText(md.ul)}
          disabled={preview}
        >
          <FaListUl />
        </Button>
        <Button
          variant={"outline"}
          size={"icon_sm"}
          onClick={() => setMarkDownText(md.link)}
          disabled={preview}
        >
          <FaLink />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon_sm"} disabled={preview}>
              <BiImageAdd />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Add Image</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setMarkDownText(md.image)}>
                Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUploadImage()}>
                Upload
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Toggle enable={preview} label="Preview" onClick={() => setPreview()} />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const image = e.target.files?.[0];

          if (image) {
            const imageType = image?.name.split(".")[1];
            const imageId = nanoid();
            const imageWithId = new File([image], `${imageId}.${imageType}`);
            setFiles(imageWithId);
            const imageLocalUrl = URL.createObjectURL(imageWithId);
            setMarkDownText(`![${imageWithId.name}](${imageLocalUrl})`);
          }
        }}
      />
    </div>
  );
};

export default MarkdownNavBar;
