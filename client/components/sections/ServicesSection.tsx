import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Wind, Battery, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Sun,
      title: "Solar Energy Systems",
      description:
        "Complete solar panel installations with maximum efficiency and durability.",
      features: [
        "Residential & Commercial",
        "25-year warranty",
        "Smart monitoring",
      ],
      color: "bg-yellow-500",
    },
    {
      icon: Wind,
      title: "Wind Power Solutions",
      description:
        "Advanced wind turbine systems for sustainable energy generation.",
      features: [
        "High efficiency turbines",
        "Low maintenance",
        "Grid integration",
      ],
      color: "bg-blue-500",
    },
    {
      icon: Battery,
      title: "Energy Storage",
      description:
        "State-of-the-art battery systems for reliable energy storage.",
      features: [
        "Long-lasting batteries",
        "Smart grid technology",
        "Backup power",
      ],
      color: "bg-green-500",
    },
    {
      icon: Zap,
      title: "Smart Grid Integration",
      description:
        "Intelligent energy management and grid optimization solutions.",
      features: [
        "Real-time monitoring",
        "Automated optimization",
        "Energy analytics",
      ],
      color: "bg-purple-500",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Green Energy Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From solar panels to smart grid integration, we provide end-to-end
            renewable energy solutions tailored to your specific needs and
            goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-primary/20"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Switch to Clean Energy?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get a free consultation and custom energy assessment. Our experts
            will design the perfect renewable energy solution for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="group">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
