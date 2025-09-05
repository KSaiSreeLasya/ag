import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircle, Phone, Mail, ArrowUp } from "lucide-react";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-100, 100], [30, -30]);
  const rotateY = useTransform(springX, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const actions = [
    {
      icon: MessageCircle,
      label: "Chat",
      color: "bg-solar-500 hover:bg-solar-600",
    },
    { icon: Phone, label: "Call", color: "bg-energy-500 hover:bg-energy-600" },
    { icon: Mail, label: "Email", color: "bg-sky-500 hover:bg-sky-600" },
  ];

  return (
    <>
      {/* Main FAB */}
      <motion.div
        ref={ref}
        className="fixed bottom-6 right-6 z-50"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          className="relative"
        >
          {/* Action Buttons */}
          {actions.map((action, index) => (
            <motion.button
              key={action.label}
              className={`absolute bottom-0 right-0 w-14 h-14 ${action.color} text-white rounded-full shadow-lg flex items-center justify-center transition-colors`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0,
                y: isOpen ? -(index + 1) * 70 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: isOpen ? index * 0.1 : 0,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => console.log(`${action.label} clicked`)}
            >
              <action.icon className="w-6 h-6" />
            </motion.button>
          ))}

          {/* Main Button */}
          <motion.button
            className="w-16 h-16 bg-gradient-to-r from-solar-500 to-energy-500 hover:from-solar-600 hover:to-energy-600 text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0.5 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-6 left-6 w-14 h-14 bg-foreground/80 hover:bg-foreground text-background rounded-full shadow-lg flex items-center justify-center z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </>
  );
}
