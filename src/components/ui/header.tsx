import { BookOpen, Home, Info } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";

export default function Header() {
  return (
    <header className="w-full border-b bg-background shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
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
                href="/docs"
                className="flex items-center text-sm font-medium hover:text-primary transition-colors"
              >
                <BookOpen className="mr-1 h-4 w-4" /> Docs
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href="/about"
                className="flex items-center text-sm font-medium hover:text-primary transition-colors"
              >
                <Info className="mr-1 h-4 w-4" /> About
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
