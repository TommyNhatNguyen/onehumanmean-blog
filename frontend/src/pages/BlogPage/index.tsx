import Hero from "./components/Hero";
import useBlogPage from "./useBlogPage";
import BlogList from "../../components/BlogList";

const BlogPage = () => {
  const { heroProps, blogListProps } = useBlogPage();
  return (
    <div className="mt-[20px] mobile:mt-[30px] tablet:mt-[50px] *:dark:text-white">
      <h1 className="text-nowrap border-b-2 border-t-2 text-center font-bold text-h1-lg uppercase text-black-100">
        the blog
      </h1>
      <Hero {...heroProps} />
      <BlogList {...blogListProps} />
    </div>
  );
};

export default BlogPage;
