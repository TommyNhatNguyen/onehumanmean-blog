import { Empty } from "antd";
import { PATH } from "../../../../constant/path";
import ItemPost from "../../../../components/ItemPost";
import { BlogContentType } from "../../../../types/blogTypes";

type RecentBlogs = {
  recentBlogs: BlogContentType[];
};

const RecentBlogs = ({ recentBlogs }: RecentBlogs) => {
  return (
    <div className="left-0 top-[10px] h-fit flex-shrink-0 lg:max-w-[342px]">
      <h2 className="font-semibold text-h2 text-black-100 dark:text-white">
        Recent blog posts
      </h2>
      <div className="mt-[32px] flex flex-row flex-wrap gap-default lg:flex-col">
        {recentBlogs?.length > 0 ? (
          recentBlogs?.map((item) => {
            return (
              <ItemPost
                basePath={PATH.BLOG.INDEX}
                key={item.id}
                {...item}
                textclamps={3}
                imgClasses="max-h-[342px]"
              />
            );
          })
        ) : (
          <Empty className="w-full" description="No current blogs" />
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;
