import * as React from "react";
import * as React from "react";
import * as Router from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import MobileNavigation from "@/components/MobileNavigation";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [openSub, setOpenSub] = React.useState<string | null>(null);
  const location = Router.useLocation();
  const navigate = Router.useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Solutions",
      path: "/solutions",
      dropdown: [
        { name: "Solar", path: "/solutions/solar", sub: [
          { name: "Residential (B2C)", path: "/solutions/b2c" },
          { name: "Commercial (B2B)", path: "/solutions/b2b" },
          { name: "Government (B2G)", path: "/solutions/b2g" },
        ] },
        { name: "Wind", path: "/solutions/wind" },
        { name: "Energy Storage", path: "/solutions/storage" },
        { name: "EV Stations", path: "/solutions/ev-stations" },
      ],
    },
    {
      name: "Services",
      path: "#",
      dropdown: [
        { name: "Advisory", path: "/advisory" },
        { name: "Procurement", path: "/procurement" },
        { name: "Digital Solutions", path: "/digital-solutions" },
      ],
    },
    { name: "Industries", path: "/sectors" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "#") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white/95 backdrop-blur-md border-b border-solar-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Router.Link to="/" className="flex items-center space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59bf3e928fc9473a97d5e87470c824bb%2F661e86d7a74f464c89095a37afa49cbd?format=webp&width=800"
                alt="AXISO Green Energy logo"
                className="h-10 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
              <span className="sr-only">AXISO Green Energy</span>
            </Router.Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <button
                      onClick={() => {
                        if (item.path && item.path !== "#") navigate(item.path);
                      }}
                      aria-haspopup={!!item.dropdown}
                      aria-expanded={activeDropdown === item.name}
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-solar-50",
                        "text-foreground hover:text-solar-700",
                      )}
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === item.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                  ) : (
                    <Router.Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-solar-50 block",
                        isActive(item.path)
                          ? "text-solar-700 bg-solar-100"
                          : "text-foreground hover:text-solar-700",
                      )}
                    >
                      {item.name}
                    </Router.Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 rounded-xl shadow-lg py-2 flex"
                        style={{ minWidth: 220 }}
                      >
                        {/* Left column: main dropdown items */}
                        <div className="w-56 p-1">
                          {item.dropdown.map((dropdownItem, index) => (
                            <div key={dropdownItem.path} className="px-2 py-1">
                              <div className="flex items-center justify-between">
                                <Router.Link
                                  to={dropdownItem.path}
                                  className="text-sm text-foreground hover:text-solar-700 transition-colors px-2 py-1"
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setOpenSub(null);
                                  }}
                                >
                                  {dropdownItem.name}
                                </Router.Link>

                                {dropdownItem.sub && (
                                  <button
                                    type="button"
                                    aria-label={openSub === dropdownItem.name ? "Collapse" : "Expand"}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      setOpenSub(
                                        openSub === dropdownItem.name
                                          ? null
                                          : dropdownItem.name,
                                      );
                                    }}
                                    className="p-1 rounded"
                                  >
                                    <ChevronRight
                                      className={`w-4 h-4 text-muted-foreground transform transition-transform ${
                                        openSub === dropdownItem.name
                                          ? "rotate-90"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Right column: subitems (shown when a dropdown item is selected) */}
                        <div className="w-48 p-2">
                          {item.dropdown.map((d) => {
                            if (!d.sub) return null;
                            if (openSub !== d.name) return null;
                            return (
                              <div key={d.name} className="space-y-1">
                                {d.sub.map((sub) => (
                                  <Router.Link
                                    key={sub.path}
                                    to={sub.path}
                                    className="block text-sm text-foreground px-2 py-2 hover:text-solar-700 rounded-md"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {sub.name}
                                  </Router.Link>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-solar-300 text-solar-700 hover:bg-solar-50 hover:border-solar-400"
                >
                  <Router.Link to="/get-quote">Get Quote</Router.Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-solar-500 to-energy-500 hover:from-solar-600 hover:to-energy-600 text-white shadow-lg"
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
