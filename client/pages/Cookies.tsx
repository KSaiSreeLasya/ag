import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import * as React from "react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-6">
            We use cookies to improve your experience on our site.
          </p>
          <div className="prose max-w-none">
            <h2>What are cookies?</h2>
            <p>Cookies are small text files stored on your device.</p>
            <h2>Managing cookies</h2>
            <p>You can disable cookies in your browser settings.</p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
