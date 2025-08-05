import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const location = useLocation();

  const hideFooter = location.pathname === "/3d";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default Layout;
