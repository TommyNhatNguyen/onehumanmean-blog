import Hero from "./components/Hero";
import useBlogPage from "./useBlogPage";
import BlogList from "../../components/BlogList";
import styled from "styled-components";

const BlogPage = () => {
  const { heroProps, blogListProps } = useBlogPage();
  return (
    <div className="mt-[20px] mobile:mt-[30px] tablet:mt-[50px] *:dark:text-white">
      <StyledHeader className="border-b-2 border-t-2">
        <h1 className="head1 text-nowrap text-center font-bold text-h1-lg uppercase text-black-100 dark:text-white">
          welcome to the one human mean blog
        </h1>
        <h2 className="head2 text-nowrap text-center font-bold text-h1-lg uppercase text-black-100 dark:text-white">
          welcome to the one human mean blog
        </h2>
      </StyledHeader>
      <Hero {...heroProps} />
      <BlogList {...blogListProps} />
    </div>
  );
};

export default BlogPage;

const StyledHeader = styled.div`
  min-height: var(--fs-h1-lg);
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0)
  );

  @keyframes scrollLeft {
    to {
      left: max(-8800px, -700vw);
    }
  }
  > * {
    line-height: calc(1em);
    position: absolute;
    left: 100%;
    animation-name: scrollLeft;
    animation-duration: 30s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .head1 {
    animation-delay: calc(30s / 2 * (2 - 1) * -1);
  }
  .head2 {
    animation-delay: calc(30s / 2 * (2 - 2) * -1);
  }
`;
