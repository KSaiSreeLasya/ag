import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Target, Heart, Users, Award } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ParticleSystem from "@/components/ParticleSystem";

export default function AboutAnimatedHero() {
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
      title: "Our Vision",
      subtitle: "Leading the Green Revolution",
      description:
        "We envision a world powered entirely by clean, renewable energy where every home, business, and community thrives sustainably.",
      icon: Target,
      stats: { founded: "2008", team: "200+", impact: "Global" },
      gradient: "from-solar-400 via-energy-500 to-sky-500",
      animation: "vision",
    },
    {
      id: 2,
      title: "Our Mission",
      subtitle: "Empowering Sustainable Tomorrow",
      description:
        "To accelerate the world's transition to renewable energy through innovative solutions, expert guidance, and unwavering commitment to excellence.",
      icon: Heart,
      stats: { projects: "950+", capacity: "250MW", savings: "$50M+" },
      gradient: "from-energy-400 via-solar-500 to-sky-600",
      animation: "mission",
    },
    {
      id: 3,
      title: "Our Values",
      subtitle: "Principles That Guide Us",
      description:
        "Innovation, sustainability, integrity, and excellence drive everything we do as we build a cleaner, brighter future for all.",
      icon: Award,
      stats: {
        innovation: "1st",
        sustainability: "100%",
        excellence: "Always",
      },
      gradient: "from-sky-400 via-energy-500 to-solar-600",
      animation: "values",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
        particleCount={80}
        colors={["#FFD700", "#FFA500", "#FF8C00", "#4169E1"]}
        className="opacity-30"
      />

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Background Elements based on current slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {currentSlideData.animation === "vision" && (
              <>
                {/* Target Rings for Vision */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 border-2 border-solar-300/20 rounded-full"
                    style={{
                      width: `${(i + 1) * 100}px`,
                      height: `${(i + 1) * 100}px`,
                      marginLeft: `-${(i + 1) * 50}px`,
                      marginTop: `-${(i + 1) * 50}px`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </>
            )}

            {currentSlideData.animation === "mission" && (
              <>
                {/* Heart Pulse for Mission */}
                <motion.div
                  className="absolute top-20 right-20 w-24 h-24"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-24 h-24 text-energy-400/30 fill-current" />
                </motion.div>
              </>
            )}

            {currentSlideData.animation === "values" && (
              <>
                {/* Award Stars for Values */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-6 h-6"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8,
                    }}
                  >
                    <Award className="w-6 h-6 text-solar-400/40" />
                  </motion.div>
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
                  {currentSlideData.subtitle}
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 lg:mb-8 leading-tight"
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
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-12 max-w-2xl lg:max-w-3xl leading-relaxed"
                >
                  {currentSlideData.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:gap-6 justify-center lg:justify-start mb-8 lg:mb-12"
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
                      className={`bg-gradient-to-r ${currentSlideData.gradient} hover:shadow-2xl group text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 h-auto text-white border-0 w-full sm:w-auto`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-2" />
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
                      className="group border-2 border-solar-300 hover:border-solar-500 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 h-auto backdrop-blur-sm hover:bg-solar-50 w-full sm:w-auto"
                    >
                      <Play className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                      Our Story
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-solar-200"
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
                          className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-solar-600 to-energy-600 bg-clip-text text-transparent"
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

          {/* Right content - Team/Company Visual */}
          <motion.div
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
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
                  {/* Dynamic Visual based on slide */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${currentSlideData.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate:
                            currentSlideData.animation === "vision"
                              ? [0, 360]
                              : 0,
                          scale:
                            currentSlideData.animation === "mission"
                              ? [1, 1.1, 1]
                              : 1,
                          y:
                            currentSlideData.animation === "values"
                              ? [0, -10, 0]
                              : 0,
                        }}
                        transition={{
                          duration:
                            currentSlideData.animation === "vision" ? 20 : 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <CurrentIcon className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-white/30" />
                      </motion.div>
                    </div>

                    {/* Overlay Pattern */}
                    <div
                      className={
                        'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="20"/%3E%3Ccircle cx="10" cy="10" r="8"/%3E%3Ccircle cx="50" cy="50" r="8"/%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
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
                        {currentSlideData.subtitle}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                        {currentSlideData.description.substring(0, 100)}...
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots - Mobile Friendly */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              {slides.map((_, index) => (
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
