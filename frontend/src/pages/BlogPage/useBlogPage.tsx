import { useState } from "react";

import { PAGINATION_LIMIT } from "../../constant/general";
import { useAppSelector } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { blogServices } from "../../services/blogServices";

function useBlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs, loading } = useAppSelector((state) => state.blogReducers);
  const { data: blogsAllData, isPending: blogsAllLoading } = useQuery({
    queryKey: ["blogDefault", currentPage],
    queryFn: () =>
      blogServices.getBlogs(
        `/?limit=${PAGINATION_LIMIT}&page=${currentPage}&hidden=false&position=default`,
      ),
  });
  const blogsAll = blogsAllData?.data?.data || [];
  const blogsShow = blogs?.filter((blog) => !blog.hidden);
  const blogHero1 = blogsShow?.find((item) => item.position === "hero");
  const blogHero2 = blogsShow?.find((item) => item.position === "hero2");
  const blogHero3 = blogsShow?.find((item) => item.position === "hero3");
  const blogHero4 = blogsShow?.find((item) => item.position === "hero4");
  const blogsDefault = blogsShow?.filter((item) => item.position === "default");
  // Count total page
  const totalPage = Math.ceil(blogsDefault?.length / PAGINATION_LIMIT) || 0;
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum);
  };
  const heroProps = { blogHero1, blogHero2, blogHero3, blogHero4, loading };
  const blogListProps = {
    blogsDefault,
    totalPage,
    handlePagination,
    currentPage,
    handlePrev,
    handleNext,
    blogsAll,
    blogsAllLoading,
  };

  return { heroProps, blogListProps };
}
export default useBlogPage;
