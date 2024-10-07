import clsx from "clsx";
import ItemPost from "../../../components/ItemPost";
import { PATH } from "../../../constant/path";
import { ProjectContentType } from "../../../types/projectTypes";
import { Empty, Spin } from "antd";

type ProjectContentTypes = {
  projectsRender: ProjectContentType[];
  loading: boolean;
};

const ProjectContent = ({ projectsRender, loading }: ProjectContentTypes) => {
  return (
    <div className="relative mt-[32px]">
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full min-h-[300px] w-full items-center justify-center bg-white dark:bg-black-200">
          <Spin className="z-10" size="large" />
        </div>
      )}
      {projectsRender?.length > 0 && !loading ? (
        projectsRender?.map((item, index) => {
          return (
            <ItemPost
              basePath={PATH.PROJECT.INDEX}
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

export default ProjectContent;
