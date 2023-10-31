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
import { Button } from "./ui/button";
  interface UploadImagePreviewProps {
    open: boolean;
    onClose: () => void;
    onPostDelete: () => void;
  }
  
  export const DeletePostPopUP: FC<UploadImagePreviewProps> = ({
    open,
    onClose,
    onPostDelete,
  }) => {
    return (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>Are you sure want to delete Post, this can not be undone</DialogDescription>
          </DialogHeader>
        
          <DialogFooter className="gap-x-5 gap-y-5 ">
            <Button onClick={() => onPostDelete()}>Delete</Button>
            <DialogClose asChild>
              <Button variant={"outline"} onClick={() => onClose()}>
                Cancle
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  