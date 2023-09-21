import Blog from "./Blog";
import Card from "./ui/Card";

interface BlogContainerProps {}

const BlogContainer: React.FC<BlogContainerProps> = ({}) => {
  const blogs: string[] = ["blog1", "blog2", "blog3", "blog4", "blog 5"];
  return (
    <Card className="w-full flex flex-col max-h-full  overflow-y-scroll gap-y-5 no-scrollbar">
      {blogs.map((blog) => {
        return <Blog key={blog}></Blog>;
      })}
    </Card>
  );
};

export default BlogContainer;
