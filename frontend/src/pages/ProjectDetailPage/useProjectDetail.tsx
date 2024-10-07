import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { projectServices } from "../../services/projectServices";

function useProjectDetail() {
  const { projects, loading } = useAppSelector(
    (state) => state.projectReducers,
  );
  const { projectSlug } = useParams();
  const { data: projectSingle, isPending: projectDetailLoading } = useQuery({
    queryKey: ["projectSingle", projectSlug],
    queryFn: () => projectServices.getProjectsById(projectSlug),
  });
  const recentProjects = projects
    .filter((project) => project.id.toString() !== projectSlug)
    ?.slice(0, 6);
  const recentProjectsProps = { recentProjects, loading };
  const projectContentProps = { projectSingle, projectDetailLoading };
  return { recentProjectsProps, projectContentProps };
}
export default useProjectDetail;
