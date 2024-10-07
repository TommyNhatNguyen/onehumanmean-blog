import useProjectDetail from "./useProjectDetail";
import RecentProjects from "./components/RecentProjects";
import ProjectContent from "./components/ProjectContent";

const ProjectDetailPage = () => {
  const { recentProjectsProps, projectContentProps } = useProjectDetail();
  const { projectSingle } = projectContentProps;

  return (
    <div className="flex flex-col-reverse gap-default px-[32px] pt-[30px] lg:flex-row">
      <RecentProjects {...recentProjectsProps} />
      <ProjectContent {...projectSingle?.data?.data} />
    </div>
  );
};

export default ProjectDetailPage;
