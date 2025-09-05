import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Wind, Sun } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ParticleSystem from "@/components/ParticleSystem";

export default function Advanced3DHeroSection() {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // 3D transforms based on mouse position
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const energyIcons = [
    { Icon: Sun, color: "text-yellow-500", delay: 0 },
    { Icon: Wind, color: "text-blue-500", delay: 0.2 },
    { Icon: Zap, color: "text-green-500", delay: 0.4 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-green-50/50 to-primary/10"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1000px" }}
    >
      {/* Particle System Background */}
      <ParticleSystem particleCount={80} className="opacity-30" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Morphing Blob 1 */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 opacity-20"
          style={{ y: y1 }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70%",
              "30% 60% 70% 40%",
              "60% 40% 30% 70%",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-green-400/30 blur-3xl" />
        </motion.div>

        {/* Morphing Blob 2 */}
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 opacity-20"
          style={{ y: y2 }}
          animate={{
            borderRadius: [
              "30% 70% 70% 30%",
              "70% 30% 30% 70%",
              "30% 70% 70% 30%",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-primary/30 blur-3xl" />
        </motion.div>

        {/* Floating Energy Icons */}
        {energyIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: `${20 + index * 25}%`,
              right: `${10 + index * 15}%`,
              y: y1,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <item.Icon className={`w-8 h-8 ${item.color}`} />
            </div>
          </motion.div>
        ))}

        {/* 3D Grid Pattern */}
        <motion.div
          style={{
            scale,
            opacity: useTransform(opacity, [0, 1], [0.1, 0.3]),
          }}
          className="absolute inset-0"
        >
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-20'
            }
          />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content with 3D transforms */}
          <motion.div
            className="text-center lg:text-left"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, z: -100 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-green-500/20 backdrop-blur-sm text-primary rounded-full text-sm font-medium mb-8 border border-primary/20"
            >
              <motion.span
                className="w-3 h-3 bg-primary rounded-full mr-3"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Leading Green Energy Innovation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              <motion.span
                className="block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  background:
                    "linear-gradient(45deg, #059669, #22c55e, #10b981, #059669)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Future-Ready
              </motion.span>
              <span className="block text-foreground">Green Energy</span>
              <motion.span
                className="block text-primary"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Solutions
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Experience next-generation renewable energy solutions with
              cutting-edge technology, comprehensive project management, and
              innovative asset optimization strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
                  rotateX: -5,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 group text-lg px-8 py-4 h-auto"
                >
                  Explore Solutions
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  rotateX: -5,
                  rotateY: -5,
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-2 border-primary/30 hover:border-primary text-lg px-8 py-4 h-auto backdrop-blur-sm"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced 3D Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8"
            >
              {[
                {
                  value: "500+",
                  label: "Projects",
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  value: "50MW",
                  label: "Installed",
                  color: "from-blue-400 to-blue-600",
                },
                {
                  value: "15+",
                  label: "Years",
                  color: "from-green-400 to-green-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left group cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    rotateX: -10,
                    rotateY: 5,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - 3D Interactive Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative z-10"
              style={{
                rotateX: useTransform(springY, [-0.5, 0.5], [5, -5]),
                rotateY: useTransform(springX, [-0.5, 0.5], [-5, 5]),
              }}
            >
              {/* 3D Dashboard Card */}
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 opacity-50" />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">
                      Energy Dashboard
                    </h3>
                    <motion.div
                      className="text-3xl font-bold text-primary"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      98.5%
                    </motion.div>
                  </div>

                  {/* Animated Progress Bars */}
                  {[
                    {
                      label: "Solar Efficiency",
                      value: 98.5,
                      color: "bg-yellow-500",
                    },
                    { label: "Wind Output", value: 87.2, color: "bg-blue-500" },
                    {
                      label: "Grid Stability",
                      value: 94.8,
                      color: "bg-green-500",
                    },
                  ].map((metric, index) => (
                    <motion.div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {metric.label}
                        </span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{
                            duration: 2,
                            delay: 0.5 + index * 0.2,
                            ease: "easeOut",
                          }}
                          className={`h-3 rounded-full ${metric.color} relative overflow-hidden`}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1 + index * 0.3,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm text-muted-foreground mb-2">
                      Real-time Savings
                    </div>
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    >
                      $2,847
                    </motion.div>
                    <div className="text-xs text-muted-foreground">
                      This month
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating 3D Elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-20 h-20 rounded-2xl shadow-lg ${
                  i === 0
                    ? "bg-yellow-400/20 -top-6 -right-6"
                    : i === 1
                      ? "bg-blue-400/20 -bottom-6 -left-6"
                      : "bg-green-400/20 top-1/2 -left-12"
                }`}
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 15, 0],
                  rotateY: [0, 15, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                style={{ transformStyle: "preserve-3d" }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
