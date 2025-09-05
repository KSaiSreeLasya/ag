import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sun,
  Building,
  Home,
  Globe,
  Zap,
  Battery,
  Car,
  Droplets,
  Wrench,
  Monitor,
  CheckCircle,
  Factory,
} from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";

export default function Solar() {
  const heroRef = useRef(null);
  const listRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isListInView = useInView(listRef, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Sun,
      title: "Rooftop & Ground-mount EPC",
      desc: "End-to-end EPC services for residential, commercial and utility-scale projects.",
    },
    {
      icon: Building,
      title: "Commercial Solutions",
      desc: "Scalable systems for factories, warehouses and corporate campuses.",
    },
    {
      icon: Home,
      title: "Residential Offerings",
      desc: "Rooftop design, net-metering assistance and long-term O&M packages.",
    },
    {
      icon: Globe,
      title: "Government Programs",
      desc: "Tender support and public-sector deployments with compliance expertise.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section
          ref={heroRef}
          className="py-24 bg-gradient-to-br from-background via-green-50 to-accent"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-full flex justify-start mb-6">
              <BackButton to="/solutions" label="Back to Solutions" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Solar Energy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Comprehensive solar solutions across residential, commercial and
              public sectors — optimized for performance and longevity.
            </motion.p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/solutions/b2c"
                className="inline-block px-5 py-3 rounded-full bg-primary text-primary-foreground"
              >
                Residential
              </Link>
              <Link
                to="/solutions/b2b"
                className="inline-block px-5 py-3 rounded-full bg-white border"
              >
                Commercial
              </Link>
              <Link
                to="/solutions/b2g"
                className="inline-block px-5 py-3 rounded-full bg-primary/20"
              >
                Government
              </Link>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Who we serve</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Tailored solar solutions for homeowners, businesses and public
                sector projects. Select your category to learn more.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link
                  to="/solutions/b2c"
                  className="block p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Home className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">B2C</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Residential rooftop EPC & consulting
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-1">500+</div>
                        <div className="text-sm text-gray-500 font-medium">Projects</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-1">20-35%</div>
                        <div className="text-sm text-gray-500 font-medium">Savings</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {["Rooftop Solar", "Battery Storage", "EV Charging", "Net Metering"].map((feature, idx) => (
                        <motion.div 
                          key={feature} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
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
                      <div className="text-sm text-gray-700 font-medium">Green Community - 100 Home Solar Program</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link
                  to="/solutions/b2b"
                  className="block p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">B2B</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Commercial & industrial EPC, EV infra
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-1">150+</div>
                        <div className="text-sm text-gray-500 font-medium">Projects</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-1">25-40%</div>
                        <div className="text-sm text-gray-500 font-medium">Savings</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {["Rooftop Solar", "Energy Storage", "Smart Building Systems", "Grid Integration"].map((feature, idx) => (
                        <motion.div 
                          key={feature} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
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
                      <div className="text-sm text-gray-700 font-medium">Tech Campus - 2.5MW Solar Installation</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link
                  to="/solutions/b2g"
                  className="block p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Factory className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">B2G</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Government & public rooftop programs
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-1">80+</div>
                        <div className="text-sm text-gray-500 font-medium">Projects</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-1">30-50%</div>
                        <div className="text-sm text-gray-500 font-medium">Savings</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {["Utility-Scale Solar", "Wind Energy", "Cogeneration", "Peak Load Management"].map((feature, idx) => (
                        <motion.div 
                          key={feature} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
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
                      <div className="text-sm text-gray-700 font-medium">Steel Plant - 10MW Hybrid System</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={listRef} className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6">Solar Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <Card className="h-full bg-white">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <h.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{h.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {h.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-white">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isListInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.6 }}
                className="text-xl font-bold mb-3"
              >
                Ready to go solar?
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isListInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="opacity-90">
                  Talk to our solar experts to design a system that fits your
                  needs and budget.
                </p>
                <div className="mt-6">
                  <Link
                    to="/get-quote#residential"
                    className="inline-block px-5 py-3 rounded-md bg-white text-primary font-semibold"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Solar Services Detailed Grid */}
            <section className="py-12">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold mb-6">Solar Services</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Home,
                      title: "Residential Solar Installation",
                      desc: "Complete rooftop solar solutions for homes",
                    },
                    {
                      icon: Building,
                      title: "Commercial & Industrial Solar",
                      desc: "Large-scale solar EPC for businesses",
                    },
                    {
                      icon: Zap,
                      title: "On-Grid & Hybrid Solar Systems",
                      desc: "Grid-tied and hybrid solar configurations",
                    },
                    {
                      icon: Battery,
                      title: "Battery Storage Solutions",
                      desc: "Energy storage systems for continuous power",
                    },
                    {
                      icon: Car,
                      title: "Solar Carports",
                      desc: "Covered parking with integrated solar panels",
                    },
                    {
                      icon: Droplets,
                      title: "Solar Water Heating Systems",
                      desc: "Efficient solar thermal solutions",
                    },
                    {
                      icon: Car,
                      title: "Solar EV Charging Stations",
                      desc: "Clean energy charging infrastructure",
                    },
                    {
                      icon: Wrench,
                      title: "Solar Panel Maintenance & Repair",
                      desc: "Comprehensive O&M services",
                    },
                    {
                      icon: Monitor,
                      title: "Solar Energy Audits & Monitoring",
                      desc: "Performance analysis and optimization",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <div className="p-6 rounded-lg bg-white shadow h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                            <s.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{s.title}</div>
                            <div className="text-muted-foreground text-sm">
                              {s.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActionButton />
    </div>
  );
}
