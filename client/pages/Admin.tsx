import React from "react";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const [syncing, setSyncing] = React.useState(false);
  const [syncResult, setSyncResult] = React.useState<string | null>(null);

  // analytics
  const [counts, setCounts] = React.useState({
    quotes: 0,
    contacts: 0,
    applications: 0,
    jobs: 0,
    resources: 0,
  });

  const [addingJob, setAddingJob] = React.useState(false);
  const [addingResource, setAddingResource] = React.useState(false);
  const [jobForm, setJobForm] = React.useState({
    title: "",
    slug: "",
    description: "",
  });
  const [resourceForm, setResourceForm] = React.useState({
    title: "",
    url: "",
    description: "",
  });

  const fetchCounts = async () => {
    try {
      const headers = { "x-skip-auth": "1" } as Record<string, string>;
      const [quotesRes, contactsRes, appsRes, jobsRes, resourcesRes] =
        await Promise.all([
          fetch("/api/admin/quotes", { headers }),
          fetch("/api/admin/contacts", { headers }),
          fetch("/api/admin/applications", { headers }),
          fetch("/api/admin/jobs", { headers }),
          fetch("/api/admin/resources", { headers }),
        ]);
      const [quotes, contacts, apps, jobs, resources] = await Promise.all([
        quotesRes.ok ? quotesRes.json().catch(() => []) : [],
        contactsRes.ok ? contactsRes.json().catch(() => []) : [],
        appsRes.ok ? appsRes.json().catch(() => []) : [],
        jobsRes.ok ? jobsRes.json().catch(() => []) : [],
        resourcesRes.ok ? resourcesRes.json().catch(() => []) : [],
      ]);
      setCounts({
        quotes: Array.isArray(quotes) ? quotes.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        applications: Array.isArray(apps) ? apps.length : 0,
        jobs: Array.isArray(jobs) ? jobs.length : 0,
        resources: Array.isArray(resources) ? resources.length : 0,
      });
    } catch (e) {
      console.error("Failed to fetch counts", e);
    }
  };

  const [jobsList, setJobsList] = React.useState<any[]>([]);
  const [resourcesList, setResourcesList] = React.useState<any[]>([]);

  const fetchJobsResources = async () => {
    try {
      const headers = { "x-skip-auth": "1" } as Record<string, string>;
      const [jobsRes, resourcesRes] = await Promise.all([
        fetch("/api/admin/jobs", { headers }),
        fetch("/api/admin/resources", { headers }),
      ]);
      const jobs = jobsRes.ok ? await jobsRes.json().catch(() => []) : [];
      const resources = resourcesRes.ok
        ? await resourcesRes.json().catch(() => [])
        : [];
      setJobsList(Array.isArray(jobs) ? jobs : []);
      setResourcesList(Array.isArray(resources) ? resources : []);
    } catch (e) {
      console.error("Failed to fetch jobs/resources", e);
    }
  };

  React.useEffect(() => {
    fetchCounts();
    fetchJobsResources();
  }, []);

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/export-xlsx", {
        headers: { "x-skip-auth": "1" },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Export failed response:", res.status, text);
        alert(`Export failed: ${res.status} ${text}`);
        return;
      }
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
    <div className="min-h-screen bg-background px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage job applications, contact inquiries, and resume downloads
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleExport} className="bg-green-600">
              Export all forms (XLSX)
            </Button>
            <Button onClick={handleSync} disabled={syncing} variant="outline">
              {syncing ? "Syncing..." : "Sync local to Supabase"}
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { title: "Total Applications", value: 0 },
            { title: "Pending Review", value: 0 },
            { title: "Contact Messages", value: 0 },
            { title: "Resume Uploads", value: 0 },
            { title: "Newsletter Subscribers", value: 0 },
            { title: "Active Job Postings", value: 0 },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white/80 p-4 rounded shadow flex flex-col"
            >
              <span className="text-sm text-muted-foreground">
                {card.title}
              </span>
              <span className="text-2xl font-semibold mt-2">{card.value}</span>
            </div>
          ))}
        </div>

        {/* Tabs & Filters */}
        <div className="bg-white/80 p-6 rounded shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <input
                placeholder="Search by name, email, position..."
                className="px-4 py-2 border rounded w-96"
              />
              <select className="px-3 py-2 border rounded">
                <option>All Status</option>
                <option>Pending</option>
                <option>Reviewed</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleExport} className="bg-blue-600">
                Export (XLSX)
              </Button>
              <Button onClick={handleSync} variant="outline">
                Sync local
              </Button>
              <Button onClick={() => setAddingJob((v) => !v)} variant="outline">
                {addingJob ? "Close" : "Add Job"}
              </Button>
              <Button
                onClick={() => setAddingResource((v) => !v)}
                variant="outline"
              >
                {addingResource ? "Close" : "Add Resource"}
              </Button>
            </div>
          </div>

          {addingJob && (
            <div className="mb-4 border p-4 rounded">
              <h3 className="font-semibold mb-2">Create Job</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  placeholder="Title"
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, title: e.target.value })
                  }
                  className="px-3 py-2 border rounded col-span-2"
                />
                <input
                  placeholder="Slug"
                  value={jobForm.slug}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, slug: e.target.value })
                  }
                  className="px-3 py-2 border rounded"
                />
              </div>
              <textarea
                placeholder="Description"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
                className="w-full p-3 border rounded mb-2"
              />
              <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/admin/jobs", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "x-skip-auth": "1",
                        },
                        body: JSON.stringify({
                          title: jobForm.title,
                          slug: jobForm.slug,
                          description: jobForm.description,
                          is_published: true,
                        }),
                      });
                      if (!res.ok)
                        throw new Error(
                          await res.text().catch(() => res.statusText),
                        );
                      alert("Job created");
                      setJobForm({ title: "", slug: "", description: "" });
                      setAddingJob(false);
                      fetchCounts();
                    } catch (e) {
                      console.error(e);
                      alert("Failed to create job");
                    }
                  }}
                >
                  Create Job
                </Button>
                <Button variant="outline" onClick={() => setAddingJob(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {addingResource && (
            <div className="mb-4 border p-4 rounded">
              <h3 className="font-semibold mb-2">Create Resource</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  placeholder="Title"
                  value={resourceForm.title}
                  onChange={(e) =>
                    setResourceForm({ ...resourceForm, title: e.target.value })
                  }
                  className="px-3 py-2 border rounded col-span-2"
                />
                <input
                  placeholder="URL"
                  value={resourceForm.url}
                  onChange={(e) =>
                    setResourceForm({ ...resourceForm, url: e.target.value })
                  }
                  className="px-3 py-2 border rounded"
                />
              </div>
              <textarea
                placeholder="Description"
                value={resourceForm.description}
                onChange={(e) =>
                  setResourceForm({
                    ...resourceForm,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 border rounded mb-2"
              />
              <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/admin/resources", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "x-skip-auth": "1",
                        },
                        body: JSON.stringify({
                          title: resourceForm.title,
                          url: resourceForm.url,
                          description: resourceForm.description,
                          is_published: true,
                        }),
                      });
                      if (!res.ok)
                        throw new Error(
                          await res.text().catch(() => res.statusText),
                        );
                      alert("Resource created");
                      setResourceForm({ title: "", url: "", description: "" });
                      setAddingResource(false);
                      fetchCounts();
                    } catch (e) {
                      console.error(e);
                      alert("Failed to create resource");
                    }
                  }}
                >
                  Create Resource
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAddingResource(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4">
            <table className="min-w-full table-fixed text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-2 px-3 w-1/4">Applicant</th>
                  <th className="py-2 px-3 w-1/4">Position</th>
                  <th className="py-2 px-3 w-1/6">Experience</th>
                  <th className="py-2 px-3 w-1/6">Status</th>
                  <th className="py-2 px-3 w-1/6">Applied</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No applications found.
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Manage Jobs</h3>
              {jobsList.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No jobs found.
                </div>
              ) : (
                <div className="space-y-2">
                  {jobsList.map((j) => (
                    <div
                      key={j.id}
                      className="flex items-center justify-between border rounded p-2"
                    >
                      <div>
                        <div className="font-medium">
                          {j.title || j.name || j.slug}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {j.location || j.department || ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={async () => {
                            const newTitle = prompt(
                              "Edit job title",
                              j.title || j.name || j.slug || "",
                            );
                            if (!newTitle) return;
                            try {
                              const res = await fetch(
                                `/api/admin/jobs/${j.id}`,
                                {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json",
                                    "x-skip-auth": "1",
                                  },
                                  body: JSON.stringify({ title: newTitle }),
                                },
                              );
                              if (!res.ok)
                                throw new Error(
                                  await res.text().catch(() => res.statusText),
                                );
                              alert("Job updated");
                              fetchJobsResources();
                              fetchCounts();
                            } catch (e) {
                              console.error(e);
                              alert("Update failed");
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            if (!confirm("Delete job?")) return;
                            try {
                              const res = await fetch(
                                `/api/admin/jobs/${j.id}`,
                                {
                                  method: "DELETE",
                                  headers: { "x-skip-auth": "1" },
                                },
                              );
                              if (!res.ok)
                                throw new Error(
                                  await res.text().catch(() => res.statusText),
                                );
                              alert("Deleted");
                              fetchJobsResources();
                              fetchCounts();
                            } catch (e) {
                              console.error(e);
                              alert("Delete failed");
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="font-semibold mt-6 mb-2">Manage Resources</h3>
              {resourcesList.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No resources found.
                </div>
              ) : (
                <div className="space-y-2">
                  {resourcesList.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between border rounded p-2"
                    >
                      <div>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {r.url}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={async () => {
                            const newTitle = prompt(
                              "Edit resource title",
                              r.title || "",
                            );
                            if (!newTitle) return;
                            try {
                              const res = await fetch(
                                `/api/admin/resources/${r.id}`,
                                {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json",
                                    "x-skip-auth": "1",
                                  },
                                  body: JSON.stringify({ title: newTitle }),
                                },
                              );
                              if (!res.ok)
                                throw new Error(
                                  await res.text().catch(() => res.statusText),
                                );
                              alert("Resource updated");
                              fetchJobsResources();
                              fetchCounts();
                            } catch (e) {
                              console.error(e);
                              alert("Update failed");
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            if (!confirm("Delete resource?")) return;
                            try {
                              const res = await fetch(
                                `/api/admin/resources/${r.id}`,
                                {
                                  method: "DELETE",
                                  headers: { "x-skip-auth": "1" },
                                },
                              );
                              if (!res.ok)
                                throw new Error(
                                  await res.text().catch(() => res.statusText),
                                );
                              alert("Deleted");
                              fetchJobsResources();
                              fetchCounts();
                            } catch (e) {
                              console.error(e);
                              alert("Delete failed");
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {syncResult && (
            <pre className="mt-4 text-xs bg-gray-900 text-white p-2 rounded">
              {syncResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
