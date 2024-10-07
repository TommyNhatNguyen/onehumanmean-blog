import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { projectServices } from "../../services/projectServices";

function useProjectDetail() {
  const { projects } = useAppSelector((state) => state.projectReducers);
  const { projectSlug } = useParams();
  const { data: projectSingle } = useQuery({
    queryKey: ["projectSingle", projectSlug],
    queryFn: () => projectServices.getProjectsById(projectSlug),
  });
  const recentProjects = projects
    .filter((project) => project.id.toString() !== projectSlug)
    ?.slice(0, 6);
  const recentProjectsProps = { recentProjects };
  const projectContentProps = { projectSingle };
  return { recentProjectsProps, projectContentProps };
}
export default useProjectDetail;
