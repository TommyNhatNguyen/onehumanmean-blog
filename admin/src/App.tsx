import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./constant/path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import PageLoading from "./components/PageLoading";
const queryClient = new QueryClient();
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const CreateBlog = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/CreateBlog"),
);
const BlogsList = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/BlogsList"),
);
const ChangePassword = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/ChangePassword"),
);
const CreateProject = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/CreateProject"),
);
const ProjectsList = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/ProjectsList"),
);
const Profile = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/Profile"),
);
const NotificationList = lazy(
  () => import("./pages/AdminPage/components/DashboardAdmin/NotificationList"),
);
const NotificationDetail = lazy(
  () =>
    import("./pages/AdminPage/components/DashboardAdmin/NotificationDetail"),
);
const AuthModal = lazy(() => import("./components/AuthModal"));

const AdminContextProvider = lazy(() =>
  import("./contexts/AdminContext").then((module) => ({
    default: module.AdminContextProvider,
  })),
);

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route element={<AdminContextProvider />}>
              <Route path={PATH.ADMIN.INDEX} element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                  <Route element={<AdminPage />}>
                    <Route index element={<BlogsList />} />
                    <Route path={PATH.ADMIN.BLOGS} element={<BlogsList />} />
                    <Route
                      path={PATH.ADMIN.CREATE_BLOG}
                      element={<CreateBlog />}
                    />
                    <Route
                      path={PATH.ADMIN.CREATE_BLOG_BY_ID}
                      element={<CreateBlog />}
                    />
                    <Route
                      path={PATH.ADMIN.CREATE_PROJECT}
                      element={<CreateProject />}
                    />
                    <Route
                      path={PATH.ADMIN.CREATE_PROJECT_BY_ID}
                      element={<CreateProject />}
                    />
                    <Route
                      path={PATH.ADMIN.PROJECTS}
                      element={<ProjectsList />}
                    />
                    <Route
                      path={PATH.ADMIN.CHANGE_PASSWORD}
                      element={<ChangePassword />}
                    />
                    <Route path={PATH.ADMIN.PROFILE} element={<Profile />} />
                    <Route
                      path={PATH.ADMIN.NOTIFICATION.INDEX}
                      element={<NotificationList />}
                    />
                    <Route
                      path={PATH.ADMIN.NOTIFICATION.DETAIL}
                      element={<NotificationDetail />}
                    />
                  </Route>
                </Route>
              </Route>
              <Route path={PATH.ADMIN.LOGIN} element={<AuthModal />} />
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
