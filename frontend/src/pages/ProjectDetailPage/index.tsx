import useProjectDetail from "./useProjectDetail";
import RecentProjects from "./components/RecentProjects";
import ProjectContent from "./components/ProjectContent";

const ProjectDetailPage = () => {
  const { recentProjectsProps, projectContentProps } = useProjectDetail();

  return (
    <div className="flex flex-col-reverse gap-default lg:flex-row">
      <RecentProjects {...recentProjectsProps} />
      <ProjectContent {...projectContentProps} />
    </div>
  );
};

export default ProjectDetailPage;
