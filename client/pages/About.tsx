import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutAnimatedHero from "@/components/sections/AboutAnimatedHero";
import FloatingActionButton from "@/components/FloatingActionButton";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Users,
  Award,
  TrendingUp,
  Shield,
  Heart,
  Globe,
  Lightbulb,
  User,
  Linkedin,
  Mail,
} from "lucide-react";

export default function About() {
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const leadershipRef = useRef(null);
  const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isLeadershipInView = useInView(leadershipRef, {
    once: true,
    margin: "-100px",
  });

  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const values = [
    {
      icon: Users,
      title: "Customer Satisfaction",
      description:
        "Putting our clients first and ensuring exceptional service delivery at every step.",
      color: "text-sky-600",
      bgColor: "bg-sky-500/10",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Maintaining the highest standards in engineering, installation, and performance.",
      color: "text-solar-600",
      bgColor: "bg-solar-500/10",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Operating with transparency, honesty, and ethical business practices.",
      color: "text-energy-600",
      bgColor: "bg-energy-500/10",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Pioneering cutting-edge technologies for the future of clean energy.",
      color: "text-solar-700",
      bgColor: "bg-solar-600/10",
    },
    {
      icon: Heart,
      title: "Teamwork",
      description:
        "Fostering collaboration and partnership to achieve common renewable energy goals.",
      color: "text-energy-700",
      bgColor: "bg-energy-600/10",
    },
    {
      icon: Leaf,
      title: "Safety",
      description:
        "Prioritizing workplace safety and environmental protection in all our operations.",
      color: "text-sky-700",
      bgColor: "bg-sky-600/10",
    },
  ];

  const leadership = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Chief Executive Officer",
      photo: "bg-gradient-to-br from-blue-500 to-blue-600",
      bio: "20+ years in renewable energy. Former VP at SolarTech Global. MIT Engineering graduate. Led $500M+ in clean energy projects.",
      initials: "SC",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "Chief Technology Officer",
      photo: "bg-gradient-to-br from-green-500 to-green-600",
      bio: "Innovation leader with 15 years experience. Former Tesla Energy engineer. Stanford PhD in Electrical Engineering. 12 patents in energy storage.",
      initials: "MR",
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      position: "VP of Sustainability",
      photo: "bg-gradient-to-br from-purple-500 to-purple-600",
      bio: "Environmental scientist and sustainability expert. Harvard PhD. Former UN Climate Change advisor. Published researcher in renewable energy.",
      initials: "EW",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Chief Financial Officer",
      photo: "bg-gradient-to-br from-orange-500 to-orange-600",
      bio: "Financial strategist with green energy focus. Former Goldman Sachs VP. Wharton MBA. Specialized in sustainable investment and ESG financing.",
      initials: "DK",
    },
  ];

  // Circular motion variants for values
  const getCircularPosition = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const radius = 100;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Animated Hero Section */}
        <AboutAnimatedHero />

        {/* Vision & Mission Section */}
        <section ref={visionRef} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-primary/5 to-green-500/5 border-green-100 h-full">
                  <CardContent className="p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisionInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5,
                        type: "spring",
                        bounce: 0.4,
                      }}
                      className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    >
                      <Lightbulb className="h-8 w-8 text-primary" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisionInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-2xl font-bold text-foreground mb-4"
                    >
                      Our Vision
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisionInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      To accelerate India's transition to clean energy by
                      providing reliable, affordable, and tech-driven solutions.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-100 h-full">
                  <CardContent className="p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisionInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.7,
                        type: "spring",
                        bounce: 0.4,
                      }}
                      className="bg-green-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    >
                      <Globe className="h-8 w-8 text-green-500" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisionInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="text-2xl font-bold text-foreground mb-4"
                    >
                      Our Mission
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisionInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 1.1 }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      To empower individuals, businesses, and institutions with
                      solar, wind, and hybrid solutions backed by world-class
                      engineering and advisory services.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          ref={valuesRef}
          className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-solar-50 to-energy-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The principles that guide our mission and shape our commitment
                to sustainable energy.
              </p>
            </motion.div>

            <div className="relative">
              {/* Central element */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isValuesInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="bg-primary text-primary-foreground w-20 h-20 rounded-full flex items-center justify-center shadow-2xl">
                  <Leaf className="h-10 w-10" />
                </div>
              </motion.div>

              {/* Values in circular motion */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  const position = getCircularPosition(index, values.length);

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: position.x,
                        y: position.y,
                        scale: 0.5,
                      }}
                      animate={
                        isValuesInView
                          ? {
                              opacity: 1,
                              x: 0,
                              y: 0,
                              scale: 1,
                            }
                          : {
                              opacity: 0,
                              x: position.x,
                              y: position.y,
                              scale: 0.5,
                            }
                      }
                      transition={{
                        duration: 0.8,
                        delay: 0.7 + index * 0.2,
                        type: "spring",
                        bounce: 0.4,
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-green-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl h-full">
                        <CardContent className="p-6 text-center">
                          <motion.div
                            whileHover={{ rotate: 10 }}
                            className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent
                              className={`h-8 w-8 ${value.color}`}
                            />
                          </motion.div>

                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {value.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section ref={leadershipRef} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isLeadershipInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Leadership Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Meet the visionary leaders driving innovation in renewable
                energy solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isLeadershipInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                  onMouseEnter={() => setFlippedCard(leader.id)}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                  <div
                    className="relative w-full h-80 duration-500 transition-transform"
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                      transform:
                        flippedCard === leader.id
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                    }}
                  >
                    {/* Front of card */}
                    <Card
                      className="absolute inset-0 w-full h-full border-green-100 hover:border-primary/20 transition-all duration-300"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                        <div
                          className={`w-24 h-24 ${leader.photo} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg`}
                        >
                          {leader.initials}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {leader.name}
                        </h3>
                        <p className="text-primary font-medium mb-4">
                          {leader.position}
                        </p>
                        <div className="mt-auto">
                          <Badge
                            variant="outline"
                            className="border-primary/20 text-primary"
                          >
                            Hover for Bio
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card
                      className="absolute inset-0 w-full h-full border-green-100 bg-primary/5"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <CardContent className="p-6 h-full flex flex-col justify-center">
                        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                          {leader.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {leader.bio}
                        </p>
                        <div className="flex justify-center space-x-3 mt-auto">
                          <div className="bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center">
                            <Linkedin className="h-4 w-4 text-primary" />
                          </div>
                          <div className="bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
