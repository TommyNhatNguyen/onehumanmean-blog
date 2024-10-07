import RecentBlogs from "./components/RecentBlogs";
import BlogContent from "./components/BlogContent";
import useBlogDetail from "./useBlogDetail";

const BlogDetailPage = () => {
  const { blogContentProps, recentBlogsProps } = useBlogDetail();
  const { blogSingle } = blogContentProps;
  return (
    <div className="flex flex-col-reverse gap-default px-[32px] py-[30px] lg:flex-row">
      <RecentBlogs {...recentBlogsProps} />
      <BlogContent {...blogSingle?.data?.data} />
    </div>
  );
};

export default BlogDetailPage;
