import { Outlet } from "react-router-dom";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

const Layout = () => {
  // const location = useLocation();
  // const isDashboard = location.pathname === "/";
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex relative h-full">
        <main
          className={`main-content max-h-full overflow-y-auto grow overflow-x-hidden`}
        >
          <Header />
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
