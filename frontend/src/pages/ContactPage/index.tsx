import { useState } from "react";
import ContactComponent from "../../components/ContactComponent";
import { useAppSelector } from "../../store";
import { blogServices } from "../../services/blogServices";
import { PAGINATION_LIMIT } from "../../constant/general";
import { useQuery } from "@tanstack/react-query";
import BlogList from "../../components/BlogList";

const ContactPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs } = useAppSelector((state) => state.blogReducers);
  const { data: blogsAllData, isPending: blogsAllLoading } = useQuery({
    queryKey: ["blogDefault", currentPage],
    queryFn: () =>
      blogServices.getBlogs(
        `/?limit=${PAGINATION_LIMIT}&page=${currentPage}&hidden=false`,
      ),
  });
  const blogsAll = blogsAllData?.data?.data || [];
  const totalPage = Math.round(blogs?.length / PAGINATION_LIMIT) || 0;
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum);
  };
  const blogListProps = {
    totalPage,
    handlePagination,
    currentPage,
    handlePrev,
    handleNext,
    blogsAll,
    blogsAllLoading,
  };
  return (
    <div className="py-[30px]">
      <ContactComponent />
      <BlogList wrapperTailClass="mt-[16px]" {...blogListProps} />
    </div>
  );
};

export default ContactPage;
