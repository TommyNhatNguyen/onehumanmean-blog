import clsx from "clsx";
import ItemPost from "../../../components/ItemPost";
import { PATH } from "../../../constant/path";
import { ProjectContentType } from "../../../types/projectTypes";

type ProjectContentTypes = {
  projectsRender: ProjectContentType[];
};

const ProjectContent = ({ projectsRender }: ProjectContentTypes) => {
  return (
    <div className="mt-[32px]">
      {projectsRender?.map((item, index) => {
        return (
          <ItemPost
            basePath={PATH.PROJECT.INDEX}
            key={item.id}
            {...item}
            textclamps={3}
            articleStyleClasses={clsx(index !== 0 && "mt-[32px]")}
            imgClasses={"max-h-[240px]"}
            horizontal={true}
          />
        );
      })}
    </div>
  );
};

export default ProjectContent;
