import { Tag } from "antd";
import SelectComponent from "../../../components/SelectComponent";

type ProjectFilterType = {
  categories: string[];
  selectedTags: string[];
  handleSelectedTags: (arg: string[]) => void;
  handleSelectTime: (arg: string) => void;
  filter: any;
};

const ProjectFilter = ({
  categories,
  filter,
  selectedTags,
  handleSelectedTags,
  handleSelectTime,
}: ProjectFilterType) => {
  const _onSelectTag = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    handleSelectedTags(nextSelectedTags);
  };
  const _onSelectTime = (data: any) => {
    handleSelectTime(data);
  };

  return (
    <div>
      <div className="items-center mobile:flex mobile:gap-[8px]">
        <h3 className="font-semibold text-black-200 dark:text-white">
          Categories:
        </h3>
        <div className="mt-[8px] flex items-center gap-[8px] overflow-x-scroll py-[8px] mobile:mt-0 mobile:overflow-auto">
          {categories?.map((tag) => {
            return (
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => _onSelectTag(tag, checked)}
                className="text-semibold m-0 text-tag capitalize dark:text-white"
              >
                {tag}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </div>
      <div className="mt-[8px] items-center mobile:flex mobile:gap-[8px]">
        <h3 className="font-semibold text-black-200 dark:text-white">
          Filter:
        </h3>
        <SelectComponent
          defaultValue={filter.created_at}
          value={filter.created_at}
          onChange={_onSelectTime}
          options={[
            { label: "Latest post", value: "new" },
            { label: "Oldest post", value: "old" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProjectFilter;
