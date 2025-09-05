import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Sun,
  Zap,
  Leaf,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ParticleSystem from "@/components/ParticleSystem";

export default function SlidingHeroSection() {
  const ref = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [
    {
      id: 1,
      title: "Harness the Power of the Sun",
      subtitle: "Revolutionary Solar Solutions",
      description:
        "Transform your energy future with cutting-edge solar panel technology that maximizes efficiency and minimizes environmental impact.",
      icon: Sun,
      stats: { power: "25MW+", efficiency: "98.5%", savings: "$2.4M" },
      cta: "Explore Solar",
      gradient: "from-solar-400 via-energy-500 to-solar-600",
    },
    {
      id: 2,
      title: "Smart Energy Management",
      subtitle: "AI-Powered Optimization",
      description:
        "Intelligent energy systems that learn, adapt, and optimize your power consumption for maximum efficiency and cost savings.",
      icon: Zap,
      stats: { automation: "100%", reduction: "35%", uptime: "99.9%" },
      cta: "Smart Solutions",
      gradient: "from-sky-400 via-solar-500 to-energy-600",
    },
    {
      id: 3,
      title: "Sustainable Future",
      subtitle: "Clean Energy Leadership",
      description:
        "Leading the transition to renewable energy with innovative solutions that protect our planet for future generations.",
      icon: Leaf,
      stats: { co2saved: "500K tons", projects: "950+", impact: "Global" },
      cta: "Join Mission",
      gradient: "from-energy-400 via-sky-500 to-solar-600",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];
  const CurrentIcon = currentSlideData.icon;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-solar-50 via-energy-50 to-sky-50"
    >
      {/* Solar-themed Particle System */}
      <ParticleSystem
        particleCount={100}
        colors={["#FFD700", "#FFA500", "#FF8C00", "#4169E1", "#87CEEB"]}
        className="opacity-40"
      />

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Sun */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-solar-400 to-energy-500 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Solar Rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-24 right-24 w-1 h-20 bg-gradient-to-b from-solar-400 to-transparent origin-bottom"
            style={{
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 50, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Badge with Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-solar-100 to-energy-100 backdrop-blur-sm text-solar-700 rounded-full text-sm font-medium mb-8 border border-solar-200"
                >
                  <CurrentIcon className="w-5 h-5 mr-3" />
                  {currentSlideData.subtitle}
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
                >
                  <motion.span
                    className={`block bg-gradient-to-r ${currentSlideData.gradient} bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "300% 300%" }}
                  >
                    {currentSlideData.title}
                  </motion.span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed"
                >
                  {currentSlideData.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-start mb-12"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255, 165, 0, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className={`bg-gradient-to-r ${currentSlideData.gradient} hover:shadow-2xl group text-lg px-8 py-4 h-auto text-white border-0`}
                    >
                      {currentSlideData.cta}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="group border-2 border-solar-300 hover:border-solar-500 text-lg px-8 py-4 h-auto backdrop-blur-sm hover:bg-solar-50"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-solar-200"
                >
                  {Object.entries(currentSlideData.stats).map(
                    ([key, value], index) => (
                      <motion.div
                        key={key}
                        className="text-center lg:text-left group cursor-pointer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-solar-600 to-energy-600 bg-clip-text text-transparent"
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

          {/* Right content - Sliding Images */}
          <motion.div
            className="relative h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  {/* Image with Solar Pattern */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${currentSlideData.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <CurrentIcon className="w-32 h-32 text-white/30" />
                      </motion.div>
                    </div>

                    {/* Solar Panel Grid Overlay */}
                    <div
                      className={
                        'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Crect x="10" y="10" width="35" height="20" rx="2"/%3E%3Crect x="55" y="10" width="35" height="20" rx="2"/%3E%3Crect x="10" y="40" width="35" height="20" rx="2"/%3E%3Crect x="55" y="40" width="35" height="20" rx="2"/%3E%3Crect x="10" y="70" width="35" height="20" rx="2"/%3E%3Crect x="55" y="70" width="35" height="20" rx="2"/%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
                      }
                    />

                    {/* Caption Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white"
                    >
                      <h3 className="text-2xl font-bold mb-2">
                        {currentSlideData.subtitle}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {currentSlideData.description.substring(0, 120)}...
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              {/* Previous Button */}
              <motion.button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </motion.button>

              {/* Slide Indicators */}
              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
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

              {/* Next Button */}
              <motion.button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </motion.button>
            </div>

            {/* Floating Elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-20 h-20 rounded-2xl shadow-lg ${
                  i === 0
                    ? "bg-solar-400/20 -top-6 -right-6"
                    : i === 1
                      ? "bg-energy-400/20 -bottom-6 -left-6"
                      : "bg-sky-400/20 top-1/2 -left-12"
                }`}
                animate={{
                  y: [0, -15, 0],
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-solar-500/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-solar-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
