import React from "react";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/export-forms");
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "all_forms.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert("Export failed. Check server logs.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Analytics and form exports.
        </p>
        <div className="space-y-4">
          <Button onClick={handleExport}>Export all forms (XLSX)</Button>
          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">Form submissions (preview)</h2>
            <p className="text-sm text-muted-foreground">
              No data yet — connect Supabase and implement server export
              endpoints to populate this area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
