import clsx from "clsx";
import ItemPost from "../../../components/ItemPost";
import { PATH } from "../../../constant/path";
import { BlogContentType } from "../../../types/blogTypes";
import { Spin } from "antd";

type HeroType = {
  blogHero1: BlogContentType;
  blogHero2: BlogContentType;
  blogHero3: BlogContentType;
  blogHero4: BlogContentType;
  loading: boolean;
};

const Hero = ({
  blogHero1,
  blogHero2,
  blogHero3,
  blogHero4,
  loading,
}: HeroType) => {
  return (
    <div className="relative my-[20px] min-h-[823px] border-b-2 py-[30px] mobile:my-[30px]">
      <h2 className="relative z-20 font-semibold text-h2 text-black-100 dark:text-white">
        Recent blog posts
      </h2>
      {loading ? (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
          <Spin className="z-10" size="large" />
        </div>
      ) : (
        <>
          <div
            className={clsx(
              "mb-[30px] mt-[32px] flex flex-col gap-default",
              "tablet:grid tablet:grid-cols-2",
            )}
          >
            <div className="">
              <ItemPost
                basePath={PATH.BLOG.INDEX}
                {...blogHero1}
                textclamps={3}
                imgClasses="max-h-[240px]"
              />
            </div>
            <div className={clsx("flex flex-col gap-default")}>
              <ItemPost
                basePath={PATH.BLOG.INDEX}
                {...blogHero2}
                horizontal={true}
                textclamps={3}
                imgClasses="max-h-[220px]"
                articleStyleClasses={"mobile:flex-row"}
              />
              <ItemPost
                basePath={PATH.BLOG.INDEX}
                {...blogHero3}
                horizontal={true}
                textclamps={3}
                imgClasses="max-h-[220px]"
                articleStyleClasses={"mobile:flex-row"}
              />
            </div>
          </div>
          <div>
            <ItemPost
              basePath={PATH.BLOG.INDEX}
              {...blogHero4}
              imgClasses="max-h-[246px]"
              horizontal={true}
              textclamps={3}
              articleStyleClasses={"flex-col"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
