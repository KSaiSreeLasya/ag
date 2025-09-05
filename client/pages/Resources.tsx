import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  BookOpen,
  FileText,
  Video,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  ArrowRight,
  Eye,
  Share2,
  Bookmark,
  TrendingUp,
  Lightbulb,
  Settings,
  Zap,
} from "lucide-react";
import ParticleSystem from "@/components/ParticleSystem";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Resources() {
  const heroRef = useRef(null);
  const resourcesRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const resourcesInView = useInView(resourcesRef, {
    once: true,
    margin: "-100px",
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const categories = [
    { id: "all", label: "All Resources", count: 47 },
    { id: "guides", label: "Guides", count: 15 },
    { id: "case-studies", label: "Case Studies", count: 12 },
    { id: "whitepapers", label: "Whitepapers", count: 8 },
    { id: "videos", label: "Videos", count: 7 },
    { id: "tools", label: "Tools", count: 5 },
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Solar ROI Calculation",
      excerpt:
        "Learn how to accurately calculate return on investment for solar energy projects with our comprehensive guide",
      category: "guides",
      type: "Guide",
      readTime: "15 min read",
      date: "2024-01-15",
      author: "Sarah Chen",
      image: "/api/placeholder/400/240",
      tags: ["Solar", "ROI", "Finance"],
      featured: true,
      views: 2847,
      height: "tall",
    },
    {
      id: 2,
      title: "Wind Energy Market Trends 2024",
      excerpt:
        "Comprehensive analysis of global wind energy market trends and growth projections",
      category: "whitepapers",
      type: "Whitepaper",
      readTime: "25 min read",
      date: "2024-01-10",
      author: "Dr. Michael Rodriguez",
      image: "/api/placeholder/400/180",
      tags: ["Wind", "Market", "Analysis"],
      featured: false,
      views: 1923,
      height: "medium",
    },
    {
      id: 3,
      title: "Energy Storage Solutions: Battery Technologies Comparison",
      excerpt:
        "Deep dive into different battery technologies for renewable energy storage systems",
      category: "case-studies",
      type: "Case Study",
      readTime: "20 min read",
      date: "2024-01-08",
      author: "Emma Thompson",
      image: "/api/placeholder/400/200",
      tags: ["Storage", "Battery", "Technology"],
      featured: false,
      views: 1654,
      height: "medium",
    },
    {
      id: 4,
      title: "Digital Transformation in Energy Management",
      excerpt:
        "How IoT and AI are revolutionizing energy management and optimization",
      category: "videos",
      type: "Video",
      readTime: "12 min watch",
      date: "2024-01-05",
      author: "Alex Kumar",
      image: "/api/placeholder/400/160",
      tags: ["Digital", "IoT", "AI"],
      featured: false,
      views: 3241,
      height: "short",
    },
    {
      id: 5,
      title: "Sustainability Reporting Framework for Renewable Energy",
      excerpt:
        "Essential guide to sustainability reporting standards and best practices for energy companies",
      category: "guides",
      type: "Guide",
      readTime: "18 min read",
      date: "2024-01-03",
      author: "Lisa Park",
      image: "/api/placeholder/400/220",
      tags: ["Sustainability", "Reporting", "Standards"],
      featured: true,
      views: 2156,
      height: "tall",
    },
    {
      id: 6,
      title: "Grid Integration Challenges and Solutions",
      excerpt:
        "Technical overview of renewable energy grid integration challenges and innovative solutions",
      category: "whitepapers",
      type: "Whitepaper",
      readTime: "30 min read",
      date: "2024-01-01",
      author: "David Wilson",
      image: "/api/placeholder/400/180",
      tags: ["Grid", "Integration", "Technical"],
      featured: false,
      views: 1789,
      height: "medium",
    },
    {
      id: 7,
      title: "Solar Calculator Tool",
      excerpt:
        "Interactive calculator to estimate solar potential and savings for your property",
      category: "tools",
      type: "Tool",
      readTime: "Interactive",
      date: "2024-01-01",
      author: "Axiso Team",
      image: "/api/placeholder/400/160",
      tags: ["Calculator", "Solar", "Tool"],
      featured: false,
      views: 5432,
      height: "short",
    },
    {
      id: 8,
      title: "Commercial Solar Installation Best Practices",
      excerpt:
        "Comprehensive guide covering planning, installation, and maintenance of commercial solar systems",
      category: "case-studies",
      type: "Case Study",
      readTime: "22 min read",
      date: "2023-12-28",
      author: "Robert Johnson",
      image: "/api/placeholder/400/240",
      tags: ["Commercial", "Installation", "Best Practices"],
      featured: false,
      views: 2890,
      height: "tall",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesFilter =
      activeFilter === "all" || resource.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getCardHeight = (height: string) => {
    switch (height) {
      case "tall":
        return "h-96";
      case "medium":
        return "h-80";
      case "short":
        return "h-64";
      default:
        return "h-80";
    }
  };

  const topResources = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Latest industry trends and forecasts",
      count: 15,
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Cutting-edge technologies and solutions",
      count: 23,
    },
    {
      icon: Settings,
      title: "Technical Guides",
      description: "In-depth technical documentation",
      count: 18,
    },
    {
      icon: Zap,
      title: "Quick Insights",
      description: "Bite-sized industry updates",
      count: 31,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-orange-50/30 to-blue-50/30"
      >
        <ParticleSystem
          particleCount={50}
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm text-orange-600 rounded-full text-sm font-medium mb-8 border border-orange-500/20"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Knowledge Hub & Resources
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              <span className="block">Expand Your</span>
              <motion.span
                className="block bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Energy Knowledge
              </motion.span>
              <span className="block">Portfolio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Access our comprehensive library of guides, case studies,
              whitepapers, and tools to accelerate your renewable energy journey
              and stay ahead of industry trends.
            </motion.p>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources, guides, case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-primary bg-white/80 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeFilter === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-white/80 text-muted-foreground hover:bg-gray-50 border border-gray-200"
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Top Resources Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Popular Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our most accessed resource categories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topResources.map((resource, index) => (
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
                className="group cursor-pointer"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-none">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.2, rotateY: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <resource.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>

                    <Badge
                      variant="outline"
                      className="text-primary border-primary"
                    >
                      {resource.count} Resources
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Masonry Grid */}
      <section ref={resourcesRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              resourcesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Latest Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay informed with our latest insights, guides, and industry
              analysis
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  resourcesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                }}
                className="break-inside-avoid mb-8 group cursor-pointer"
              >
                <Card
                  className={`${getCardHeight(resource.height)} bg-white border-none shadow-lg overflow-hidden relative`}
                >
                  {/* Featured Badge */}
                  {resource.featured && (
                    <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      Featured
                    </Badge>
                  )}

                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {resource.type === "Video" ? (
                        <Video className="w-12 h-12 text-white" />
                      ) : resource.type === "Tool" ? (
                        <Settings className="w-12 h-12 text-white" />
                      ) : (
                        <FileText className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className={`${
                          resource.type === "Guide"
                            ? "border-blue-500 text-blue-600"
                            : resource.type === "Video"
                              ? "border-red-500 text-red-600"
                              : resource.type === "Tool"
                                ? "border-green-500 text-green-600"
                                : "border-purple-500 text-purple-600"
                        }`}
                      >
                        {resource.type}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {resource.views.toLocaleString()}
                      </div>
                    </div>

                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {resource.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {resource.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(resource.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{resource.readTime}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="p-2">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        {resource.type === "Tool" && (
                          <Button variant="ghost" size="sm" className="p-2">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border-2 border-primary/20 hover:border-primary"
            >
              Load More Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingActionButton />
    </div>
  );
}
