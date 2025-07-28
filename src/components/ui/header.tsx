import {
  BookOpen,
  HelpCircle,
  Home,
  Info,
  LogIn,
  PhoneIncoming,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 w-full border-b z-50 backdrop-blur transition-all ${
        scrolled
          ? "bg-background/50 opacity-90 shadow-md"
          : "bg-background/70 opacity-100"
      }`}
    >
      <div className="px-12 mx-auto h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-primary">OCT Image AI</div>

        <NavigationMenu>
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <a
                href="/"
                className="flex items-center text-sm font-medium hover:text-primary transition-colors"
              >
                <Home className="mr-1 h-4 w-4" /> Home
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href="/demo"
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
            <NavigationMenuItem>
              <a
                href="/about"
                className="flex items-center text-sm font-medium hover:text-primary transition-colors"
              >
                <Info className="mr-1 h-4 w-4" /> About Us
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href="/contact-us"
                className="flex items-center text-sm font-medium hover:text-primary transition-colors"
              >
                <PhoneIncoming className="mr-1 h-4 w-4" /> Contact Us
              </a>
            </NavigationMenuItem>
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
      </div>
    </header>
  );
}
