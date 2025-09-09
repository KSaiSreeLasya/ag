import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Monitor,
  Smartphone,
  Cloud,
  BarChart3,
  Zap,
  Settings,
  Shield,
  Gauge,
  TrendingUp,
  Database,
  Wifi,
  Eye,
  ArrowRight,
  CheckCircle,
  Cpu,
  Globe,
  Lock,
} from "lucide-react";
import ParticleSystem from "@/components/ParticleSystem";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function DigitalSolutions() {
  const heroRef = useRef(null);
  const platformsRef = useRef(null);
  const featuresRef = useRef(null);
  const [activePlatform, setActivePlatform] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const platformsInView = useInView(platformsRef, {
    once: true,
    margin: "-100px",
  });
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const platforms = [
    {
      title: "Energy Management System",
      description:
        "Real-time monitoring and control of your renewable energy assets with AI-powered optimization",
      icon: Monitor,
      color: "from-blue-500 to-blue-600",
      features: [
        "Real-time Monitoring",
        "Predictive Analytics",
        "Automated Control",
        "Performance Optimization",
      ],
      metrics: { efficiency: 98.5, uptime: 99.9, savings: 25 },
      screenshot: "dashboard",
    },
    {
      title: "Mobile Asset Tracker",
      description:
        "Monitor your energy systems on-the-go with our comprehensive mobile application",
      icon: Smartphone,
      color: "from-green-500 to-green-600",
      features: [
        "Mobile Monitoring",
        "Push Notifications",
        "Offline Access",
        "Touch Controls",
      ],
      metrics: { efficiency: 96.2, uptime: 99.7, savings: 22 },
      screenshot: "mobile",
    },
    {
      title: "Cloud Analytics Platform",
      description:
        "Advanced data analytics and business intelligence for informed decision making",
      icon: Cloud,
      color: "from-purple-500 to-purple-600",
      features: [
        "Big Data Processing",
        "Custom Dashboards",
        "AI Insights",
        "API Integration",
      ],
      metrics: { efficiency: 94.8, uptime: 99.8, savings: 28 },
      screenshot: "analytics",
    },
  ];

  const features = [
    {
      title: "AI-Powered Optimization",
      description:
        "Machine learning algorithms continuously optimize energy production and consumption",
      icon: Cpu,
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Comprehensive data visualization and analytics for performance monitoring",
      icon: BarChart3,
      gradient: "from-green-500/20 to-green-600/20",
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Scalable cloud-based architecture ensuring reliability and global accessibility",
      icon: Globe,
      gradient: "from-purple-500/20 to-purple-600/20",
    },
    {
      title: "Advanced Security",
      description:
        "Enterprise-grade security with end-to-end encryption and compliance standards",
      icon: Lock,
      gradient: "from-red-500/20 to-red-600/20",
    },
    {
      title: "IoT Integration",
      description:
        "Seamless connectivity with sensors, smart meters, and IoT devices",
      icon: Wifi,
      gradient: "from-orange-500/20 to-orange-600/20",
    },
    {
      title: "Predictive Maintenance",
      description:
        "AI-driven maintenance scheduling to prevent downtime and optimize performance",
      icon: Settings,
      gradient: "from-indigo-500/20 to-indigo-600/20",
    },
  ];

  const keyMetrics = [
    {
      label: "System Uptime",
      value: "99.9%",
      icon: Shield,
      color: "text-green-500",
    },
    {
      label: "Data Accuracy",
      value: "99.8%",
      icon: Eye,
      color: "text-blue-500",
    },
    {
      label: "Response Time",
      value: "<50ms",
      icon: Gauge,
      color: "text-purple-500",
    },
    {
      label: "Cost Reduction",
      value: "30%",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30"
      >
        <ParticleSystem
          particleCount={70}
          colors={["#FFD700", "#FFA500", "#FF8C00", "#4169E1"]}
          className="opacity-10"
        />

        <motion.div
          style={{ y, opacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-sm text-purple-600 rounded-full text-sm font-medium mb-8 border border-purple-500/10"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Digital Energy Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
              >
                <span className="block">Smart</span>
                <motion.span
                  className="block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Digital
                </motion.span>
                <span className="block">Platforms</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed"
              >
                Transform your energy management with our cutting-edge digital
                platforms. From real-time monitoring to AI-powered optimization,
                unlock the full potential of your renewable energy investments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateX: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group text-lg px-8 py-4 h-auto"
                  >
                    Try Demo
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
                    className="border-2 border-purple-500/30 hover:border-purple-500 text-lg px-8 py-4 h-auto"
                  >
                    View Features
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Interactive Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Main Dashboard Card */}
              <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">
                      Energy Dashboard
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      Live
                    </Badge>
                  </div>

                  {/* Animated Chart Area */}
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 relative overflow-hidden">
                    <div className="flex items-end justify-between h-full">
                      {[65, 80, 75, 90, 85, 95, 88].map((value, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative"
                          style={{ width: "12%", height: `${value}%` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${value}%` }}
                          transition={{
                            duration: 1.5,
                            delay: 0.1 * index,
                            ease: "easeOut",
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/30"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Animated Line Chart */}
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <motion.path
                        d="M 20 120 Q 40 80 80 90 T 160 70 T 240 75 T 320 60"
                        stroke="#10b981"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                    </motion.svg>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {keyMetrics.slice(0, 3).map((metric, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-3 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      >
                        <metric.icon
                          className={`w-6 h-6 ${metric.color} mx-auto mb-2`}
                        />
                        <div className="text-lg font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-20 h-20 rounded-2xl shadow-lg ${
                    i === 0
                      ? "bg-purple-400/5 -top-6 -right-6"
                      : i === 1
                        ? "bg-blue-400/5 -bottom-6 -left-6"
                      : "bg-green-400/5 top-1/2 -right-12"
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
      </section>

      {/* Platforms Section */}
      <section
        ref={platformsRef}
        className="py-20 bg-gradient-to-br from-purple-50/50 to-blue-50/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Digital Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive digital solutions designed to optimize your energy
              operations
            </p>
          </motion.div>

          {/* Platform Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {platforms.map((platform, index) => (
              <motion.button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activePlatform === index
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white text-muted-foreground hover:bg-gray-50"
                }`}
                onClick={() => setActivePlatform(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <platform.icon className="w-4 h-4 mr-2 inline" />
                {platform.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Active Platform Content */}
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Card className="bg-white/80 backdrop-blur-sm border-none shadow-2xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${platforms[activePlatform].color} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      {(() => {
                        const IconComponent = platforms[activePlatform].icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">
                        {platforms[activePlatform].title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">
                        {platforms[activePlatform].description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4 mb-6">
                    {platforms[activePlatform].features.map(
                      (feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </motion.div>
                      ),
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {platforms[activePlatform].metrics.efficiency}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Efficiency
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {platforms[activePlatform].metrics.uptime}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Uptime
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {platforms[activePlatform].metrics.savings}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Savings
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Visualization */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="space-y-6">
                  {/* Simulated Interface */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <Badge variant="outline">Live Demo</Badge>
                  </div>

                  {/* Dynamic Content Based on Active Platform */}
                  {activePlatform === 0 && (
                    <div className="space-y-4">
                      <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Gauge className="w-16 h-16 text-primary" />
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                          <div className="text-lg font-bold text-green-600">
                            24.5 kW
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Current Output
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-600">
                            98.5%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Efficiency
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activePlatform === 1 && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6">
                        <motion.div
                          className="flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Smartphone className="w-16 h-16 text-primary" />
                        </motion.div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">Notifications</span>
                          <Badge variant="secondary">3</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">Remote Control</span>
                          <div className="w-8 h-4 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activePlatform === 2 && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 flex items-center justify-center">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <BarChart3 className="w-16 h-16 text-primary" />
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[85, 92, 78].map((value, index) => (
                          <div
                            key={index}
                            className="bg-white p-3 rounded text-center"
                          >
                            <div className="text-sm font-bold text-purple-600">
                              {value}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Metric {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Advanced Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology powering the future of energy management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={
                  featuresInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 30, rotateX: -10 }
                }
                transition={{ duration: 0.8, delay: 0.1 * index }}
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
                  className={`h-full bg-gradient-to-br ${feature.gradient} border-none backdrop-blur-sm overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-white/70 group-hover:bg-white/80 transition-colors" />

                  <CardHeader className="relative z-10">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardHeader>
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
