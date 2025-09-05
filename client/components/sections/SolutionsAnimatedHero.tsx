import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sun, Wind, Battery, Zap } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ParticleSystem from "@/components/ParticleSystem";
import { TouchButton, SwipeableCard } from "@/components/TouchGestures";

export default function SolutionsAnimatedHero() {
  const ref = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const solutions = [
    {
      id: 1,
      title: "Solar Energy Systems",
      subtitle: "Harness Unlimited Solar Power",
      description:
        "Advanced photovoltaic solutions for residential, commercial, and utility-scale projects with maximum efficiency and reliability.",
      icon: Sun,
      stats: { capacity: "500MW+", efficiency: "22.5%", warranty: "25 Years" },
      gradient: "from-solar-400 via-yellow-500 to-orange-500",
      features: [
        "Monocrystalline Panels",
        "Smart Inverters",
        "Performance Monitoring",
        "Grid Integration",
      ],
    },
    {
      id: 2,
      title: "Wind Energy Solutions",
      subtitle: "Capture Wind Power Efficiently",
      description:
        "High-performance wind turbines and energy management systems designed for optimal power generation in various wind conditions.",
      icon: Wind,
      stats: { capacity: "250MW+", efficiency: "95%", turbines: "150+" },
      gradient: "from-sky-400 via-blue-500 to-cyan-500",
      features: [
        "Advanced Turbines",
        "Wind Assessment",
        "Grid Connection",
        "Maintenance Support",
      ],
    },
    {
      id: 3,
      title: "Energy Storage Systems",
      subtitle: "Store Energy for the Future",
      description:
        "Cutting-edge battery storage solutions that ensure reliable power supply and optimal energy management for any application.",
      icon: Battery,
      stats: { capacity: "100MWh+", cycles: "6000+", efficiency: "95%" },
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      features: [
        "Lithium-Ion Technology",
        "Smart Management",
        "Scalable Design",
        "Safety Systems",
      ],
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % solutions.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [solutions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % solutions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  const currentSolution = solutions[currentSlide];
  const CurrentIcon = currentSolution.icon;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-solar-50 via-energy-50 to-sky-50"
    >
      {/* Solar-themed Particle System */}
      <ParticleSystem
        particleCount={120}
        colors={["#FFD700", "#FFA500", "#FF8C00", "#4169E1", "#00CED1"]}
        className="opacity-30"
      />

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Solution Icons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Dynamic background based on current solution */}
            {currentSlide === 0 && (
              <>
                {/* Solar Rays */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-20 right-20 w-1 h-24 bg-gradient-to-b from-solar-400/40 to-transparent origin-bottom"
                    style={{
                      transform: `rotate(${i * 30}deg)`,
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleY: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </>
            )}

            {currentSlide === 1 && (
              <>
                {/* Wind Turbines */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${
                      i === 0
                        ? "top-32 right-32"
                        : i === 1
                          ? "top-40 right-20"
                          : "top-28 right-44"
                    }`}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  >
                    <Wind className="w-12 h-12 text-sky-400/40" />
                  </motion.div>
                ))}
              </>
            )}

            {currentSlide === 2 && (
              <>
                {/* Battery Charge Animation */}
                <motion.div
                  className="absolute top-32 right-32"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Battery className="w-16 h-16 text-green-400/40" />
                </motion.div>

                {/* Energy Flow */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-green-400/60"
                    style={{
                      top: `${30 + i * 10}%`,
                      right: `${25 + i * 5}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 30, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Badge with Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-solar-100 to-energy-100 backdrop-blur-sm text-solar-700 rounded-full text-sm font-medium mb-6 lg:mb-8 border border-solar-200"
                >
                  <CurrentIcon className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                  {currentSolution.subtitle}
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 lg:mb-8 leading-tight"
                >
                  <motion.span
                    className={`block bg-gradient-to-r ${currentSolution.gradient} bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "300% 300%" }}
                  >
                    {currentSolution.title}
                  </motion.span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-12 max-w-2xl lg:max-w-3xl leading-relaxed"
                >
                  {currentSolution.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-2 gap-3 lg:gap-4 mb-8 lg:mb-12"
                >
                  {currentSolution.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-2 text-sm lg:text-base"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <Zap className="w-4 h-4 text-solar-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons - Mobile Optimized */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start mb-8 lg:mb-12"
                >
                  <TouchButton
                    className={`bg-gradient-to-r ${currentSolution.gradient} text-white`}
                    size="lg"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </TouchButton>

                  <TouchButton
                    variant="outline"
                    size="lg"
                    className="border-solar-300 hover:border-solar-500"
                  >
                    <Play className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    View Demo
                  </TouchButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-solar-200"
                >
                  {Object.entries(currentSolution.stats).map(
                    ([key, value], index) => (
                      <motion.div
                        key={key}
                        className="text-center lg:text-left group cursor-pointer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${currentSolution.gradient} bg-clip-text text-transparent`}
                          animate={{
                            backgroundPosition: ["0%", "100%", "0%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        >
                          {value}
                        </motion.div>
                        <div className="text-sm text-muted-foreground capitalize group-hover:text-foreground transition-colors">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right content - Swipeable Solution Visual */}
          <motion.div
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <SwipeableCard
              onSwipeLeft={nextSlide}
              onSwipeRight={prevSlide}
              className="w-full h-full"
            >
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    {/* Solution Visual */}
                    <div
                      className={`w-full h-full bg-gradient-to-br ${currentSolution.gradient} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            rotate: currentSlide === 0 ? [0, 360] : 0,
                            scale: currentSlide === 2 ? [1, 1.1, 1] : 1,
                            y: currentSlide === 1 ? [0, -10, 0] : 0,
                          }}
                          transition={{
                            duration: currentSlide === 0 ? 20 : 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <CurrentIcon className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-white/30" />
                        </motion.div>
                      </div>

                      {/* Solution Pattern */}
                      <div
                        className={
                          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Crect x="10" y="10" width="25" height="15" rx="2"/%3E%3Crect x="45" y="10" width="25" height="15" rx="2"/%3E%3Crect x="10" y="35" width="25" height="15" rx="2"/%3E%3Crect x="45" y="35" width="25" height="15" rx="2"/%3E%3Crect x="10" y="60" width="25" height="15" rx="2"/%3E%3Crect x="45" y="60" width="25" height="15" rx="2"/%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
                        }
                      />

                      {/* Caption Overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 lg:p-8 text-white"
                      >
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                          {currentSolution.subtitle}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                          {currentSolution.description.substring(0, 100)}...
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SwipeableCard>

            {/* Navigation Dots - Touch Friendly */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              {solutions.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-solar-500 w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Floating Mobile-Friendly Elements */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl shadow-lg ${
                  i === 0
                    ? "bg-solar-400/20 -top-3 -right-3 lg:-top-6 lg:-right-6"
                    : "bg-energy-400/20 -bottom-3 -left-3 lg:-bottom-6 lg:-left-6"
                }`}
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 180, 360],
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                style={{ transformStyle: "preserve-3d" }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile-Friendly Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-solar-500/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 lg:h-3 bg-solar-500 rounded-full mt-1 lg:mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
