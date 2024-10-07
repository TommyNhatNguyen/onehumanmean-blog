import { Empty, Spin } from "antd";
import { PATH } from "../../../../constant/path";
import ItemPost from "../../../../components/ItemPost";
import { ProjectContentType } from "../../../../types/projectTypes";

type RecentProjectsType = {
  recentProjects: ProjectContentType[];
  loading: boolean;
};

const RecentProjects = ({ recentProjects, loading }: RecentProjectsType) => {
  return (
    <div className="left-0 top-[10px] h-fit flex-shrink-0 lg:max-w-[342px]">
      <h2 className="font-semibold text-h2 text-black-100 dark:text-white">
        Recent projects posts
      </h2>
      <div className="relative mt-[32px] flex flex-row flex-wrap gap-default lg:flex-col">
        {loading && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
            <Spin className="z-10" size="small" />
          </div>
        )}
        {recentProjects?.length > 0 && !loading ? (
          recentProjects?.map((item) => {
            return (
              <ItemPost
                basePath={PATH.PROJECT.INDEX}
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

export default RecentProjects;
