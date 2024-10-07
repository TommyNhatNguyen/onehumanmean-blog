import clsx from "clsx";
import { Link } from "react-router-dom";
import { CATEGORY_FORMAT_COLOR } from "../../constant/general";

type CategoryTagComponentPropType = {
  tags: Array<string>;
  groupListTailClasses?: string;
};
const CategoryTagComponent = ({
  tags,
  groupListTailClasses,
}: CategoryTagComponentPropType) => {
  return (
    <ul
      className={clsx(
        "flex flex-wrap items-center gap-[8px]",
        groupListTailClasses,
      )}
    >
      {tags?.map((item, index) => {
        return (
          <li key={item || index}>
            <Link
              className={clsx(
                "flex h-[24px] items-center justify-center rounded-[16px] px-[10px] text-tag capitalize duration-150 hover:opacity-60",
                CATEGORY_FORMAT_COLOR[index].textColor,
                CATEGORY_FORMAT_COLOR[index].bgColor,
              )}
              to="#"
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryTagComponent;
