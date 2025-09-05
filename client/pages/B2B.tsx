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
import { Button } from "@/components/ui/button";
import { Building, Car, Monitor, Settings, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";

export default function B2B() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const services = [
    {
      icon: Building,
      title: "Commercial & Industrial Solar EPC",
      description:
        "Design, procurement, and construction (EPC) for rooftops, ground-mounts, warehouses, factories and campus-scale systems. Scalable solutions tailored to business energy demands.",
    },
    {
      icon: Car,
      title: "EV Charging Infrastructure",
      description:
        "Turnkey solar-plus-EV charging solutions for fleets, offices, retail, and public parking — including smart scheduling and billing integrations.",
    },
    {
      icon: Monitor,
      title: "Asset Monitoring & Remote O&amp;M",
      description:
        "Real-time monitoring, performance analytics, and proactive maintenance to maximize uptime and yield for commercial assets.",
    },
    {
      icon: Settings,
      title: "Asset Management & Performance Optimization",
      description:
        "End-to-end asset lifecycle management including energy yield guarantees, SLA-backed maintenance, and performance contracts.",
    },
    {
      icon: Truck,
      title: "Material Trading & Procurement",
      description:
        "Sourcing, logistics and supply of panels, inverters, mounting structures and BOS components with quality assurance and competitive pricing.",
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              B2B — Commercial & Industrial Solar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Scalable commercial solar solutions to reduce energy costs,
              improve sustainability and support corporate ESG goals.
            </motion.p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/get-quote#commercial"
                className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground"
              >
                Request Commercial Quote
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 rounded-full bg-white border"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6">Our B2B Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Card className="h-full">
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

            <div className="mt-12 bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-3">
                Why choose our B2B services?
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Proven track record on commercial and industrial projects.
                </li>
                <li>Flexible financing and PPA options for enterprises.</li>
                <li>Dedicated account management and SLA-backed operations.</li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/get-quote#commercial"
                  className="inline-block px-5 py-3 rounded-md bg-white text-primary font-semibold"
                >
                  Get a Commercial Quote
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
