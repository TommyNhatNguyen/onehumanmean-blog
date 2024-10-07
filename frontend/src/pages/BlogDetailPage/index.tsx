import RecentBlogs from "./components/RecentBlogs";
import BlogContent from "./components/BlogContent";
import useBlogDetail from "./useBlogDetail";
import Container from "../../components/Container";

const BlogDetailPage = () => {
  const { blogContentProps, recentBlogsProps } = useBlogDetail();
  const { blogSingle } = blogContentProps;
  return (
    <Container tailStyles="pt-[30px]">
      <div className="flex flex-col-reverse gap-default lg:flex-row">
        <RecentBlogs {...recentBlogsProps} />
        <BlogContent {...blogSingle?.data?.data} />
      </div>
    </Container>
  );
};

export default BlogDetailPage;
