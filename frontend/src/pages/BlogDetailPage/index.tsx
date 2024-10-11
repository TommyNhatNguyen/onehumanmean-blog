import RecentBlogs from "./components/RecentBlogs";
import BlogContent from "./components/BlogContent";
import useBlogDetail from "./useBlogDetail";

const BlogDetailPage = () => {
  const { blogContentProps, recentBlogsProps } = useBlogDetail();
  return (
    <div className="flex flex-col-reverse gap-default lg:flex-row">
      <RecentBlogs {...recentBlogsProps} />
      <BlogContent {...blogContentProps} />
    </div>
  );
};

export default BlogDetailPage;
