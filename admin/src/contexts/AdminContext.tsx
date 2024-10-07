import { createContext, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import tokenMethod from "../utils/tokenMethod";
import { useAppDispatch } from "../store";
import { getProfile } from "../store/reducers/authSlices";
import { getAllBlogs } from "../store/reducers/blogSlices";
import { getAllProjects } from "../store/reducers/projectSlices";
import { getAllNotifications } from "../store/reducers/notiSlices";
import { PATH } from "../constant/path";

type AdminContextProps = {};

const AdminContext = createContext<AdminContextProps>({} as AdminContextProps);

export const AdminContextProvider = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!!tokenMethod.get()) {
      dispatch(getProfile());
      dispatch(getAllBlogs());
      dispatch(getAllProjects());
      dispatch(getAllNotifications());
      return;
    }
    navigate(PATH.ADMIN.LOGIN);
  }, [tokenMethod.get()]);

  return (
    <AdminContext.Provider value={{}}>
      <Outlet />
    </AdminContext.Provider>
  );
};
export const useAdminContext = () => useContext(AdminContext);
