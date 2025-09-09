export function setupErrorHandlers() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (ev) => {
    // Ignore benign iframe evaluation errors, log others
    try {
      const msg = ev.message || "";
      if (msg.includes("Could not evaluate in iframe") || msg.includes("IFrame evaluation timeout")) {
        // swallow noisy iframe errors
        return;
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line no-console
    console.warn("Global error captured:", ev.error || ev.message);
  });

  window.addEventListener("unhandledrejection", (ev) => {
    // eslint-disable-next-line no-console
    console.warn("Unhandled promise rejection:", ev.reason);
  });
}
