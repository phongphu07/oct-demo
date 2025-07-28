import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted text-muted-foreground py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm">
        <p>© {new Date().getFullYear()} OCT Image AI. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-primary transition-colors">
            <Github className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
