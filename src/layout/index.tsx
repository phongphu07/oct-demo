import { Outlet } from "react-router-dom";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
