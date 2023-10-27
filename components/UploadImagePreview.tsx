import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { FC } from "react";
import Image from "next/image";
interface UploadImagePreviewProps {
  url: string;
  open: boolean;
  onClose: () => void;
  onImageUpload: () => void;
}

export const UploadImagePreview: FC<UploadImagePreviewProps> = ({
  url,
  open,
  onClose,
  onImageUpload,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Selected Image</DialogTitle>
          <DialogDescription>click Upload button below</DialogDescription>
        </DialogHeader>
        <div className="w-full h-auto">
          <Image
            className="w-auto h-80 mx-auto"
            src={url}
            width={600}
            height={400}
            alt="selected image"
          ></Image>
        </div>
        <DialogFooter className="gap-x-5">
          <Button onClick={() => onImageUpload()}>Uplaod</Button>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => onClose()}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
