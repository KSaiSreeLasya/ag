import React from "react";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const [syncing, setSyncing] = React.useState(false);
  const [syncResult, setSyncResult] = React.useState<string | null>(null);

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/export-xlsx", {
        headers: { "x-skip-auth": "1" },
      });
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

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/admin/sync-local", {
        method: "POST",
        headers: { "x-skip-auth": "1" },
      });
      // Safely attempt to read body; handle cases where body was already consumed.
      let text = "";
      try {
        if ((res as any).bodyUsed) {
          // body already used by another consumer (edge cases), provide fallback
          text = "[body already consumed by another handler]";
        } else {
          // Try to read normally
          try {
            text = await res.text();
          } catch (readErr) {
            // If reading fails, attempt clone (may still fail)
            try {
              text = await res.clone().text();
            } catch (cloneErr) {
              text = `[unable to read response body: ${String(cloneErr)}]`;
            }
          }
        }
      } catch (e) {
        text = `[unexpected read error: ${String(e)}]`;
      }

      if (!res.ok) throw new Error(text || `status=${res.status}`);
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        // not JSON, keep text
      }
      setSyncResult(json ? JSON.stringify(json, null, 2) : text);
    } catch (e: any) {
      console.error("Sync failed", e);
      setSyncResult(`Sync failed: ${e?.message ?? String(e)}`);
    } finally {
      setSyncing(false);
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
          <div className="flex gap-2">
            <Button onClick={handleExport}>Export all forms (CSV)</Button>
            <Button onClick={handleSync} disabled={syncing} variant="outline">
              {syncing ? "Syncing..." : "Sync local to Supabase"}
            </Button>
          </div>

          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">Form submissions (preview)</h2>
            <p className="text-sm text-muted-foreground">
              No data yet — connect Supabase and implement server export
              endpoints to populate this area.
            </p>
            {syncResult && (
              <pre className="mt-4 text-xs bg-gray-900 text-white p-2 rounded">
                {syncResult}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
