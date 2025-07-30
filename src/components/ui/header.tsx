import { BookOpen, HelpCircle, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLoginPage = location.pathname === "/login";

  return (
    <header
      className={`fixed top-0 left-0 w-full border-b z-50 backdrop-blur transition-all ${
        scrolled
          ? "bg-background/50 opacity-90 shadow-md"
          : "bg-background/70 opacity-100"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-primary">
          OCT & Angio Image AI Platform
        </a>
        {!isLoginPage && (
          <NavigationMenu>
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <a
                  href="/"
                  className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                >
                  <BookOpen className="mr-1 h-4 w-4" /> Demo
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="/guide"
                  className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                >
                  <HelpCircle className="mr-1 h-4 w-4" /> Guide
                </a>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <a
                  href="/about"
                  className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                >
                  <Info className="mr-1 h-4 w-4" /> About Us
                </a>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center text-sm font-medium px-3 py-1 rounded-md border border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all hover:cursor-pointer"
                >
                  <LogIn className="mr-1 h-4 w-4" /> Login
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </header>
  );
}
