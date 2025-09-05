import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, Wind as WindIcon, Battery, Zap, CheckCircle } from "lucide-react";

export default function Solutions() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const solutions = [
    {
      title: "Solar Energy",
      to: "/solutions/solar",
      desc: "Rooftop, commercial & public solar solutions",
      icon: Sun,
      iconColor: "bg-yellow-100",
      iconTextColor: "text-yellow-600",
      projects: "200+",
      savings: "25-40%",
      features: ["Rooftop Solar", "Ground Mount", "Solar Carports", "Grid Integration"],
      caseStudy: "Tech Campus - 2.5MW Solar Installation"
    },
    {
      title: "Wind Energy",
      to: "/solutions/wind",
      desc: "Onshore wind, hybrid systems and O&M",
      icon: WindIcon,
      iconColor: "bg-blue-100",
      iconTextColor: "text-blue-600",
      projects: "50+",
      savings: "30-45%",
      features: ["Onshore Wind", "Hybrid Systems", "Asset Management", "O&M Services"],
      caseStudy: "Wind Farm - 15MW Onshore Project"
    },
    {
      title: "Energy Storage",
      to: "/solutions/storage",
      desc: "Battery storage systems and EMS",
      icon: Battery,
      iconColor: "bg-green-100",
      iconTextColor: "text-green-600",
      projects: "100+",
      savings: "20-35%",
      features: ["Battery Systems", "Energy Management", "Peak Shaving", "Backup Power"],
      caseStudy: "Industrial Plant - 5MW Storage System"
    },
    {
      title: "EV Stations",
      to: "/solutions/ev-stations",
      desc: "EV charging infrastructure and services",
      icon: Zap,
      iconColor: "bg-purple-100",
      iconTextColor: "text-purple-600",
      projects: "300+",
      savings: "15-30%",
      features: ["Fast Charging", "Smart Grid", "Fleet Solutions", "Payment Systems"],
      caseStudy: "Shopping Mall - 50 Station Network"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section
          ref={heroRef}
          className="py-20 bg-gradient-to-br from-background via-green-50 to-accent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              Our Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Explore our core energy solutions — click a category to view
              detailed services and offerings.
            </motion.p>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Solutions</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Comprehensive energy solutions with proven results and comprehensive features across all sectors.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((solution, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Link
                    to={solution.to}
                    className="block p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 relative overflow-hidden h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 ${solution.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <solution.icon className={`h-8 w-8 ${solution.iconTextColor}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{solution.desc}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                          <div className="text-3xl font-bold text-green-600 mb-1">{solution.projects}</div>
                          <div className="text-sm text-gray-500 font-medium">Projects</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                          <div className="text-3xl font-bold text-green-600 mb-1">{solution.savings}</div>
                          <div className="text-sm text-gray-500 font-medium">Savings</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {solution.features.map((feature, featureIdx) => (
                          <motion.div 
                            key={feature} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 + featureIdx * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                        <div className="text-green-600 text-sm font-bold mb-2">Case Study</div>
                        <div className="text-sm text-gray-700 font-medium">{solution.caseStudy}</div>
                      </div>
                    </div>
                  </Link>
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
