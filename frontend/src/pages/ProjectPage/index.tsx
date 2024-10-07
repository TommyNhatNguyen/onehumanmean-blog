import Pagination from "../../components/Pagination";

import { PATH } from "../../constant/path";
import useProjectPage from "./useProjectPage";
import { Empty, Spin } from "antd";
import ItemPost from "../../components/ItemPost";
import { Link } from "react-router-dom";
import { ProjectContentType } from "../../types/projectTypes";

const ProjectPage = () => {
  const { projectListProps } = useProjectPage();
  const {
    totalPage,
    handlePagination,
    currentPage,
    handlePrev,
    handleNext,
    projectsAll,
    projectsAllLoading,
  } = projectListProps;
  const projectsTop: ProjectContentType[] = projectsAll?.slice(0, 2);
  const projectsMiddle: ProjectContentType[] = projectsAll?.slice(2, 3);
  const projectsBottom: ProjectContentType[] = projectsAll?.slice(3, 5);
  return (
    <div className="mt-[20px] mobile:mt-[30px] tablet:mt-[50px]">
      <h1 className="text-nowrap border-b-2 border-t-2 text-center font-bold text-h1-lg uppercase text-black-100 dark:text-white">
        projects
      </h1>
      <div className="mt-[30px] pt-[30px]">
        <h2 className="font-semibold text-h2 capitalize text-black-100 dark:text-white">
          List Project
        </h2>
        <Link
          to={PATH.PROJECT.SHOW}
          className="mt-[16px] underline duration-300 hover:text-black-200 dark:text-white dark:hover:text-gray-200"
        >
          Show all projects
        </Link>
        <div className="relative mt-[32px] min-h-[654px]">
          {projectsAllLoading && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <Spin className="z-10" size="large" />
            </div>
          )}
          {!projectsAllLoading && (
            <>
              <div className="grid grid-cols-1 gap-default tablet:grid-cols-2">
                {projectsAll?.length > 0 ? (
                  projectsTop?.map((item, index) => {
                    return (
                      <ItemPost
                        basePath={PATH.PROJECT.INDEX}
                        key={item?.id || index}
                        {...item}
                        textclamps={3}
                        variant="medium"
                        imgClasses="max-h-[330px]"
                      />
                    );
                  })
                ) : (
                  <>
                    <Empty
                      className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
                      description="Currently has no project here"
                    />
                    <Empty
                      className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
                      description="Currently has no project here"
                    />
                  </>
                )}
              </div>
              <div className="my-[32px]">
                {projectsAll?.length > 0 ? (
                  projectsMiddle?.map((item, index) => {
                    return (
                      <ItemPost
                        basePath={PATH.PROJECT.INDEX}
                        key={item?.id || index}
                        {...item}
                        textclamps={3}
                        imgClasses="max-h-[330px]  tablet:max-h-[556px]"
                        variant="medium"
                      />
                    );
                  })
                ) : (
                  <Empty
                    className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
                    description="Currently has no project here"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-default tablet:grid-cols-2">
                {projectsAll?.length > 0 ? (
                  projectsBottom?.map((item, index) => {
                    return (
                      <ItemPost
                        basePath={PATH.PROJECT.INDEX}
                        key={item?.id || index}
                        {...item}
                        textclamps={3}
                        imgClasses="max-h-[330px]  tablet:max-h-[556px]"
                        variant="medium"
                      />
                    );
                  })
                ) : (
                  <>
                    <Empty
                      className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
                      description="Currently has no project here"
                    />
                    <Empty
                      className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
                      description="Currently has no project here"
                    />
                  </>
                )}
              </div>
              {projectsAll?.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  handleNext={handleNext}
                  handlePagination={handlePagination}
                  handlePrev={handlePrev}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
