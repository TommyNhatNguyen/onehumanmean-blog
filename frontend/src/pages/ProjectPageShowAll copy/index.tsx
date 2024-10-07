import { Empty, Spin } from "antd";
import useProjectPageShowAll from "./useProjectPageShowAll";
import ProjectContent from "./components/ProjectContent";
import ProjectFilter from "./components/ProjectFilter";

const ProjectPageShowAll = () => {
  const { projectContentProps, projectFilterProps, loading, projectsRender } =
    useProjectPageShowAll();

  return (
    <div className="mt-[32px]">
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
          <Spin className="z-10" size="large" />
        </div>
      )}
      {projectsRender?.length > 0 ? (
        <>
          <ProjectFilter {...projectFilterProps} />
          <ProjectContent {...projectContentProps} />
        </>
      ) : (
        <Empty
          className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
          description="No blogs found"
        />
      )}
    </div>
  );
};

export default ProjectPageShowAll;
