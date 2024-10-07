import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { blogServices } from "../../services/blogServices";
import { useAppSelector } from "../../store";

function useBlogDetail() {
  const { blogs, loading } = useAppSelector((state) => state.blogReducers);
  const { blogSlug } = useParams();
  const { data: blogSingle, isPending: blogDetailLoading } = useQuery({
    queryKey: ["blogSingle", blogSlug],
    queryFn: () => blogServices.getBlogsById(blogSlug),
  });
  const recentBlogs = blogs
    .filter((blog) => blog.id.toString() !== blogSlug)
    ?.slice(0, 6);
  const recentBlogsProps = { recentBlogs, loading };
  const blogContentProps = { blogSingle, blogDetailLoading };
  return { recentBlogsProps, blogContentProps };
}
export default useBlogDetail;
