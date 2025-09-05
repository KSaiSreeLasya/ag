import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  pageName: string;
}

export default function PlaceholderPage({
  title,
  description,
  pageName,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center py-12">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Construction className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-12">
                <p className="text-muted-foreground mb-8">
                  This {pageName} page is currently under development. Our team
                  is working hard to bring you comprehensive information and
                  features. In the meantime, feel free to explore our homepage
                  or get in touch with us directly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Homepage
                    </Link>
                  </Button>

                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/#contact">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-green-100">
                  <p className="text-sm text-muted-foreground">
                    Want to help us improve this page? We'd love to hear your
                    suggestions!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
