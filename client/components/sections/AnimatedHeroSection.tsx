import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-green-50 to-accent"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Sunlight Glow Effect */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Solar Panels */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-32 left-10 w-20 h-12 bg-blue-900/80 rounded-sm shadow-lg"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-36 left-16 w-20 h-12 bg-blue-900/60 rounded-sm shadow-lg"
        />

        {/* Wind Turbines */}
        <motion.div style={{ y: y2 }} className="absolute top-40 right-32">
          {/* Turbine Base */}
          <div className="w-2 h-32 bg-gray-600 mx-auto"></div>
          {/* Rotating Blades */}
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-16"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-0.5 h-8 bg-white absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-0.5 h-8 bg-white absolute -top-8 left-1/2 transform -translate-x-1/2 rotate-120"></div>
              <div className="w-0.5 h-8 bg-white absolute -top-8 left-1/2 transform -translate-x-1/2 rotate-240"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Background pattern */}
        <motion.div style={{ scale }} className="absolute inset-0 opacity-10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.1"%3E%3Ccircle cx="5" cy="5" r="5"/%3E%3Ccircle cx="55" cy="55" r="5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
            }
          ></div>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Leading Green Energy Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Powering the Future with{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-primary bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
              >
                Solar, Wind & Smart Energy
              </motion.span>{" "}
              Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl"
            >
              Axiso Green Energies delivers end-to-end renewable EPC, advisory,
              and asset management services — enabling homes, businesses, and
              investors to achieve a cleaner tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 group"
                >
                  Explore Solar Solutions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="group">
                  Explore Wind & Advisory
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary" size="lg" className="group">
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 pt-8 border-t border-green-100"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  50MW
                </div>
                <div className="text-sm text-muted-foreground">
                  Clean Energy Generated
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  15+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right content - Enhanced Visual elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Solar panel illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Solar Panel System
                    </h3>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                      className="text-2xl font-bold text-primary"
                    >
                      95%
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Energy Efficiency
                      </span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Power Output
                      </span>
                      <span className="font-medium">8.5 kW</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="bg-green-500 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm text-muted-foreground">
                      Monthly Savings
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="text-2xl font-bold text-primary"
                    >
                      $450
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full"></div>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
