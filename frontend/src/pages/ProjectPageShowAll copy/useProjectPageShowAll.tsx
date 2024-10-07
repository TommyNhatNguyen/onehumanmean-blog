import { useState } from "react";
import { useAppSelector } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { projectServices } from "../../services/projectServices";

function useProjectPageShowAll() {
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
  const { projects, loading: projectCategoriesLoading } = useAppSelector(
    (state) => state.projectReducers,
  );
  const { data, isPending: loading } = useQuery({
    queryKey: [search],
    queryFn: () => projectServices.getProjects(search),
  });
  const projectsRender = data?.data?.data || [];
  const categories = [
    ...new Set(
      projects
        ?.map((item) => item?.category?.split(","))
        .flat()
        ?.map((item) => item.toLowerCase()),
    ),
  ];
  const projectContentProps = { projectsRender, loading };
  const projectFilterProps = {
    handleSelectedTags,
    categories,
    selectedTags,
    handleSelectTime,
    filter,
    projectCategoriesLoading,
  };
  return { projectContentProps, projectFilterProps };
}
export default useProjectPageShowAll;
