import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
}

export default function ParticleSystem({
  particleCount = 50,
  colors = ["#22c55e", "#34d399", "#10b981", "#059669"],
  className = "",
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Memoize colors to prevent unnecessary re-renders
  const memoizedColors = useMemo(() => colors, [JSON.stringify(colors)]);

  useEffect(() => {
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color:
          memoizedColors[Math.floor(Math.random() * memoizedColors.length)],
      });
    }

    setParticles(newParticles);
  }, [particleCount, memoizedColors]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            x: [`${particle.x}%`, `${particle.x + particle.speedX * 100}%`],
            y: [`${particle.y}%`, `${particle.y + particle.speedY * 100}%`],
            scale: [1, 1.5, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 0.5,
              particle.opacity,
            ],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
