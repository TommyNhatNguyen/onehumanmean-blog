import TabsAdmin from "./components/TabsAdmin";
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <Container tailStyles="min-h-lvh relative flex items-start gap-[16px] bg-blue-100 pt-[24px] h-full py-[32px]">
      <TabsAdmin />
      <Outlet />
    </Container>
  );
};

export default AdminPage;
