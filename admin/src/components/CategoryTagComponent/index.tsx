import clsx from "clsx";
import { Link } from "react-router-dom";

type CategoryTagComponentPropType = {
  tags: Array<string>;
  groupListTailClasses?: string;
};

const formatStyles = [
  { textColor: "text-purple-200", bgColor: "bg-purple-100" },
  { textColor: "text-blue-200", bgColor: "bg-blue-100" },
  { textColor: "text-red-200", bgColor: "bg-red-100" },
  { textColor: "text-green-200", bgColor: "bg-green-100" },
  { textColor: "text-sky-200", bgColor: "bg-sky-100" },
  { textColor: "text-blue-light-200", bgColor: "bg-blue-light-100" },
  { textColor: "text-orange-200", bgColor: "bg-orange-100" },
];

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
                formatStyles[index].textColor,
                formatStyles[index].bgColor,
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
