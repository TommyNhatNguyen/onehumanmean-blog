import clsx from "clsx";
import ItemPost from "../../../components/ItemPost";
import { PATH } from "../../../constant/path";
import { BlogContentType } from "../../../types/blogTypes";
import { Empty, Spin } from "antd";

type BlogContentTypes = {
  blogsRender: BlogContentType[];
  loading: boolean;
};

const BlogContent = ({ blogsRender, loading }: BlogContentTypes) => {
  return (
    <div className="relative mt-[32px] min-h-[300px]">
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
          <Spin className="z-20" size="large" />
        </div>
      )}
      {blogsRender?.length > 0 && !loading ? (
        blogsRender?.map((item, index) => {
          return (
            <ItemPost
              basePath={PATH.BLOG.INDEX}
              key={item.id}
              {...item}
              textclamps={3}
              articleStyleClasses={clsx(index !== 0 && "mt-[32px]")}
              imgClasses={"max-h-[240px]"}
              horizontal={true}
            />
          );
        })
      ) : (
        <Empty
          className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
          description="No blogs found"
        />
      )}
    </div>
  );
};

export default BlogContent;
