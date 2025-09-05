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
import { Globe, Building, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";

export default function B2G() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const services = [
    {
      icon: Building,
      title: "Solar Rooftop — Residential & Commercial",
      description:
        "Planning and execution of rooftop solar programs for residential buildings, commercial offices and community housing schemes.",
    },
    {
      icon: Globe,
      title: "Public & Government Projects",
      description:
        "Tender support, implementation and compliance for public-sector solar programs, street lighting, and institutional installations.",
    },
    {
      icon: Settings,
      title: "Asset Management & O&M",
      description:
        "Comprehensive asset management for public assets including performance monitoring, preventive maintenance and reporting.",
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-full flex justify-start mb-6">
              <BackButton to="/solutions/solar" label="Back to Solar" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              B2G — Government & Public Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Delivering large-scale and compliant solar projects for government
              bodies, public institutions, and community housing programs.
            </motion.p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/get-quote#commercial"
                className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground"
              >
                Request Project Quote
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 rounded-full bg-white border"
              >
                Contact Public Sector
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6">B2G Services</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                  }
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group"
                >
                  <Card key={idx} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <s.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{s.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {s.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-3">
                Public sector capabilities
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>End-to-end tender support and compliance documentation.</li>
                <li>City-scale and institutional deployment experience.</li>
                <li>
                  Transparent reporting and performance dashboards for
                  stakeholders.
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/get-quote#commercial"
                  className="inline-block px-5 py-3 rounded-md bg-primary text-white font-semibold"
                >
                  Request a Project Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActionButton />
    </div>
  );
}
