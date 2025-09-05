import * as React from "react";
import * as Router from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import MobileNavigation from "@/components/MobileNavigation";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const location = Router.useLocation();

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
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-md border border-solar-200 rounded-xl shadow-lg py-2"
                      >
                        {item.dropdown.map((dropdownItem, index) => (
                          <motion.div
                            key={dropdownItem.path}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Router.Link
                              to={dropdownItem.path}
                              className="block px-4 py-2 text-sm text-foreground hover:text-solar-700 hover:bg-solar-50 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropdownItem.name}
                            </Router.Link>
                          </motion.div>
                        ))}
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
