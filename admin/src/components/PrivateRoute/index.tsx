import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import tokenMethod from "../../utils/tokenMethod";
import { PATH } from "../../constant/path";
import { message } from "antd";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!!!tokenMethod.get()) {
      navigate(PATH.ADMIN.LOGIN);
      message.warning("Please login to use dashboard");
    }
  }, [pathname]);
  return <Outlet />;
};

export default PrivateRoute;
