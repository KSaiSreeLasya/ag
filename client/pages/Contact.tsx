import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function Contact() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    const btn = form.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement | null;
    try {
      if (btn) {
        btn.textContent = "Sending...";
        btn.disabled = true;
      }
      const resp = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        let body: any = null;
        try {
          body = await resp.json();
        } catch {
          try {
            body = await resp.text();
          } catch {
            body = null;
          }
        }
        const { toast } = await import("sonner");
        // Prefer to show a friendly message, but log details for debugging
        const debugMsg =
          (body && (body.error || body.message)) ||
          body ||
          `status=${resp.status}`;
        toast.error("Failed to send message");
        console.error("Contact submit failed:", debugMsg);
        return;
      }
      // success
      const { toast } = await import("sonner");
      toast.success("Message sent — we will contact you shortly");
      form.reset();
    } catch (err) {
      const { toast } = await import("sonner");
      toast.error("Failed to send message");
      console.error(err);
    } finally {
      if (btn) {
        btn.textContent = "Send Message";
        btn.disabled = false;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Contact Us
          </h1>
          <p className="text-muted-foreground mb-8">
            Get in touch with our renewable energy experts for a free
            consultation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white/80 p-6 rounded-xl shadow"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <Input required name="name" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <Input required type="email" name="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone *
                  </label>
                  <Input required name="phone" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject *
                </label>
                <Input required name="subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <Textarea required name="message" rows={5} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
            <aside className="hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Contact illustration"
                className="w-full h-full object-cover rounded-xl border"
              />
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
