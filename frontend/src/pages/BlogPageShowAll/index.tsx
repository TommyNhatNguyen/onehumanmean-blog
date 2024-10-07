import { Empty, Spin } from "antd";
import BlogContent from "./components/BlogContent";
import useBlogPageShowAll from "./useBlogPageShowAll";
import BlogFilter from "./components/BlogFilter";

const BlogPageShowAll = () => {
  const { blogContentProps, blogFilterProps, loading, blogsRender } =
    useBlogPageShowAll();

  return (
    <div className="mt-[32px]">
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
          <Spin className="z-10" size="large" />
        </div>
      )}
      {blogsRender?.length > 0 ? (
        <>
          <BlogFilter {...blogFilterProps} />
          <BlogContent {...blogContentProps} />
        </>
      ) : (
        <Empty
          className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
          description="No blogs found"
        />
      )}
    </div>
  );
};

export default BlogPageShowAll;
