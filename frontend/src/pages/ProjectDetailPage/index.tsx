import useProjectDetail from "./useProjectDetail";
import RecentProjects from "./components/RecentProjects";
import ProjectContent from "./components/ProjectContent";
import Container from "../../components/Container";

const ProjectDetailPage = () => {
  const { recentProjectsProps, projectContentProps } = useProjectDetail();

  return (
    <Container tailStyles="pt-[30px]">
      <div className="flex flex-col-reverse gap-default lg:flex-row">
        <RecentProjects {...recentProjectsProps} />
        <ProjectContent {...projectContentProps} />
      </div>
    </Container>
  );
};

export default ProjectDetailPage;
