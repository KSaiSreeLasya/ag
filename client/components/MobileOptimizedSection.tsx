import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MobileOptimizedSectionProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  padding?: "sm" | "md" | "lg";
  animationType?: "fadeIn" | "slideUp" | "slideIn" | "scale" | "stagger";
  delay?: number;
}

export default function MobileOptimizedSection({
  children,
  className = "",
  backgroundColor = "bg-background",
  padding = "md",
  animationType = "fadeIn",
  delay = 0,
}: MobileOptimizedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px", // Trigger animation earlier on mobile
  });

  const paddingClasses = {
    sm: "py-8 sm:py-12 px-4 sm:px-6",
    md: "py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8",
    lg: "py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8",
  };

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: isInView ? { opacity: 1 } : { opacity: 0 },
      transition: { duration: 0.8, delay },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: { duration: 0.8, delay, ease: "easeOut" },
    },
    slideIn: {
      initial: { opacity: 0, x: -30 },
      animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
      transition: { duration: 0.8, delay, ease: "easeOut" },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
      transition: { duration: 0.8, delay, ease: "easeOut" },
    },
    stagger: {
      initial: { opacity: 0 },
      animate: isInView ? { opacity: 1 } : { opacity: 0 },
      transition: { duration: 0.8, delay, staggerChildren: 0.1 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className={`${backgroundColor} ${paddingClasses[padding]} ${className}`}
      {...animations[animationType]}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
}

// Mobile-optimized grid component
interface MobileGridProps {
  children: ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function MobileGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  className = "",
}: MobileGridProps) {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6 lg:gap-8",
    lg: "gap-8 lg:gap-12",
  };

  const gridClass = `
    grid 
    grid-cols-${columns.mobile} 
    sm:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop} 
    ${gapClasses[gap]}
  `;

  return <div className={`${gridClass} ${className}`}>{children}</div>;
}

// Mobile-optimized card with touch interactions
interface MobileCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tap?: boolean;
  gradient?: boolean;
}

export function MobileCard({
  children,
  className = "",
  hover = true,
  tap = true,
  gradient = false,
}: MobileCardProps) {
  const baseClasses = `
    bg-white/90 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden
    ${gradient ? "bg-gradient-to-br from-solar-50/50 to-energy-50/50" : ""}
  `;

  const motionProps = {
    ...(hover && {
      whileHover: {
        y: -5,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 },
      },
    }),
    ...(tap && {
      whileTap: { scale: 0.98 },
    }),
  };

  return (
    <motion.div className={`${baseClasses} ${className}`} {...motionProps}>
      {children}
    </motion.div>
  );
}

// Mobile-friendly text animation
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fadeIn" | "slideUp" | "typewriter";
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  animation = "fadeIn",
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: isInView ? { opacity: 1 } : { opacity: 0 },
      transition: { duration, delay },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
      transition: { duration, delay },
    },
    typewriter: {
      initial: { width: 0 },
      animate: isInView ? { width: "100%" } : { width: 0 },
      transition: { duration: duration * 2, delay },
    },
  };

  if (animation === "typewriter") {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div className="whitespace-nowrap" {...animations[animation]}>
          {text}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} {...animations[animation]}>
      {text}
    </motion.div>
  );
}
