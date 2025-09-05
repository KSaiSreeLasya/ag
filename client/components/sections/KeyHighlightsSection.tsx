import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import SolarBackground from "@/components/SolarBackground";
import { Zap, Users, Award, TrendingUp } from "lucide-react";

export default function KeyHighlightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Zap,
      value: 250,
      suffix: "MW",
      label: "Installed Capacity",
      color: "text-solar-600",
      bgColor: "bg-solar-500/10",
    },
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Clients Served",
      color: "text-sky-600",
      bgColor: "bg-sky-500/10",
    },
    {
      icon: TrendingUp,
      value: 15,
      suffix: "+",
      label: "Years of Experience",
      color: "text-energy-600",
      bgColor: "bg-energy-500/10",
    },
    {
      icon: Award,
      value: 12,
      suffix: "+",
      label: "Locations Covered",
      color: "text-solar-700",
      bgColor: "bg-solar-600/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-solar-50 to-energy-50 relative overflow-hidden"
    >
      <SolarBackground className="opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-solar-500/10 text-solar-700 rounded-full text-sm font-medium mb-6">
            Our Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From Rooftops to Utility-Scale Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Axiso Green is your renewable partner for growth, delivering
            comprehensive energy solutions across all scales.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 text-center group-hover:scale-105">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      bounce: 0.4,
                    }}
                    className={`w-16 h-16 ${highlight.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <IconComponent className={`h-8 w-8 ${highlight.color}`} />
                  </motion.div>

                  {/* Counter */}
                  <div className="mb-2">
                    <AnimatedCounter
                      from={0}
                      to={highlight.value}
                      suffix={highlight.suffix}
                      duration={2}
                      className="text-4xl md:text-5xl font-bold text-foreground"
                    />
                  </div>

                  {/* Label */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="text-muted-foreground font-medium"
                  >
                    {highlight.label}
                  </motion.p>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to be part of our success story?
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-solar-500 to-energy-500 text-white px-8 py-3 rounded-full font-semibold hover:from-solar-600 hover:to-energy-600 transition-all shadow-lg"
          >
            Start Your Solar Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
