import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sun, Wind, Battery, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function AnimatedSolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const solutions = [
    {
      icon: Sun,
      title: "Solar Energy Solutions",
      description:
        "Residential, Commercial & Hybrid Solar installations for all your energy needs.",
      features: [
        "Residential Rooftop Solar",
        "Commercial & Industrial Solar",
        "Hybrid Solar Systems",
      ],
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Wind,
      title: "Wind Energy Services",
      description:
        "Comprehensive EPC, Hybrid, O&M, and Engineering services for wind projects.",
      features: [
        "Wind EPC Solutions",
        "Hybrid Solar-Wind Systems",
        "O&M & Engineering",
      ],
      color: "bg-blue-500",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Advisory & Asset Management",
      description:
        "Capital structuring, Procurement, and PMC services for optimal project outcomes.",
      features: [
        "Capital Structuring",
        "Procurement Services",
        "Project Management Consultancy",
      ],
      color: "bg-green-500",
      gradient: "from-green-400 to-emerald-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
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
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.8,
      },
    },
  };

  return (
    <section ref={ref} id="solutions" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
          >
            Our Solutions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Comprehensive Green Energy Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            From solar panels to smart grid integration, we provide end-to-end
            renewable energy solutions tailored to your specific needs and
            goals.
          </motion.p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div key={index} variants={cardVariants} className="group">
                <motion.div
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="h-full"
                >
                  <Card className="h-full border-green-100 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        variants={iconVariants}
                        className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 10 }
                        }
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <CardTitle className="text-xl font-semibold mb-2">
                          {solution.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {solution.description}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="space-y-2 mb-6"
                      >
                        {solution.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={
                              isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -10 }
                            }
                            transition={{
                              duration: 0.3,
                              delay: 1 + index * 0.1 + idx * 0.1,
                            }}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 10 }
                        }
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 1.5 }}
          className="bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Ready to Switch to Clean Energy?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Get a free consultation and custom energy assessment. Our experts
            will design the perfect renewable energy solution for your property.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="secondary" className="group">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Download Brochure
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
