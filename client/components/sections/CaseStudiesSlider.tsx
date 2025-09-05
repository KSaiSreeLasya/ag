import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Building, Factory, Home } from "lucide-react";

export default function CaseStudiesSlider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "Residential Rooftop Solar",
      client: "Premium Housing Society",
      sector: "Residential",
      icon: Home,
      savings: "40%",
      capacity: "500kW",
      description:
        "Complete rooftop solar installation for residential complex with individual metering and grid-tie capability.",
      image: "bg-gradient-to-br from-yellow-500 to-orange-500",
      results: [
        "40% reduction in electricity bills",
        "500kW rooftop capacity",
        "300 tons CO₂ saved annually",
      ],
    },
    {
      id: 2,
      title: "C&I Factory Solar Installation",
      client: "Manufacturing Industries Ltd.",
      sector: "Commercial & Industrial",
      icon: Factory,
      savings: "50%",
      capacity: "2MW",
      description:
        "Large-scale commercial solar EPC project for manufacturing facility with captive consumption model.",
      image: "bg-gradient-to-br from-blue-500 to-blue-600",
      results: [
        "50% reduction in energy costs",
        "2MW commercial solar",
        "1,200 tons CO₂ saved annually",
      ],
    },
    {
      id: 3,
      title: "Wind Hybrid Project",
      client: "Renewable Energy Developer",
      sector: "Utility Scale",
      icon: Building,
      savings: "60%",
      capacity: "10MW",
      description:
        "Hybrid solar-wind project with advanced energy storage and smart grid integration for optimal performance.",
      image: "bg-gradient-to-br from-green-500 to-green-600",
      results: [
        "60% capacity utilization",
        "10MW hybrid capacity",
        "5,000 tons CO₂ saved annually",
      ],
    },
  ];

  const clientLogos = [
    { name: "TechCorp", logo: "TC" },
    { name: "GreenManufacturing", logo: "GM" },
    { name: "EcoVillage", logo: "EV" },
    { name: "PowerIndustries", logo: "PI" },
    { name: "SustainableCorp", logo: "SC" },
    { name: "CleanEnergy Ltd", logo: "CE" },
    { name: "Future Systems", logo: "FS" },
    { name: "Innovation Hub", logo: "IH" },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [caseStudies.length]);

  return (
    <section ref={ref} className="py-20 bg-background">
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
            Success Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Transforming Energy Landscapes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Discover how we've helped organizations across different sectors
            achieve their sustainability goals and reduce their carbon footprint
            with our innovative solutions.
          </motion.p>
        </motion.div>

        {/* Case Studies Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mb-16"
        >
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {caseStudies.map((study, index) => {
                const IconComponent = study.icon;
                return (
                  <div key={study.id} className="w-full flex-shrink-0">
                    <Card className="border-0 shadow-2xl">
                      <CardContent className="p-0">
                        <div className="grid lg:grid-cols-2 gap-0">
                          {/* Content */}
                          <div className="p-8 md:p-12 flex flex-col justify-center">
                            <motion.div
                              initial={{ opacity: 0, x: -30 }}
                              animate={
                                isInView && index === currentSlide
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -30 }
                              }
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="flex items-center mb-4"
                            >
                              <div className="bg-primary/10 p-3 rounded-xl mr-4">
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm text-primary font-semibold">
                                  {study.sector}
                                </div>
                                <div className="text-lg font-semibold text-foreground">
                                  {study.client}
                                </div>
                              </div>
                            </motion.div>

                            <motion.h3
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isInView && index === currentSlide
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.6, delay: 0.3 }}
                              className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                            >
                              {study.title}
                            </motion.h3>

                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isInView && index === currentSlide
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.6, delay: 0.4 }}
                              className="text-muted-foreground mb-6"
                            >
                              {study.description}
                            </motion.p>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isInView && index === currentSlide
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.6, delay: 0.5 }}
                              className="grid grid-cols-2 gap-4 mb-6"
                            >
                              <div className="bg-green-50 p-4 rounded-xl">
                                <div className="text-2xl font-bold text-green-600">
                                  {study.savings}
                                </div>
                                <div className="text-sm text-green-700">
                                  Cost Savings
                                </div>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-xl">
                                <div className="text-2xl font-bold text-blue-600">
                                  {study.capacity}
                                </div>
                                <div className="text-sm text-blue-700">
                                  Energy Capacity
                                </div>
                              </div>
                            </motion.div>

                            <motion.ul
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isInView && index === currentSlide
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.6, delay: 0.6 }}
                              className="space-y-2 mb-6"
                            >
                              {study.results.map((result, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-sm text-muted-foreground"
                                >
                                  <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                                  {result}
                                </li>
                              ))}
                            </motion.ul>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isInView && index === currentSlide
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.6, delay: 0.7 }}
                            >
                              <Button className="bg-primary hover:bg-primary/90 group">
                                View Full Case Study
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </motion.div>
                          </div>

                          {/* Visual */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={
                              isInView && index === currentSlide
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.8 }
                            }
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`${study.image} p-12 flex items-center justify-center text-white relative overflow-hidden`}
                          >
                            <div className="text-center z-10">
                              <IconComponent className="h-24 w-24 mx-auto mb-4 opacity-80" />
                              <div className="text-4xl font-bold mb-2">
                                {study.savings}
                              </div>
                              <div className="text-lg opacity-90">
                                Energy Savings
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-black/20"></div>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300 filter grayscale group-hover:grayscale-0 mx-auto">
                  {client.logo}
                </div>
                <div className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
