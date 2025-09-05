import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Leaf, TrendingUp, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const achievements = [
    {
      icon: Award,
      title: "Industry Leader",
      description: "Recognized as the top green energy provider in the region",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "50+ certified engineers and energy specialists",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Reduced 100,000+ tons of CO₂ emissions annually",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Average 40% reduction in energy costs for clients",
    },
  ];

  const certifications = [
    "ISO 14001 Certified",
    "NABCEP Accredited",
    "OSHA Compliant",
    "IEC 61215 Standards",
  ];

  return (
    <section id="about" className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              About Axiso Green Energies
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Pioneering Sustainable Energy Solutions Since 2008
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              At Axiso Green Energies, we believe in creating a cleaner, more
              sustainable future through innovative renewable energy solutions.
              Our mission is to make clean energy accessible, affordable, and
              efficient for everyone.
            </p>

            <p className="text-muted-foreground mb-8">
              With over 15 years of experience in the renewable energy sector,
              we've helped thousands of residential and commercial clients
              transition to sustainable energy sources, reducing their carbon
              footprint while saving on energy costs.
            </p>

            {/* Certifications */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Certifications & Standards
              </h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-primary/20 text-primary"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 group">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Vision Statement */}
            <Card className="bg-white/50 backdrop-blur-sm border-green-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Our Vision
                </h3>
                <p className="text-muted-foreground">
                  To be the leading catalyst in the global transition to
                  renewable energy, making sustainable power solutions the
                  standard for all communities worldwide.
                </p>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="bg-white/50 backdrop-blur-sm border-green-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To deliver cutting-edge renewable energy solutions that
                  empower our clients to achieve energy independence while
                  contributing to a healthier planet.
                </p>
              </CardContent>
            </Card>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card
                    key={index}
                    className="bg-white/50 backdrop-blur-sm border-green-100 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
