import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import * as React from "react";

export default function Compliance() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Compliance
          </h1>
          <p className="text-muted-foreground mb-6">
            Our compliance information and certifications.
          </p>
          <div className="prose max-w-none">
            <h2>Certifications</h2>
            <p>
              We maintain industry-standard certifications and safety practices.
            </p>
            <h2>Data Protection</h2>
            <p>We follow best-practices for data security and privacy.</p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
