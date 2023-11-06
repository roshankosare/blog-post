import Link from "next/link";
import { Badge } from "./ui/badge";

interface TagLinksProps {
  tages: string[];
}

const TagLinks: React.FC<TagLinksProps> = ({ tages }) => {
  return (
    <div className="flex w-full flex-wrap h-auto py-2 gap-y-5 gap-x-3 border-b-[1px]">
      {tages.map((tag) => (
        <Link href={`/?tag=${tag.toLowerCase()}`} key={tag}>
          <Badge className="px-4 py-2" key={tag}>
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default TagLinks;
