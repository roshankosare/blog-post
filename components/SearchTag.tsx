import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchTagProps {
    onChangeTag:(tag:string)=>void;
    tag:string;
    setTags:()=>void

}

const SearchTag: React.FC<SearchTagProps> = ({onChangeTag,tag,setTags}) => {
    return (
        <div className=" flex flex-row gap-x-5 ">
        
       
        <Input
        className="w-full"
        onChange={(e) => {
          onChangeTag(e.target.value);
        }}
        value={tag }
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
    )
}

export default SearchTag;
