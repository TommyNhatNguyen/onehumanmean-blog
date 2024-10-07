export const PATH = {
  HOME: "/",
  ADMIN: {
    INDEX: "/admin",
    PROFILE: "/admin/profile",
    NOTIFICATION: {
      INDEX: "/admin/notification",
      DETAIL: "/admin/notification/:questionId",
    },
    CREATE_BLOG: "/admin/create-blog",
    CREATE_BLOG_BY_ID: "/admin/create-blog/:blogSlug",
    BLOGS: "/admin/blogs",
    CREATE_PROJECT: "/admin/create-project",
    CREATE_PROJECT_BY_ID: "/admin/create-project/:projectSlug",
    PROJECTS: "/admin/projects",
    CHANGE_PASSWORD: "/admin/change-password",
    LOGIN: "/admin/login",
  },
};
