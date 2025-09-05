import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface TouchGesturesProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  className?: string;
  enableHorizontalSwipe?: boolean;
  enableVerticalSwipe?: boolean;
  swipeThreshold?: number;
}

export default function TouchGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = "",
  enableHorizontalSwipe = true,
  enableVerticalSwipe = true,
  swipeThreshold = 50,
}: TouchGesturesProps) {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset } = info;

    // Horizontal swipes
    if (enableHorizontalSwipe && Math.abs(offset.x) > swipeThreshold) {
      if (offset.x > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (offset.x < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    // Vertical swipes
    if (enableVerticalSwipe && Math.abs(offset.y) > swipeThreshold) {
      if (offset.y > 0 && onSwipeDown) {
        onSwipeDown();
      } else if (offset.y < 0 && onSwipeUp) {
        onSwipeUp();
      }
    }

    // Reset position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={constraintsRef}
      className={className}
      drag
      dragConstraints={{ top: -20, left: -20, right: 20, bottom: 20 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        rotateX: enableVerticalSwipe ? rotateX : 0,
        rotateY: enableHorizontalSwipe ? rotateY : 0,
      }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

// Hook for detecting mobile device
export const useIsMobile = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return isMobile;
};

// Touch-friendly button component
interface TouchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function TouchButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
}: TouchButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-solar-500 to-energy-500 text-white",
    secondary: "bg-solar-100 text-solar-700",
    outline: "border-2 border-solar-300 text-solar-700 bg-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-xl font-medium transition-all duration-200 
        shadow-lg hover:shadow-xl active:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed
        touch-manipulation select-none
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
    >
      {children}
    </motion.button>
  );
}

// Swipeable card component
interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = "",
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset } = info;

    if (offset.x > 100 && onSwipeRight) {
      onSwipeRight();
    } else if (offset.x < -100 && onSwipeLeft) {
      onSwipeLeft();
    }

    x.set(0);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -150, right: 150 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, scale }}
      whileTap={{ cursor: "grabbing" }}
      className={`cursor-grab active:cursor-grabbing touch-manipulation ${className}`}
    >
      {children}
    </motion.div>
  );
}
