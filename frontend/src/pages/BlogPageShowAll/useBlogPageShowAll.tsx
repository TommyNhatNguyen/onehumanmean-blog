import { useState } from "react";
import { blogServices } from "../../services/blogServices";
import { useAppSelector } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";

function useBlogPageShowAll() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filter, setFilter] = useState({ created_at: "new" });
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  let [_, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject: any) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };
  const handleSelectTime = (time: any) => {
    setFilter((prev) => {
      return { ...prev, created_at: time };
    });
    updateQueryString({ ...queryObject, created_at: time });
  };
  const handleSelectedTags = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
    updateQueryString({ ...queryObject, category: selectedTags.join(",") });
  };
  const { blogs } = useAppSelector((state) => state.blogReducers);
  const { data, isPending: loading } = useQuery({
    queryKey: [search],
    queryFn: () => blogServices.getBlogs(search),
  });
  const blogsRender = data?.data?.data || [];
  const categories = [
    ...new Set(
      blogs
        ?.map((item) => item?.category?.split(","))
        .flat()
        ?.map((item) => item.toLowerCase()),
    ),
  ];
  const blogContentProps = { blogsRender };
  const blogFilterProps = {
    handleSelectedTags,
    categories,
    selectedTags,
    handleSelectTime,
    filter,
  };
  return { blogContentProps, blogFilterProps, loading, blogsRender };
}
export default useBlogPageShowAll;
