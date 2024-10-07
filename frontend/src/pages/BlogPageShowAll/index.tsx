import BlogContent from "./components/BlogContent";
import useBlogPageShowAll from "./useBlogPageShowAll";
import BlogFilter from "./components/BlogFilter";

const BlogPageShowAll = () => {
  const { blogContentProps, blogFilterProps } = useBlogPageShowAll();

  return (
    <div className="mt-[32px]">
      <BlogFilter {...blogFilterProps} />
      <BlogContent {...blogContentProps} />
    </div>
  );
};

export default BlogPageShowAll;
