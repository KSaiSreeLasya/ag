import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  Users,
  Leaf,
  TrendingUp,
  Shield,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";

export default function WhyAxisoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Award,
      title: "EPC + Advisory + Tech",
      description:
        "Complete renewable energy solutions under one roof - from design to operation.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Users,
      title: "Independent Engineering",
      description:
        "Unbiased technical expertise and capital structuring for optimal project outcomes.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      title: "Smart Digital Platform",
      description:
        "Advanced O&M monitoring platform for real-time performance optimization.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Shield,
      title: "Procurement-as-a-Service",
      description:
        "Strategic procurement services delivering significant cost savings and risk reduction.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
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
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -90,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.6,
      },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              Why Choose Axiso
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Why Choose Axiso Green Energies
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              We're the only company offering integrated EPC, advisory, and
              technology solutions with independent engineering capabilities and
              smart digital platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              {[
                "Complete EPC, Advisory & Technology solutions",
                "Independent engineering & capital structuring",
                "Smart digital O&M monitoring platform",
                "Procurement-as-a-Service for cost optimization",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      bounce: 0.5,
                    }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Discover Our Story
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Reasons Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg h-full"
                  >
                    <motion.div
                      variants={iconVariants}
                      className={`w-12 h-12 ${reason.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-6 w-6 ${reason.color}`} />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-lg font-semibold text-foreground mb-2"
                    >
                      {reason.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="text-sm text-muted-foreground"
                    >
                      {reason.description}
                    </motion.p>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "99.9%", label: "System Uptime" },
              { number: "500+", label: "Happy Clients" },
              { number: "50MW", label: "Energy Generated" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
