import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Settings, Video, Award, Users, Bot, PieChart, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "../hooks/use-mobile"; // Fixed import name

interface NavLink {
  to: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const navLinks: NavLink[] = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/video/123", label: "Videos", icon: Video },
    { to: "/quiz", label: "Quizzes", icon: Award },
    { to: "/ai-tutor", label: "AI Tutor", icon: Bot },
    { to: "/community", label: "Community", icon: Users },
    { to: "/dashboard", label: "Dashboard", icon: PieChart },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const active = (path: string) => {
    return location.pathname === path ? "bg-secondary" : "";
  };

  const renderNavLink = (link: NavLink) => (
    <Link to={link.to} key={link.to} className={`flex items-center space-x-2 p-2 rounded-md hover:bg-secondary ${active(link.to)}`}>
      <link.icon className="h-4 w-4" />
      <span>{link.label}</span>
    </Link>
  );

  const renderMobileMenu = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden rounded-full">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 pt-6 border-r">
        <ScrollArea className="h-full">
          <div className="flex flex-col space-y-1 px-2">
            {navLinks.map(renderNavLink)}
            <Separator className="my-2" />
            <Button variant="outline" className="w-full justify-start font-normal">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopMenu = () => (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 md:bg-background border-r">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold">LearnAI</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col space-y-1 px-2">
          {navLinks.map(renderNavLink)}
          <Separator className="my-2" />
          <Button variant="outline" className="w-full justify-start font-normal">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {isMobile ? renderMobileMenu() : renderDesktopMenu()}
    </>
  );
};

export default Navigation;
