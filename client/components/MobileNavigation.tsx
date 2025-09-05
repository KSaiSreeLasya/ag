import * as React from "react";
import * as Router from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  Wrench,
  Users,
  Phone,
  ChevronDown,
  Sun,
  Zap,
  Settings,
  Building,
  FileText,
  Briefcase,
} from "lucide-react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [mobileSubOpen, setMobileSubOpen] = React.useState<string | null>(null);
  const location = Router.useLocation();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Solutions",
      href: "/solutions",
      icon: Sun,
      submenu: [
        {
          title: "Solar",
          href: "/solutions/solar",
          sub: [
            { title: "Residential (B2C)", href: "/solutions/b2c" },
            { title: "Commercial (B2B)", href: "/solutions/b2b" },
            { title: "Government (B2G)", href: "/solutions/b2g" },
          ],
        },
        { title: "Wind", href: "/solutions/wind" },
        { title: "Energy Storage", href: "/solutions/storage" },
        { title: "EV Stations", href: "/solutions/ev-stations" },
      ],
    },
    {
      title: "Services",
      href: "#",
      icon: Wrench,
      submenu: [
        { title: "Advisory", href: "/advisory" },
        { title: "Procurement", href: "/procurement" },
        { title: "Digital Solutions", href: "/digital-solutions" },
      ],
    },
    {
      title: "Industries",
      href: "/sectors",
      icon: Building,
    },
    {
      title: "Resources",
      href: "/resources",
      icon: FileText,
    },
    {
      title: "Careers",
      href: "/careers",
      icon: Briefcase,
    },
    {
      title: "About",
      href: "/about",
      icon: Users,
    },
    {
      title: "Contact",
      href: "/contact",
      icon: Phone,
    },
  ];

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-solar-200">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <Router.Link to="/" className="flex items-center space-x-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F59bf3e928fc9473a97d5e87470c824bb%2F661e86d7a74f464c89095a37afa49cbd?format=webp&width=800"
              alt="AXISO Green Energy logo"
              className="h-8 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="sr-only">AXISO Green Energy</span>
          </Router.Link>

          {/* Hamburger Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 bg-solar-100 rounded-full flex items-center justify-center text-solar-700 hover:bg-solar-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-md z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Navigation Items */}
                <div className="space-y-2 mb-8">
                  {!mobileSubOpen && navigationItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.submenu ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => toggleDropdown(item.title)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-left font-medium transition-all duration-200 ${activeDropdown === item.title ? "bg-solar-100 text-solar-700" : "text-foreground hover:bg-solar-50"}`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                            </div>
                            <motion.div
                              animate={{
                                rotate: activeDropdown === item.title ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {activeDropdown === item.title && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden ml-8 space-y-1"
                              >
                                {item.submenu.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.title}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIndex * 0.05 }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <Router.Link
                                        to={subItem.href}
                                        className="block p-2 text-sm text-muted-foreground hover:text-solar-600 hover:bg-solar-50 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {subItem.title}
                                      </Router.Link>

                                      {/* if subItem has nested sub, show chevron to open nested panel */}
                                      {subItem.sub && (
                                        <button
                                          onClick={(e) => { e.stopPropagation(); setMobileSubOpen(subItem.title); }}
                                          className="p-1 rounded hover:bg-solar-50"
                                        >
                                          <ChevronDown className="w-4 h-4 text-muted-foreground transform rotate-0" />
                                        </button>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Router.Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200 ${isActiveRoute(item.href) ? "bg-gradient-to-r from-solar-100 to-energy-100 text-solar-700" : "text-foreground hover:bg-solar-50"}`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Router.Link>
                      )}
                    </motion.div>
                  ))}

                  {/* If a nested mobile sub is open, render its panel */}
                  {mobileSubOpen && (
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} className="bg-white p-2 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <button onClick={() => setMobileSubOpen(null)} className="p-2 rounded hover:bg-solar-50">Back</button>
                        <div className="font-semibold">{mobileSubOpen}</div>
                      </div>
                      <div className="space-y-1">
                        {navigationItems.flatMap(i => i.submenu || []).find(s => s.title === mobileSubOpen)?.sub?.map(si => (
                          <Router.Link key={si.href} to={si.href} onClick={() => setIsOpen(false)} className="block p-2 rounded hover:bg-solar-50 text-sm text-foreground">{si.title}</Router.Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3 pt-6 border-t border-solar-200"
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-solar-500 to-energy-500 hover:from-solar-600 hover:to-energy-600 text-white"
                  >
                    <Router.Link
                      to="/get-quote"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Quote
                    </Router.Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-solar-300 text-solar-700 hover:bg-solar-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Schedule Call
                  </Button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-4 bg-gradient-to-r from-solar-50 to-energy-50 rounded-xl"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    Need Help?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contact our solar experts
                  </p>
                  <div className="flex items-center gap-2 text-sm text-solar-700">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
