import TabsAdmin from "./components/TabsAdmin";
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import tokenMethod from "../../utils/tokenMethod";
import { useAppDispatch } from "../../store";
import { getAllBlogs } from "../../store/reducers/blogSlices";
import { getAllProjects } from "../../store/reducers/projectSlices";
import { getAllNotifications } from "../../store/reducers/notiSlices";
import { getProfile } from "../../store/reducers/authSlices";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!!tokenMethod.get()?.accessToken) {
      dispatch(getAllBlogs());
      dispatch(getAllProjects());
      dispatch(getAllNotifications());
      dispatch(getProfile());
    }
  }, [tokenMethod.get()?.accessToken]);
  return (
    <Container tailStyles="min-h-lvh relative flex items-start gap-[16px] bg-blue-100 pt-[24px] h-full py-[32px]">
      <TabsAdmin />
      <Outlet />
    </Container>
  );
};

export default AdminPage;
