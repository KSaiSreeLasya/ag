import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-green-50 to-accent">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.1"%3E%3Ccircle cx="5" cy="5" r="5"/%3E%3Ccircle cx="55" cy="55" r="5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
          }
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Leading Green Energy Solutions
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Powering a{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                Sustainable
              </span>{" "}
              Future
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Transform your energy consumption with our cutting-edge renewable
              solutions. Solar, wind, and battery storage systems designed for
              maximum efficiency and sustainability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 group"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 pt-8 border-t border-green-100">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  50MW
                </div>
                <div className="text-sm text-muted-foreground">
                  Clean Energy Generated
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  15+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Visual elements */}
          <div className="relative">
            <div className="relative z-10">
              {/* Solar panel illustration */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Solar Panel System
                    </h3>
                    <div className="text-2xl font-bold text-primary">95%</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Energy Efficiency
                      </span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Power Output
                      </span>
                      <span className="font-medium">8.5 kW</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm text-muted-foreground">
                      Monthly Savings
                    </div>
                    <div className="text-2xl font-bold text-primary">$450</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-green-500 rounded-full"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
