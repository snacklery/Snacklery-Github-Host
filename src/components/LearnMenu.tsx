import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { learnNavItems } from "@/lib/content/paths";

const LearnMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>();

  const isActive = location.pathname.startsWith("/learn");

  const open = () => {
    clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };
  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={scheduleClose}>
      <Link
        to="/learn"
        className={`flex items-center gap-1 text-sm font-medium transition-smooth hover:text-primary ${
          isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => setIsOpen(false)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Learn
        <ChevronDown className={`h-3.5 w-3.5 transition-smooth ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px] z-50 animate-fade-in-up">
          <div className="bg-card border border-border rounded-xl shadow-medium p-4 grid grid-cols-2 gap-1">
            {learnNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-3 hover:bg-accent transition-smooth"
              >
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnMenu;
