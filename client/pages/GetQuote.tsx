import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Category = "residential" | "housing" | "commercial";

export default function GetQuote() {
  const location = useLocation();
  const hash = location.hash.replace("#", "");
  const [category, setCategory] = React.useState<Category>(
    (hash as Category) || "residential",
  );

  React.useEffect(() => {
    const h = location.hash.replace("#", "") as Category;
    if (h && ["residential", "housing", "commercial"].includes(h)) {
      setCategory(h);
    }
  }, [location.hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    // Placeholder: you can replace with API call
    console.log("Get Quote submitted:", { category, ...data });
    // Simple UI feedback
    const submitBtn = form.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.textContent = "Submitted";
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = "Submit Details";
        submitBtn.disabled = false;
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Get a Quote
          </h1>
          <p className="text-muted-foreground mb-6">
            Choose your category and fill the form to receive a free
            consultation and quote.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-1/3">
              <div className="space-y-3">
                <button
                  onClick={() => setCategory("residential")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all border ${
                    category === "residential"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => setCategory("housing")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all border ${
                    category === "housing"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  Housing Society
                </button>
                <button
                  onClick={() => setCategory("commercial")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all border ${
                    category === "commercial"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  Commercial
                </button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                <p className="font-medium mb-2">Quick Links</p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/solutions#solar"
                      className="text-primary hover:underline"
                    >
                      Solar Energy Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/solutions#wind"
                      className="text-primary hover:underline"
                    >
                      Wind Energy Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-primary hover:underline"
                    >
                      Contact our team
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>

            <section className="w-full md:w-2/3 bg-white/80 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {category} Quote Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="category" value={category} />

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Enter Your Name *
                  </label>
                  <input
                    required
                    name="name"
                    className="w-full border border-border rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Whatsapp Number *
                  </label>
                  <input
                    required
                    name="whatsapp"
                    className="w-full border border-border rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pin Code *
                  </label>
                  <input
                    required
                    name="pincode"
                    className="w-full border border-border rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    What is your average monthly bill? *
                  </label>
                  <select
                    required
                    name="bill"
                    className="w-full border border-border rounded-md px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="<1000">Below ₹1,000</option>
                    <option value="1000-5000">₹1,000 - ₹5,000</option>
                    <option value=">5000">Above ₹5,000</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input id="agree" type="checkbox" name="agree" required />
                  <label
                    htmlFor="agree"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to terms of service & privacy policy
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-md"
                  >
                    Submit Details
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
