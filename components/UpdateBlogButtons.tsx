import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Loader from "@/components/Loader";
interface UpdateBlogButtonsProps {
  saveDisabled: boolean;
  publishDisabled: boolean;
  published: boolean;
  onPublish: () => void;
  onSave: () => void;
}

const UpdateBlogButtons: React.FC<UpdateBlogButtonsProps> = ({
  saveDisabled,
  publishDisabled,
  published,
  onPublish,
  onSave,
}) => {
  return (
    <div className="flex gap-x-5 ">
      <Button
        disabled={saveDisabled || publishDisabled}
        onClick={async () => {
          onSave();
        }}
        className=" w-36"
      >
        {saveDisabled ? <Loader message="Please wait"></Loader> : "Save"}
      </Button>

      {published ? (
        <div className={cn(buttonVariants({ variant: "outline" }), "w-36")}>
          <p className="font-bold"> Published</p>
          {
            <p className="text-green-500 text-xl mx-2">
              <RiVerifiedBadgeFill />
            </p>
          }
        </div>
      ) : (
        <Button
          className="w-36"
          disabled={publishDisabled || saveDisabled}
          variant={"outline"}
          onClick={() => {
            onPublish();
          }}
        >
          {publishDisabled ? (
            <Loader message="Please wait"></Loader>
          ) : (
            "Publish"
          )}
        </Button>
      )}
    </div>
  );
};

export default UpdateBlogButtons;
