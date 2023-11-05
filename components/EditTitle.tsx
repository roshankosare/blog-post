import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface EditTitleProps {
  title: string;
  setTitle: (value: string) => void;
}

const EditTitle: React.FC<EditTitleProps> = ({ title, setTitle }) => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <Label>Title</Label>
      <div className=" flex flex-col sm:flex-row sm:gap-x-5 gap-y-5">
        <Input
          className="w-full"
          value={title}
          onChange={(e) =>  setTitle(e.target.value) }
          disabled={!isEditable}
        ></Input>
        <Button
          className="w-20"
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsEditable((pre) => !pre)}
        >
          {isEditable ? "Done" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default EditTitle;
