import { Empty, Spin } from "antd";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Pagination from "../Pagination";
import ItemPost from "../ItemPost";
import { PATH } from "../../constant/path";
import { Link } from "react-router-dom";
import { BlogContentType } from "../../types/blogTypes";

type BlogListType = {
  blogsAll: BlogContentType[];
  totalPage: number;
  handlePagination: (page: number) => void;
  currentPage: number;
  handlePrev: () => void;
  handleNext: () => void;
  blogsAllLoading: boolean;
  wrapperTailClass?: string;
};

const BlogList = ({
  blogsAll,
  totalPage,
  handlePagination,
  currentPage,
  handlePrev,
  handleNext,
  blogsAllLoading,
  wrapperTailClass,
}: BlogListType) => {
  return (
    <div className={wrapperTailClass}>
      <h2 className="font-semibold text-h2 text-black-100 dark:text-white">
        Blog posts
      </h2>
      <Link
        to={PATH.BLOG.SHOW}
        className="mt-[16px] underline duration-300 hover:text-black-200 dark:hover:text-gray-200"
      >
        Show all posts
      </Link>
      <div
        className={twMerge(
          clsx(
            "relative mt-[32px] grid min-h-[700px] grid-flow-row grid-cols-1 gap-[24px] mobile:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] mobile:gap-default",
          ),
        )}
      >
        {blogsAllLoading && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
            <Spin className="z-10" size="large" />
          </div>
        )}
        {blogsAll?.length > 0 && !blogsAllLoading
          ? blogsAll.map((item) => {
              return (
                <ItemPost
                  basePath={PATH.BLOG.INDEX}
                  key={item.id}
                  {...item}
                  textclamps={3}
                  imgClasses="max-h-[240px]"
                />
              );
            })
          : Array(6)
              .fill("")
              .map((_) => (
                <Empty
                  className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
                  description="No blogs found"
                />
              ))}
      </div>
      {blogsAll?.length > 0 && !blogsAllLoading && (
        <Pagination
          totalPage={totalPage}
          handlePagination={handlePagination}
          currentPage={currentPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};

export default BlogList;
