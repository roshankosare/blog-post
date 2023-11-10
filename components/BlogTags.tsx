import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

interface SelectedTagsProps {
  tags: string[];
  link?: boolean;
}

const BlogTags: React.FC<SelectedTagsProps> = ({ tags, link }) => {
  return (
    <div className="flex  flex-col gap-x-2">
      <div className="px-1 py-2 flex flex-row flex-wrap gap-x-2 gap-y-2">
        {link
          ? tags.map((tag) => (
              <div key={tag} className="flex rounded-full">
                <Link href={`/?tag=${tag.toLowerCase()}`}>
                  {" "}
                  <Badge
                    variant={"outline"}
                    className="sm:px-4 sm:py-2 px-2 py-1"
                  >
                    {tag}
                  </Badge>
                </Link>
              </div>
            ))
          : tags.map((tag) => (
              <div key={tag} className="flex rounded-full">
                <Badge
                  variant={"outline"}
                  className="sm:px-4 sm:py-2 px-2 py-1"
                >
                  {tag}
                </Badge>
              </div>
            ))}
      </div>
    </div>
  );
};

export const BlogTagsSkeleton = () => {
  return (
    <div className="flex  flex-col gap-x-2">
      <Skeleton className="w-20 h-4 sm:h-6" />
      <div className="px-1 py-2 flex flex-row flex-wrap gap-x-2 gap-y-2">
        {[0, 1, 2].map((tag) => (
          <Skeleton key={tag} className=" h-6 w-24 rounded-full"></Skeleton>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
