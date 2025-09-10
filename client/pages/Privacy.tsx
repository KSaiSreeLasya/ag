import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import * as React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-6">
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website.
          </p>
          <div className="prose max-w-none">
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you submit
              forms, apply for jobs, or contact us.
            </p>
            <h2>How We Use Information</h2>
            <p>
              We use information to respond to inquiries, process applications,
              and improve our services.
            </p>
            <h2>Contact</h2>
            <p>
              If you have questions about this policy, contact us at
              privacy@example.com.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
