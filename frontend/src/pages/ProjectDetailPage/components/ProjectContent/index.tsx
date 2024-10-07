import moment from "moment";
import CategoryTagComponent from "../../../../components/CategoryTagComponent";
import ContactComponent from "../../../../components/ContactComponent";
import { Empty, Spin } from "antd";
import Button from "../../../../components/Button";
import { PATH } from "../../../../constant/path";

const ProjectContent = ({
  projectSingle,
  projectDetailLoading,
}: {
  projectSingle: any;
  projectDetailLoading: boolean;
}) => {
  const { author, category, content, title, created_at, thumbnail_url, id } =
    projectSingle?.data?.data || {};
  const formatedDate = moment(created_at)?.format("DD MMM YYYY");
  const categoryList = category?.split(",") as string[];
  return (
    <div className="mobile: relative min-h-[764px] w-full">
      {projectDetailLoading && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-start justify-center bg-white dark:bg-black-200">
          <Spin className="z-20" size="small" />
        </div>
      )}
      {!projectDetailLoading ? (
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
        <div className="relative z-10 flex-grow">
          <Empty description="No content found for this blog" />
          <Button
            link={PATH.PROJECT.INDEX}
            type="button"
            tailClasses="h-[48px] px-[20px] rounded-[8px] bg-purple-300 hover:bg-purple-200 mx-auto mt-[16px]"
          >
            Back to projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectContent;
