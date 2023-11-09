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
import { useRef, useState } from "react";
import TooltipMarkdownTool from "./TooltipMarkdownTool";

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
  setMarkDownText: (value: string) => void;
  setPreview: () => void;
  setBlogImage: (iamge: File) => void;
  showImageUpload: () => void;
  preview: boolean;
};

const MarkdownNavBar: React.FC<MarkdownNavBarProps> = ({
  setMarkDownText,
  setPreview,
  preview,
  showImageUpload,
  setBlogImage,
}) => {
  const handleUploadImageButton = () => {
    fileInputRef.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="w-full h-auto sm:h-12 flex flex-col gap-y-2 sm:flex-row  px-2 sm:px-5 py-2 border border-gray-200 rounded-sm justify-between">
      <div className="flex  gap-x-3  sm:gap-x-5 ">
        <TooltipMarkdownTool tipText="Add Heading">
          <Button
            variant={"outline"}
            size={"icon_sm"}
            onClick={() => setMarkDownText(md.h1)}
            disabled={preview}
          >
            <FaHeading />
          </Button>
        </TooltipMarkdownTool>
        <TooltipMarkdownTool tipText="Bold Text">
          <Button
            variant={"outline"}
            size={"icon_sm"}
            onClick={() => setMarkDownText(md.bold)}
            disabled={preview}
          >
            <FaBold />
          </Button>
        </TooltipMarkdownTool>

        <TooltipMarkdownTool tipText="Italic Text">
          <Button
            variant={"outline"}
            size={"icon_sm"}
            onClick={() => setMarkDownText(md.italic)}
            disabled={preview}
          >
            <FaItalic />
          </Button>
        </TooltipMarkdownTool>

        <TooltipMarkdownTool tipText="Unorderd List">
          <Button
            variant={"outline"}
            size={"icon_sm"}
            onClick={() => setMarkDownText(md.ol)}
            disabled={preview}
          >
            <FaListOl />
          </Button>
        </TooltipMarkdownTool>

        <TooltipMarkdownTool tipText="Orderd List">
          <Button
            variant={"outline"}
            size={"icon_sm"}
            onClick={() => setMarkDownText(md.ul)}
            disabled={preview}
          >
            <FaListUl />
          </Button>
        </TooltipMarkdownTool>

        <TooltipMarkdownTool tipText="Add Link">
          <Button
            variant={"outline"}
            size={"icon_sm"}
            onClick={() => setMarkDownText(md.link)}
            disabled={preview}
          >
            <FaLink />
          </Button>
        </TooltipMarkdownTool>

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
              <DropdownMenuItem onClick={() => handleUploadImageButton()}>
                Upload
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" flex gap-x-2 sm:gap-x-5">
        <Toggle enable={preview} label="Preview" onClick={() => setPreview()} />
        <Button
          onClick={() => showImageUpload()}
          size={"xs"}
          variant={"outline"}
          className="my-auto"
        >
          Images
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={async (e) => {
          const image = e.target.files?.[0];

          if (image) {
            const imageType = image?.name.split(".")[1];
            const imageId = nanoid();
            const imageWithId = new File([image], `${imageId}.${imageType}`);
            setBlogImage(imageWithId);

            // const url = await uploadBlogImage();
            // setMarkDownText(`![${imageWithId.name}?.name}](${url})`);
          }
        }}
      />
    </div>
  );
};

export default MarkdownNavBar;
