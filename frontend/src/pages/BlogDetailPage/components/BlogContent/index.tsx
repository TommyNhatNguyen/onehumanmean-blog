import moment from "moment";
import CategoryTagComponent from "../../../../components/CategoryTagComponent";
import ContactComponent from "../../../../components/ContactComponent";
import { BlogContentType } from "../../../../types/blogTypes";
import { Empty } from "antd";
import Button from "../../../../components/Button";
import { PATH } from "../../../../constant/path";

const BlogContent = ({
  author,
  category,
  content,
  title,
  created_at,
  thumbnail_url,
  id,
}: BlogContentType) => {
  const formatedDate = moment(created_at)?.format("d MMM YYYY");
  const categoryList = category?.split(",") as string[];
  return (
    <>
      {id ? (
        <div className="relative flex-grow">
          <p className="font-semibold text-caption capitalize text-purple-200">
            {author} • {formatedDate}
          </p>
          <h1 className="mt-[32px] font-bold text-h1 text-black-100 dark:text-white">
            {title}
          </h1>
          <figure className="image mx-auto my-[32px] aspect-[778/498] max-h-[498px] w-full">
            <img
              src={thumbnail_url}
              alt="blog thumbnail"
              className="object-cover object-center"
            />
          </figure>
          <div
            className="blogdetail-content mt-[32px]"
            dangerouslySetInnerHTML={{ __html: content as TrustedHTML }}
          ></div>
          <CategoryTagComponent
            tags={categoryList}
            groupListTailClasses="mt-[24px] mb-[32px]"
          />
          <ContactComponent tailClasses="py-[30px] border-t-2" />
        </div>
      ) : (
        <div className="relative flex-grow">
          <Empty description="No content found for this blog" />
          <Button
            link={PATH.BLOG.INDEX}
            type="button"
            tailClasses="h-[48px] px-[20px] rounded-[8px] bg-purple-300 hover:bg-purple-200 mx-auto mt-[16px]"
          >
            Back to blogs
          </Button>
        </div>
      )}
    </>
  );
};

export default BlogContent;
