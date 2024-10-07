import useProjectDetail from "./useProjectDetail";
import RecentProjects from "./components/RecentProjects";
import ProjectContent from "./components/ProjectContent";
import Container from "../../components/Container";

const ProjectDetailPage = () => {
  const { recentProjectsProps, projectContentProps } = useProjectDetail();
  const { projectSingle } = projectContentProps;

  return (
    <Container tailStyles="pt-[30px]">
      <div className="flex flex-col-reverse gap-default lg:flex-row">
        <RecentProjects {...recentProjectsProps} />
        <ProjectContent {...projectSingle?.data?.data} />
      </div>
    </Container>
  );
};

export default ProjectDetailPage;
