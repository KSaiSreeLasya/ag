import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Trophy,
  Coffee,
  ArrowRight,
  ChevronDown,
  Star,
  Building,
  Globe,
  Zap,
  Leaf,
  Target,
  Award,
  GraduationCap,
  Calendar,
} from "lucide-react";
import ParticleSystem from "@/components/ParticleSystem";
import FloatingActionButton from "@/components/FloatingActionButton";
import ApplyForm from "@/components/ApplyForm";

export default function Careers() {
  const heroRef = useRef(null);
  const jobsRef = useRef(null);
  const lifeRef = useRef(null);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const jobsInView = useInView(jobsRef, { once: true, margin: "-100px" });
  const lifeInView = useInView(lifeRef, { once: true, margin: "-100px" });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [jobs, setJobs] = useState<any[]>([]);

  // Fetch live jobs from public API
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to load jobs");
        const data = await res.json();
        if (mounted) setJobs(Array.isArray(data) ? data : []);
      } catch (e) {
        // fallback keep jobs empty
        console.warn("Failed to fetch jobs", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Provide a simple default when no jobs available
  const defaultJobs = [];
  const jobsToRender = jobs.length ? jobs : defaultJobs;

  const companyValues = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Every decision considers environmental impact",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Teamwork drives our innovation and success",
    },
    {
      icon: Target,
      title: "Mission Driven",
      description: "Purpose-driven work that makes a real difference",
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "High standards in everything we deliver",
    },
  ];

  const lifeAtAxiso = [
    {
      title: "Team Collaboration",
      description: "Cross-functional teams working together",
      image: "/api/placeholder/300/200",
      size: "large",
    },
    {
      title: "Innovation Lab",
      description: "Cutting-edge technology development",
      image: "/api/placeholder/250/150",
      size: "medium",
    },
    {
      title: "Outdoor Events",
      description: "Team building and company retreats",
      image: "/api/placeholder/200/200",
      size: "small",
    },
    {
      title: "Learning & Development",
      description: "Continuous growth opportunities",
      image: "/api/placeholder/300/180",
      size: "medium",
    },
    {
      title: "Office Culture",
      description: "Modern workspace and amenities",
      image: "/api/placeholder/250/250",
      size: "large",
    },
    {
      title: "Awards & Recognition",
      description: "Celebrating achievements",
      image: "/api/placeholder/200/150",
      size: "small",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      items: [
        "Medical, Dental, Vision",
        "Mental Health Support",
        "Gym Membership",
        "Wellness Programs",
      ],
    },
    {
      icon: DollarSign,
      title: "Financial",
      items: [
        "Competitive Salary",
        "401k with Match",
        "Stock Options",
        "Performance Bonuses",
      ],
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      items: [
        "Flexible Hours",
        "Remote Work Options",
        "Unlimited PTO",
        "Sabbatical Program",
      ],
    },
    {
      icon: GraduationCap,
      title: "Growth & Development",
      items: [
        "Learning Budget",
        "Conference Attendance",
        "Mentorship Programs",
        "Career Development",
      ],
    },
  ];

  const getCardSize = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-1";
      case "small":
        return "md:col-span-1 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-green-50/30"
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-green-500/20 backdrop-blur-sm text-purple-600 rounded-full text-sm font-medium mb-8 border border-purple-500/20"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Join Our Mission
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              <span className="block">Build the</span>
              <motion.span
                className="block bg-gradient-to-r from-purple-600 via-green-600 to-blue-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Energy Future
              </motion.span>
              <span className="block">With Us</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Join a passionate team of innovators, engineers, and
              sustainability experts working together to accelerate the world's
              transition to clean energy. Make an impact that matters.
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
                  className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 group text-lg px-8 py-4 h-auto"
                >
                  View Open Positions
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
                  Learn About Culture
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-200"
            >
              {[
                { value: "200+", label: "Team Members" },
                { value: "15+", label: "Open Positions" },
                { value: "4.8/5", label: "Employee Rating" },
                { value: "95%", label: "Retention Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 to-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and shape our culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="text-center group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-none">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.2, rotateY: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section ref={jobsRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={jobsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find your next opportunity to make a meaningful impact in
              renewable energy
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  jobsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="group"
              >
                <Card
                  className={`bg-white border-none shadow-lg overflow-hidden ${job.featured ? "ring-2 ring-primary/20" : ""}`}
                >
                  {job.featured && (
                    <div className="bg-gradient-to-r from-purple-500 to-green-500 text-white text-center py-2 text-sm font-medium">
                      ⭐ Featured Position
                    </div>
                  )}

                  <CardHeader
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {job.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="text-primary border-primary"
                          >
                            {job.department}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            {job.experience}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button
                          className="group-hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPosition(job.title);
                            setApplyOpen(true);
                          }}
                        >
                          Apply Now
                        </Button>
                        <motion.div
                          animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedJob === job.id ? "auto" : 0,
                      opacity: expandedJob === job.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="pt-0">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-foreground mb-3">
                            Job Description
                          </h4>
                          <p className="text-muted-foreground mb-6">
                            {job.description}
                          </p>

                          <h4 className="font-semibold text-foreground mb-3">
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {(() => {
                              const reqs = Array.isArray(job.requirements)
                                ? job.requirements
                                : typeof job.requirements === 'string'
                                ? (() => {
                                    try {
                                      const parsed = JSON.parse(job.requirements);
                                      return Array.isArray(parsed) ? parsed : [];
                                    } catch (e) {
                                      return [];
                                    }
                                  })()
                                : [];
                              return reqs.map((req: any, reqIndex: number) => (
                                <li
                                  key={reqIndex}
                                  className="flex items-start gap-2 text-muted-foreground"
                                >
                                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  {req}
                                </li>
                              ));
                            })()}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-3">
                            Benefits
                          </h4>
                          <div className="space-y-2">
                            {job.benefits.map((benefit, benefitIndex) => (
                              <Badge
                                key={benefitIndex}
                                variant="secondary"
                                className="mr-2 mb-2"
                              >
                                {benefit}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-6">
                            <Button
                              className="w-full"
                              size="lg"
                              onClick={() => {
                                setSelectedPosition(job.title);
                                setApplyOpen(true);
                              }}
                            >
                              Apply for this Position
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-green-50/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Benefits & Perks
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We invest in our team with comprehensive benefits and meaningful
              perks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-none">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-purple-600 rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Axiso Gallery */}
      <section ref={lifeRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={lifeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Life at Axiso
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get a glimpse into our culture, workspace, and the amazing people
              that make up our team
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
            {lifeAtAxiso.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  lifeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                }}
                className={`${getCardSize(item.size)} group cursor-pointer`}
              >
                <Card className="h-full bg-white border-none shadow-lg overflow-hidden">
                  <div
                    className={`relative ${
                      item.size === "large"
                        ? "h-80"
                        : item.size === "medium"
                          ? "h-48"
                          : "h-32"
                    } bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building className="w-16 h-16 text-white/70" />
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
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
      <ApplyForm
        open={applyOpen}
        onOpenChange={setApplyOpen}
        defaultPosition={selectedPosition}
      />
    </div>
  );
}
