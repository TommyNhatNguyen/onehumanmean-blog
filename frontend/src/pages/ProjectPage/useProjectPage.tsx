import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectServices } from "../../services/projectServices";
import { useAppSelector } from "../../store";

const PAGINATION_LIMIT = 5;
function useProjectPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { projects } = useAppSelector((state) => state.projectReducers);
  const { data: projectsAllData, isPending: projectsAllLoading } = useQuery({
    queryKey: ["projectDefault", currentPage],
    queryFn: () =>
      projectServices.getProjects(
        `/?limit=${PAGINATION_LIMIT}&page=${currentPage}&hidden=false`,
      ),
  });
  const projectsAll = projectsAllData?.data?.data || [];
  // Count total page
  const totalPage = Math.ceil(projects?.length / PAGINATION_LIMIT) || 0;

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum);
  };
  const projectListProps = {
    totalPage,
    handlePagination,
    currentPage,
    handlePrev,
    handleNext,
    projectsAll,
    projectsAllLoading,
  };

  return { projectListProps };
}
export default useProjectPage;
