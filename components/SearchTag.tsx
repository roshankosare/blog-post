import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

interface SearchTagProps {
  onChangeTag: (tag: string) => void;
  tag: string;
  setTags: () => void;
}

const SearchTag: React.FC<SearchTagProps> = ({ onChangeTag, tag, setTags }) => {
  return (
    <div className=" flex flex-row gap-x-5 ">
      <Input
        className="w-full"
        onChange={(e) => {
          onChangeTag(e.target.value);
        }}
        value={tag}
      ></Input>

      <Button
        variant={"outline"}
        size={"sm"}
        className=" w-24 sm:py-5"
        onClick={() => {
          setTags();
        }}
      >
        Add
      </Button>
    </div>
  );
};

export const SearchTagSkeleton = () => {
  return (
    <div className=" flex flex-row gap-x-5 ">
      <Skeleton className="w-full sm:h-10 h-8" />
      <Skeleton className="w-20 sm:h-10 h-8" />
    </div>
  );
};

export default SearchTag;
