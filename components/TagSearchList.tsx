interface TagSearchListProps {
  tags: string[];
  setTags: (tag: string) => void;
}

const TagSearchList: React.FC<TagSearchListProps> = ({ tags, setTags }) => {
  return (
    <div>
      {tags.length > 0 ? (
        <ul className="flex flex-col  px-1 py-1 my-2 border border-gray-300 rounded-md max-h-40 overflow-y-scroll no-scrollbar">
          {tags.map((tag) => (
            <li
              className="hover:bg-gray-50 px-1 py-1 cursor-pointer"
              key={tag}
              onClick={(e) => {
                setTags(tag);
                
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default TagSearchList;