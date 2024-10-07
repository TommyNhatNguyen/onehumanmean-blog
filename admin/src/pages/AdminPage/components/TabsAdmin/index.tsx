import { PATH } from "../../../../constant/path";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { GoArchive } from "react-icons/go";
import TabsComponent from "./TabsComponent";
import { RiFileList3Line, RiLockPasswordLine } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { PiUserList } from "react-icons/pi";
import { BiBell } from "react-icons/bi";

const ADMIN_TABS = [
  {
    tabTitle: "Blog",
    icon: <RiFileList3Line className="h-full w-full" />,
    tabs: [
      {
        name: "New blog",
        link: PATH.ADMIN.CREATE_BLOG,
        icon: <HiOutlineDocumentPlus className="h-full w-full" />,
      },
      {
        name: "All blogs",
        link: PATH.ADMIN.BLOGS,
        icon: <GoArchive className="h-full w-full" />,
      },
    ],
  },
  {
    tabTitle: "Project",
    icon: <BsCardChecklist className="h-full w-full" />,
    tabs: [
      {
        name: "New project",
        link: PATH.ADMIN.CREATE_PROJECT,
        icon: <HiOutlineDocumentPlus className="h-full w-full" />,
      },
      {
        name: "All projects",
        link: PATH.ADMIN.PROJECTS,
        icon: <GoArchive className="h-full w-full" />,
      },
    ],
  },
  {
    tabTitle: "Setting",
    icon: <FiSettings className="h-full w-full" />,
    tabs: [
      {
        name: "Notification",
        link: PATH.ADMIN.NOTIFICATION.INDEX,
        icon: <BiBell className="h-full w-full" />,
      },
      {
        name: "Profile",
        link: PATH.ADMIN.PROFILE,
        icon: <PiUserList className="h-full w-full" />,
      },
      {
        name: "Change password",
        link: PATH.ADMIN.CHANGE_PASSWORD,
        icon: <RiLockPasswordLine className="h-full w-full" />,
      },
    ],
  },
];

const TabsAdmin = () => {
  return (
    <aside className="sticky left-0 top-0 h-fit flex-shrink-0">
      <div className="flex flex-col gap-[8px]">
        {ADMIN_TABS.map((item, index) => {
          const { tabs, tabTitle, icon } = item;
          return (
            <TabsComponent
              key={tabTitle + index}
              tabTitle={tabTitle}
              icon={icon}
            >
              {tabs.map((tab, index) => {
                const { link, name, icon } = tab;
                return (
                  <TabsComponent.Item
                    key={name + index}
                    link={link}
                    name={name}
                    icon={icon}
                  />
                );
              })}
            </TabsComponent>
          );
        })}
      </div>
    </aside>
  );
};

export default TabsAdmin;
