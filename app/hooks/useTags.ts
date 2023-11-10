import { Tag } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const useTags = () => {
  const [searchInputTag, setSearchInputTag] = useState<string>("");
  const [queryResponseTags, setQueryReponseTags] = useState<string[]>([]);
 


  useEffect(() => {
    if (searchInputTag.length > 3) queryTagsFromServer(searchInputTag);
  }, [searchInputTag]);
  const queryTagsFromServer = async (tag: string) => {
    if (tag === "") {
      setQueryReponseTags([]);
      return;
    }

    axios
      .get("/api/tags", {
        params: {
          name: tag,
        },
      })
      .then((res) => setQueryReponseTags(res.data.map((tag: Tag) => tag.name)));
  };

 

  return {
    searchInputTag,
    queryResponseTags,
   
    queryTagsFromServer,
    
    setSearchInputTag,
  };
};
export default useTags;
