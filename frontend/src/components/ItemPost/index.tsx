import clsx from "clsx";
import moment from "moment";
import { GoArrowUp, GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import CategoryTagComponent from "../CategoryTagComponent";
import { Empty } from "antd";
import { twMerge } from "tailwind-merge";
import { BlogContentType } from "../../types/blogTypes";
import { ProjectContentType } from "../../types/projectTypes";
import { MouseEvent, useRef } from "react";

type ItemPostType = {
  articleStyleClasses?: string;
  textclamps?: number;
  horizontal?: boolean;
  variant?: "default" | "small" | "hero" | "medium";
  imgClasses?: string;
  basePath: string;
} & (BlogContentType | ProjectContentType);

const ItemPost = ({
  id,
  articleStyleClasses,
  textclamps = 0,
  horizontal = false,
  variant = "default",
  title = "",
  content = "",
  created_at,
  category = "",
  author = "",
  imgClasses = "",
  thumbnail_url,
  basePath = "",
}: ItemPostType) => {
  const itemPath = basePath + `/${id}`;
  const description = content?.match(/<p[^>]*>(.*?)<\/p>/s)?.[1] || "";
  const formatedDate = moment(created_at).format("DD MMM YYYY");
  const categoryList = category?.split(",");
  const CIRCLE_SIZE = 100;
  const imgElement = useRef<HTMLAnchorElement | null>(null);
  const circleELement = useRef<HTMLDivElement | null>(null);
  function mouseEnter() {
    if (imgElement.current && circleELement.current) {
      imgElement.current.style.cursor = "none";
      circleELement.current.animate(
        [
          { transform: "scale(0.5) rotate(-180deg)", cursor: "none" },
          { transform: "scale(1) rotate(45deg)", cursor: "none" },
        ],
        {
          duration: 1900,
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      );
    }
  }
  function mouseLeave() {
    if (imgElement.current && circleELement.current) {
      circleELement.current.animate(
        { transform: "scale(0) rotate(-180deg)" },
        { duration: 300, fill: "forwards" },
      );
    }
  }
  function mouseMove(e: MouseEvent) {
    if (imgElement.current && circleELement.current) {
      let mousePositionX =
        e.clientX -
        imgElement.current.getBoundingClientRect().left -
        CIRCLE_SIZE / 2;
      let mousePositionY =
        e.clientY -
        imgElement.current.getBoundingClientRect().top -
        CIRCLE_SIZE / 2;
      circleELement.current.style.left = mousePositionX + "px";
      circleELement.current.style.top = mousePositionY + "px";
    }
  }
  return (
    <article
      className={twMerge(
        clsx(
          "w-full",
          horizontal
            ? "flex flex-col items-start gap-default tablet:flex-row"
            : "",
          variant === "small" ? "gap-[24px]" : "",
          articleStyleClasses,
          !thumbnail_url && "block h-full",
        ),
      )}
    >
      {thumbnail_url ? (
        <Link
          ref={imgElement}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          onMouseMove={mouseMove}
          to={itemPath}
          className={clsx(
            "group relative flex aspect-hero w-full flex-1 flex-col overflow-hidden rounded-lg shadow-lg dark:shadow-sm dark:shadow-red-100",
            variant === "small" ? "aspect-xxs" : "",
            variant === "default" ? "aspect-sm" : "",
            variant === "medium" ? "aspect-md" : "",
            imgClasses ? imgClasses : "",
          )}
        >
          <img
            src={thumbnail_url || ""}
            alt="image"
            className="object-cover duration-300 group-hover:scale-110"
          />
          <div
            ref={circleELement}
            className={`absolute flex h-[100px] w-[100px] scale-0 items-center justify-center overflow-hidden rounded-full border border-white bg-[rgba(102,112,133,0.5)] shadow-md backdrop-blur-[5px] duration-150`}
          >
            <GoArrowUp className="duration-300" color="white" size={"50%"} />
          </div>
        </Link>
      ) : (
        <Empty
          className="flex h-full flex-col items-center justify-center rounded-lg border-2 p-[16px]"
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description="Currently empty, will be fill in soon!"
        />
      )}

      {id && (
        <div className={clsx("flex-1", horizontal ? "" : "mt-[32px]")}>
          <div>
            <p className="font-semibold text-caption capitalize text-purple-200">
              {`${author}`} {author && " • "} {formatedDate}
            </p>
            {itemPath ? (
              <Link to={itemPath} className="group mt-[12px] block">
                <div className="flex items-start justify-between">
                  <h2
                    className={clsx(
                      "mb-[12px] line-clamp-2 hyphens-auto font-semibold text-h2 text-black-100 duration-150 group-hover:text-gray-100 dark:text-white",
                      variant === "small" ? "mb-[8px] text-h2-sm" : "",
                      textclamps ? `line-clamp-${textclamps}` : "",
                    )}
                  >
                    {title}
                  </h2>
                  <GoArrowUpRight className="h-[24px] w-[24px] flex-shrink-0 fill-black-100 duration-150 group-hover:rotate-45 dark:fill-white" />
                </div>

                <p
                  className={twMerge(
                    `line-clamp-${textclamps}`,
                    "line-clamp-4",
                  )}
                >
                  {description}
                </p>
              </Link>
            ) : (
              <Empty />
            )}
          </div>
          <CategoryTagComponent
            tags={categoryList}
            groupListTailClasses="mt-[24px]"
          />
        </div>
      )}
    </article>
  );
};

export default ItemPost;
