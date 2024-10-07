import clsx from "clsx";
import ItemPost from "../../../components/ItemPost";
import { PATH } from "../../../constant/path";
import { BlogContentType } from "../../../types/blogTypes";

type BlogContentTypes = {
  blogsRender: BlogContentType[];
};

const BlogContent = ({ blogsRender }: BlogContentTypes) => {
  return (
    <div className="mt-[32px]">
      {blogsRender?.map((item, index) => {
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
      })}
    </div>
  );
};

export default BlogContent;
