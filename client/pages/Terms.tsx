import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import * as React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">These Terms govern your use of our website and services.</p>
          <div className="prose max-w-none">
            <h2>Acceptance</h2>
            <p>By using our site you agree to these terms.</p>
            <h2>Use of Service</h2>
            <p>Use our services responsibly.</p>
            <h2>Contact</h2>
            <p>For questions: legal@example.com</p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
