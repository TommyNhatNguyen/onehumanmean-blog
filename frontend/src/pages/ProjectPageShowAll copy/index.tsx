import useProjectPageShowAll from "./useProjectPageShowAll";
import ProjectContent from "./components/ProjectContent";
import ProjectFilter from "./components/ProjectFilter";

const ProjectPageShowAll = () => {
  const { projectContentProps, projectFilterProps } = useProjectPageShowAll();

  return (
    <div className="mt-[32px]">
      <ProjectFilter {...projectFilterProps} />
      <ProjectContent {...projectContentProps} />
    </div>
  );
};

export default ProjectPageShowAll;
