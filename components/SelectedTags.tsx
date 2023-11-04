import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

interface SelectedTagsProps {
    tags:string[];
    deleteTag:(tag:string)=>void
}

const SelectedTags: React.FC<SelectedTagsProps> = ({tags,deleteTag}) => {
    return (
        <div className="flex  flex-col gap-x-2">
        <Label>Tags</Label>
        <div className="px-1 py-2 flex flex-row flex-wrap gap-x-2 gap-y-2">
          {tags.map((tag) => (
            <div key={tag} className="flex rounded-full">
              <Badge>{tag}</Badge>
              <Button
                variant={"outline"}
                size={"xs"}
                className="px-1 py-1 border-none rounded-full hover:bg-transparent"
                onClick={() =>
                    deleteTag(tag)
               
                }
              >
                x
              </Button>
            </div>
          ))}
        </div>
        </div>
    )
}

export default SelectedTags;
