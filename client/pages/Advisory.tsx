import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Target,
  FileText,
  PieChart,
  Shield,
  Clock,
  Award,
} from "lucide-react";

export default function Advisory() {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isProcessInView = useInView(processRef, {
    once: true,
    margin: "-100px",
  });
  const isServicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });

  const processSteps = [
    {
      id: 1,
      title: "Assessment & Analysis",
      description:
        "Comprehensive evaluation of your current energy infrastructure and needs",
      icon: BarChart3,
      side: "left",
    },
    {
      id: 2,
      title: "Strategic Planning",
      description:
        "Development of customized renewable energy roadmap and implementation strategy",
      icon: Target,
      side: "right",
    },
    {
      id: 3,
      title: "Financial Modeling",
      description:
        "ROI analysis, financing options, and risk assessment for optimal investment decisions",
      icon: PieChart,
      side: "left",
    },
    {
      id: 4,
      title: "Implementation Management",
      description:
        "Project oversight, timeline management, and quality assurance throughout deployment",
      icon: Settings,
      side: "right",
    },
    {
      id: 5,
      title: "Performance Monitoring",
      description:
        "Ongoing asset monitoring, optimization, and maintenance for maximum efficiency",
      icon: TrendingUp,
      side: "left",
    },
    {
      id: 6,
      title: "Continuous Optimization",
      description:
        "Regular performance reviews and system upgrades to ensure long-term success",
      icon: Award,
      side: "right",
    },
  ];

  const services = [
    {
      icon: Users,
      title: "Energy Consulting",
      description:
        "Expert guidance on renewable energy strategy, technology selection, and implementation planning.",
      features: [
        "Technology Assessment",
        "Market Analysis",
        "Regulatory Compliance",
        "Risk Management",
      ],
    },
    {
      icon: BarChart3,
      title: "Asset Management",
      description:
        "Comprehensive management of your renewable energy assets to maximize performance and ROI.",
      features: [
        "Performance Monitoring",
        "Predictive Maintenance",
        "Asset Optimization",
        "Reporting & Analytics",
      ],
    },
    {
      icon: FileText,
      title: "Financial Advisory",
      description:
        "Strategic financial planning and investment guidance for renewable energy projects.",
      features: [
        "Investment Analysis",
        "Financing Solutions",
        "Tax Incentive Optimization",
        "Portfolio Management",
      ],
    },
    {
      icon: Shield,
      title: "Risk Management",
      description:
        "Comprehensive risk assessment and mitigation strategies for energy investments.",
      features: [
        "Risk Assessment",
        "Insurance Solutions",
        "Compliance Management",
        "Contingency Planning",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="py-20 bg-gradient-to-br from-background via-green-50 to-accent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              Advisory & Asset Management
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Strategic Energy
              <span className="text-primary bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                {" "}
                Advisory Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-4xl mx-auto"
            >
              Maximize your renewable energy investments with our comprehensive
              advisory and asset management services designed to optimize
              performance and ensure long-term success.
            </motion.p>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section ref={processRef} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A systematic approach to renewable energy advisory and asset
                management that ensures optimal outcomes for your investment.
              </p>
            </motion.div>

            <div className="relative">
              {/* Central Timeline Line */}
              <motion.div
                initial={{ height: 0 }}
                animate={isProcessInView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-green-600 hidden lg:block"
              />

              <div className="space-y-12">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isLeft = step.side === "left";

                  return (
                    <motion.div
                      key={step.id}
                      initial={{
                        opacity: 0,
                        x: isLeft ? -50 : 50,
                        y: 30,
                      }}
                      animate={
                        isProcessInView
                          ? {
                              opacity: 1,
                              x: 0,
                              y: 0,
                            }
                          : {
                              opacity: 0,
                              x: isLeft ? -50 : 50,
                              y: 30,
                            }
                      }
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                      className={`flex items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:gap-16 gap-8`}
                    >
                      {/* Content */}
                      <div
                        className={`lg:w-1/2 ${isLeft ? "lg:text-right" : "lg:text-left"} text-center`}
                      >
                        <Card className="border-green-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                          <CardHeader>
                            <div
                              className={`flex items-center gap-4 ${isLeft ? "lg:justify-end" : "lg:justify-start"} justify-center`}
                            >
                              <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={
                                  isProcessInView
                                    ? { scale: 1, rotate: 0 }
                                    : { scale: 0, rotate: -90 }
                                }
                                transition={{
                                  duration: 0.6,
                                  delay: 0.9 + index * 0.2,
                                  type: "spring",
                                  bounce: 0.4,
                                }}
                                className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center"
                              >
                                <IconComponent className="h-6 w-6 text-primary" />
                              </motion.div>
                              <div>
                                <div className="text-sm font-medium text-primary">
                                  Step {step.id}
                                </div>
                                <CardTitle className="text-lg">
                                  {step.title}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-muted-foreground">
                              {step.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Timeline Node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isProcessInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 1.1 + index * 0.2,
                          type: "spring",
                          bounce: 0.5,
                        }}
                        className="hidden lg:flex w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg relative z-10"
                      />

                      {/* Spacer for mobile */}
                      <div className="lg:w-1/2 lg:block hidden" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-20 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive advisory and management services to support your
                renewable energy journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isServicesInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 50 }
                    }
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="border-green-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl h-full bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={
                            isServicesInView
                              ? { scale: 1, rotate: 0 }
                              : { scale: 0, rotate: -90 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.1,
                            type: "spring",
                            bounce: 0.4,
                          }}
                          className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        >
                          <IconComponent className="h-8 w-8 text-primary" />
                        </motion.div>
                        <CardTitle className="text-xl font-semibold">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                isServicesInView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -10 }
                              }
                              transition={{
                                duration: 0.3,
                                delay: 0.7 + index * 0.1 + idx * 0.1,
                              }}
                              className="flex items-center text-sm text-muted-foreground"
                            >
                              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={
                isServicesInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.95 }
              }
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 md:p-12 text-center text-white"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isServicesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-2xl md:text-3xl font-bold mb-4"
              >
                Ready to Optimize Your Energy Assets?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isServicesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.3 }}
                className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
              >
                Our expert advisory team is ready to help you maximize the
                performance and ROI of your renewable energy investments.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isServicesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.4 }}
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
                    Schedule Advisory Session
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
                    Download Service Guide
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
