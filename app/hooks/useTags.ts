import { Tag } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const useTags = () => {
  const [searchInputTag, setSearchInputTag] = useState<string>("");
  const [queryResponseTags, setQueryReponseTags] = useState<string[]>([]);
  const [userSelectedTags, setUserSelectedTags] = useState<string[]>([]);
  const [blogTags, setBlogTags] = useState<string[] >([]);

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

  const insertTagInUserSeletedTags = (tag: string) => {
    if (tag && !userSelectedTags.includes(tag)) {
      setUserSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const deleteTagInUserSeletedTag = (tag: string) => {
    setUserSelectedTags((pre) => pre.filter((item) => item !== tag));
  };

  return {
    searchInputTag,
    queryResponseTags,
    userSelectedTags,
    queryTagsFromServer,
    insertTagInUserSeletedTags,
    deleteTagInUserSeletedTag,
    setSearchInputTag,
  };
};
export default useTags;
