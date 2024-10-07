import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { PATH } from "./constant/path";
import MainContextProvider from "./contexts/MainContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import PageLoading from "./components/PageLoading";
import BlogPageShowAll from "./pages/BlogPageShowAll";
import ProjectPageShowAll from "./pages/ProjectPageShowAll copy";
const queryClient = new QueryClient();
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path={PATH.HOME} element={<MainLayout />}>
                <Route index path={PATH.HOME} element={<BlogPage />} />
                <Route path={PATH.BLOG.INDEX} element={<BlogPage />} />
                <Route path={PATH.BLOG.DETAIL} element={<BlogDetailPage />} />
                <Route path={PATH.BLOG.SHOW} element={<BlogPageShowAll />} />
                <Route path={PATH.PROJECT.INDEX} element={<ProjectPage />} />
                <Route
                  path={PATH.PROJECT.DETAIL}
                  element={<ProjectDetailPage />}
                />
                <Route
                  path={PATH.PROJECT.SHOW}
                  element={<ProjectPageShowAll />}
                />
                <Route path={PATH.CONTACT} element={<ContactPage />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
