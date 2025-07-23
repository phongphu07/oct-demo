import { Outlet } from "react-router-dom";

const Layout = () => {
  // const location = useLocation();
  // const isDashboard = location.pathname === "/";
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex relative h-full">
        <main
          className={`main-content max-h-full overflow-y-auto grow overflow-x-hidden`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
