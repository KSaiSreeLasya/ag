import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Building,
  Factory,
  Home,
  GraduationCap,
  Zap,
  Truck,
  Hospital,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Leaf,
  Award,
} from "lucide-react";
import ParticleSystem from "@/components/ParticleSystem";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Sectors() {
  const heroRef = useRef(null);
  const sectorsRef = useRef(null);
  const statsRef = useRef(null);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sectorsInView = useInView(sectorsRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const sectors = [
    {
      title: "Commercial & Office",
      description:
        "Energy-efficient solutions for office buildings, retail spaces, and commercial complexes",
      icon: Building,
      color: "from-blue-500 to-blue-600",
      projects: "150+",
      savings: "25-40%",
      features: [
        "Rooftop Solar",
        "Energy Storage",
        "Smart Building Systems",
        "Grid Integration",
      ],
      caseStudy: "Tech Campus - 2.5MW Solar Installation",
    },
    {
      title: "Industrial & Manufacturing",
      description:
        "Large-scale renewable energy systems for industrial facilities and manufacturing plants",
      icon: Factory,
      color: "from-green-500 to-green-600",
      projects: "80+",
      savings: "30-50%",
      features: [
        "Utility-Scale Solar",
        "Wind Energy",
        "Cogeneration",
        "Peak Load Management",
      ],
      caseStudy: "Steel Plant - 10MW Hybrid System",
    },
    {
      title: "Residential Communities",
      description:
        "Sustainable energy solutions for homes, apartments, and residential developments",
      icon: Home,
      color: "from-purple-500 to-purple-600",
      projects: "500+",
      savings: "20-35%",
      features: [
        "Rooftop Solar",
        "Battery Storage",
        "EV Charging",
        "Net Metering",
      ],
      caseStudy: "Green Community - 100 Home Solar Program",
    },
    {
      title: "Educational Institutions",
      description:
        "Clean energy systems for schools, universities, and educational facilities",
      icon: GraduationCap,
      color: "from-orange-500 to-orange-600",
      projects: "60+",
      savings: "25-45%",
      features: [
        "Campus Solar",
        "Educational Programs",
        "Sustainability Goals",
        "Research Integration",
      ],
      caseStudy: "University Campus - 5MW Solar + Storage",
    },
    {
      title: "Healthcare Facilities",
      description:
        "Reliable renewable energy solutions for hospitals and healthcare centers",
      icon: Hospital,
      color: "from-red-500 to-red-600",
      projects: "40+",
      savings: "20-30%",
      features: [
        "Backup Power",
        "Critical Load Support",
        "Energy Security",
        "Cost Reduction",
      ],
      caseStudy: "Regional Hospital - 3MW Microgrid",
    },
    {
      title: "Retail & Hospitality",
      description:
        "Energy management solutions for retail chains, hotels, and hospitality businesses",
      icon: ShoppingCart,
      color: "from-indigo-500 to-indigo-600",
      projects: "120+",
      savings: "25-40%",
      features: [
        "Distributed Solar",
        "Energy Monitoring",
        "Brand Sustainability",
        "Cost Optimization",
      ],
      caseStudy: "Hotel Chain - 50 Location Solar Program",
    },
  ];

  const stats = [
    {
      icon: Building,
      label: "Sectors Served",
      value: "12+",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Total Projects",
      value: "950+",
      color: "text-green-500",
    },
    {
      icon: DollarSign,
      label: "Cost Savings",
      value: "$50M+",
      color: "text-purple-500",
    },
    {
      icon: Leaf,
      label: "CO2 Reduced",
      value: "500K tons",
      color: "text-orange-500",
    },
  ];

  const benefits = [
    {
      title: "Sector Expertise",
      description:
        "Deep understanding of industry-specific energy needs and regulatory requirements",
      icon: Award,
    },
    {
      title: "Scalable Solutions",
      description:
        "Flexible systems that grow with your business needs and energy requirements",
      icon: TrendingUp,
    },
    {
      title: "Compliance & Standards",
      description:
        "Full compliance with industry standards and environmental regulations",
      icon: CheckCircle,
    },
    {
      title: "Long-term Partnership",
      description:
        "Ongoing support and optimization for maximum performance and savings",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-green-50/30 to-blue-50/30"
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm text-green-600 rounded-full text-sm font-medium mb-8 border border-green-500/20"
            >
              <Building className="w-4 h-4 mr-2" />
              Sectors We Serve
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              <span className="block">Powering</span>
              <motion.span
                className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Every Industry
              </motion.span>
              <span className="block">Forward</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              From small businesses to large enterprises, we deliver tailored
              renewable energy solutions across diverse sectors, ensuring
              optimal performance and maximum returns on investment.
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
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 group text-lg px-8 py-4 h-auto"
                >
                  Explore Solutions
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
                  className="border-2 border-green-500/30 hover:border-green-500 text-lg px-8 py-4 h-auto"
                >
                  View Case Studies
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Circular Floating Icons */}
        <div className="absolute inset-0">
          {sectors.map((sector, index) => {
            const angle = (index / sectors.length) * 2 * Math.PI;
            const radius = 300;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${sector.color} shadow-lg flex items-center justify-center`}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <sector.icon className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Sectors Grid */}
      <section
        ref={sectorsRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              sectorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Industry-Specific Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tailored renewable energy solutions designed for your industry's
              unique requirements
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={
                  sectorsInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 30, rotateX: -10 }
                }
                transition={{ duration: 0.8, delay: 0.1 * index }}
                onHoverStart={() => setHoveredSector(index)}
                onHoverEnd={() => setHoveredSector(null)}
                whileHover={{
                  y: -15,
                  rotateX: 10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  scale: 1.02,
                }}
                className="group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-none overflow-hidden relative">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />

                  <CardHeader className="relative z-10 pb-4">
                    <motion.div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${sector.color} flex items-center justify-center mb-6 shadow-lg mx-auto`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <sector.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <CardTitle className="text-xl text-center group-hover:text-primary transition-colors mb-4">
                      {sector.title}
                    </CardTitle>

                    <p className="text-muted-foreground text-center text-sm leading-relaxed">
                      {sector.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50/80 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {sector.projects}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {sector.savings}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Savings
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {sector.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            sectorsInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.1 + featureIndex * 0.05,
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Case Study */}
                    <motion.div
                      className="p-3 bg-primary/5 rounded-lg border border-primary/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        hoveredSector === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0.7, y: 5 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-xs font-medium text-primary mb-1">
                        Case Study
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sector.caseStudy}
                      </div>
                    </motion.div>
                  </CardContent>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Impact Across Industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Measurable results and sustainable outcomes across all sectors we
              serve
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="text-center group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-none">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-primary to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.2, rotateY: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>

                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {stat.label}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.5 + 0.1 * index }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                }}
                className="text-center group"
              >
                <Card className="h-full bg-gradient-to-br from-primary/5 to-green-500/5 border border-primary/10">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>

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
