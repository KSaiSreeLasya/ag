import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardCheck,
  Users,
  FileText,
  TrendingUp,
  Award,
  Clock,
  Shield,
  Target,
  ArrowRight,
  CheckCircle,
  Building,
  Zap,
} from "lucide-react";
import ParticleSystem from "@/components/ParticleSystem";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Procurement() {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const processSteps = [
    {
      step: "01",
      title: "Project Assessment",
      description:
        "Comprehensive evaluation of technical requirements, budget constraints, and timeline objectives",
      icon: ClipboardCheck,
      color: "from-blue-500 to-blue-600",
    },
    {
      step: "02",
      title: "Vendor Selection",
      description:
        "Strategic sourcing and qualification of certified suppliers based on quality, reliability, and cost-effectiveness",
      icon: Users,
      color: "from-green-500 to-green-600",
    },
    {
      step: "03",
      title: "Contract Management",
      description:
        "Expert negotiation and management of contracts, ensuring optimal terms and risk mitigation",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
    {
      step: "04",
      title: "Quality Assurance",
      description:
        "Rigorous quality control and compliance monitoring throughout the procurement lifecycle",
      icon: Award,
      color: "from-orange-500 to-orange-600",
    },
    {
      step: "05",
      title: "Performance Optimization",
      description:
        "Continuous monitoring and optimization of procurement processes for maximum efficiency",
      icon: TrendingUp,
      color: "from-red-500 to-red-600",
    },
  ];

  const services = [
    {
      title: "Equipment Procurement",
      description:
        "Complete sourcing of solar panels, inverters, mounting systems, and balance of system components",
      icon: Building,
      features: [
        "Global Supplier Network",
        "Quality Certification",
        "Cost Optimization",
        "Warranty Management",
      ],
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      title: "Project Management Consulting",
      description:
        "End-to-end project management services from initial planning to commissioning and handover",
      icon: Target,
      features: [
        "Project Planning",
        "Risk Management",
        "Timeline Optimization",
        "Stakeholder Coordination",
      ],
      gradient: "from-green-500/20 to-green-600/20",
    },
    {
      title: "Technical Advisory",
      description:
        "Expert technical guidance on equipment selection, system design, and performance optimization",
      icon: Zap,
      features: [
        "Technical Specifications",
        "Performance Analysis",
        "Design Optimization",
        "Compliance Review",
      ],
      gradient: "from-purple-500/20 to-purple-600/20",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Faster Delivery",
      value: "30% Reduction",
      description: "in project timelines",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      value: "99.5% Success",
      description: "rate in projects",
    },
    {
      icon: TrendingUp,
      title: "Cost Savings",
      value: "15-25%",
      description: "procurement cost reduction",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      value: "ISO Certified",
      description: "quality processes",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-blue-50/30 to-primary/10"
      >
        <ParticleSystem
          particleCount={60}
          colors={["#FFD700", "#FFA500", "#FF8C00", "#4169E1"]}
          className="opacity-30"
        />

        <motion.div
          style={{ y, opacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-primary/20 backdrop-blur-sm text-blue-600 rounded-full text-sm font-medium mb-8 border border-blue-500/20"
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Procurement & Project Management Consulting
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              <span className="block">Strategic</span>
              <motion.span
                className="block bg-gradient-to-r from-blue-600 via-primary to-green-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Procurement
              </motion.span>
              <span className="block">Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Streamline your renewable energy projects with our comprehensive
              procurement and project management consulting services. From
              vendor selection to quality assurance, we ensure optimal outcomes
              for your investments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/90 group text-lg px-8 py-4 h-auto"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-500/30 hover:border-blue-500 text-lg px-8 py-4 h-auto"
                >
                  View Case Studies
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating 3D Elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-24 h-24 rounded-2xl ${
              i % 2 === 0 ? "bg-blue-400/20" : "bg-primary/20"
            } shadow-lg`}
            style={{
              top: `${20 + i * 20}%`,
              left: i % 2 === 0 ? "10%" : "90%",
              transform: `translateX(${i % 2 === 0 ? "0" : "-100%"})`,
            }}
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 360],
              rotateY: [0, 180],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </section>

      {/* Process Timeline */}
      <section
        ref={processRef}
        className="py-20 bg-gradient-to-br from-blue-50/50 to-primary/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Procurement Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to ensure quality, efficiency, and
              cost-effectiveness in every project
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-primary h-full"
              initial={{ height: 0 }}
              animate={processInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={
                    processInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                  }
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div
                          className={`flex items-center gap-4 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <motion.div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotateY: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <step.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              {step.step}
                            </Badge>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {step.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Step Number */}
                  <motion.div
                    className="relative z-10 w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={processInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 * index }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="text-primary font-bold text-lg">
                      {step.step}
                    </span>
                  </motion.div>

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Core Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions tailored to your renewable energy project
              needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={
                  servicesInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 30, rotateX: -10 }
                }
                transition={{ duration: 0.8, delay: 0.2 * index }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                }}
                className="group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card
                  className={`h-full bg-gradient-to-br ${service.gradient} border-none backdrop-blur-sm overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-white/90 group-hover:bg-white/95 transition-colors" />

                  <CardHeader className="relative z-10">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-primary to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            servicesInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.2 + featureIndex * 0.1,
                          }}
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Our Procurement Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="text-center group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-none">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.2, rotateY: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>

                    <div className="text-2xl font-bold text-primary mb-2">
                      {benefit.value}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionButton />
    </div>
  );
}
