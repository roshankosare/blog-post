import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";

interface UploadedImagesProps {
  images: string[];
  onImageDelete: (id:string) => Promise<void>;
}

const UploadedImages: React.FC<UploadedImagesProps> = ({ images ,onImageDelete}) => {
  const handleCopyClick = async () => {
    if (copyLinkRef) {
      try {
        const imageId = copyLinkRef.current?.value.split("/").pop();
        await navigator.clipboard.writeText(
          `![${imageId || nanoid()}](${copyLinkRef.current?.value})` || ""
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const copyLinkRef = useRef<HTMLInputElement | null>(null);
  const [deleteButtonDisabled,setDeleteButtonDisabled] = useState(false);
  return (
    <div className="  w-full h-full px-2 py-5  overflow-y-scroll no-scrollbar">
      {images.length === 0 ? (
        <p className=" text-2xl font-bold text-gray-600 mx-auto my-10">
          No images Uplaoded
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-5 gap-y-5">
          {images.map((image) => (
            <div key={image} className="flex flex-col w-96 h-96 gap-y-2">
              <Image
                src={image}
                width={500}
                height={400}
                className="w-full h-56"
                alt="image"
              ></Image>
              <Input
                type={"text"}
                defaultValue={image}
                ref={copyLinkRef}
              ></Input>
              <div className=" flex gap-x-5 px-2 py-5">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => handleCopyClick()}
                >
                  Copy
                </Button>
                <Button disabled = {deleteButtonDisabled} variant={"destructive"} size={"sm"} onClick={async () => {
                  setDeleteButtonDisabled(true);
                  await onImageDelete(image);
                  setDeleteButtonDisabled(true);
                  }}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedImages;
