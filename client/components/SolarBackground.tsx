import { motion } from "framer-motion";
import { Sun, Zap } from "lucide-react";

interface SolarBackgroundProps {
  className?: string;
}

export default function SolarBackground({
  className = "",
}: SolarBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Animated Solar Rays */}
      <div className="absolute top-10 right-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-16 bg-gradient-to-b from-solar-400/30 to-transparent origin-bottom"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleY: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Central Sun */}
        <motion.div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-solar-400 to-energy-500 shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sun className="w-6 h-6 text-white/80 m-1" />
        </motion.div>
      </div>

      {/* Energy Bolts */}
      <motion.div
        className="absolute bottom-20 left-10"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Zap className="w-12 h-12 text-energy-400/40" />
      </motion.div>

      {/* Floating Solar Panels */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-10 bg-gradient-to-br from-sky-600/20 to-sky-800/20 rounded border border-sky-400/30 shadow-lg ${
            i === 0
              ? "top-32 left-20"
              : i === 1
                ? "bottom-32 right-32"
                : "top-1/2 left-1/4"
          }`}
          animate={{
            y: [0, -15, 0],
            rotateX: [0, 10, 0],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Solar Panel Grid */}
          <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
            {[...Array(8)].map((_, cellIndex) => (
              <motion.div
                key={cellIndex}
                className="bg-sky-700/40 rounded-sm"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: cellIndex * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Energy Wave Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-solar-400/20 to-transparent"
          style={{ top: `${20 + i * 15}%` }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing Energy Orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full bg-gradient-to-br from-solar-400/60 to-energy-500/60 ${
            i === 0
              ? "top-1/4 left-1/3"
              : i === 1
                ? "top-3/4 right-1/4"
                : i === 2
                  ? "top-1/2 left-1/6"
                  : "bottom-1/4 right-1/3"
          }`}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
