import React from "react";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const [syncing, setSyncing] = React.useState(false);
  const [syncResult, setSyncResult] = React.useState<string | null>(null);

  const [counts, setCounts] = React.useState({
    quotes: 0,
    contacts: 0,
    applications: 0,
    jobs: 0,
    resources: 0,
  });

  const [jobs, setJobs] = React.useState<any[]>([]);
  const [resources, setResources] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [addingJob, setAddingJob] = React.useState(false);
  const [newJob, setNewJob] = React.useState({ title: "", location: "", department: "", description: "" });
  const [addingResource, setAddingResource] = React.useState(false);
  const [newResource, setNewResource] = React.useState({ title: "", url: "", summary: "" });

  const fetchCounts = async () => {
    try {
      const [quotesRes, contactsRes, appsRes, jobsRes, resourcesRes] = await Promise.all([
        fetch('/api/admin/quotes', { headers: { 'x-skip-auth': '1' } }),
        fetch('/api/admin/contacts', { headers: { 'x-skip-auth': '1' } }),
        fetch('/api/admin/applications', { headers: { 'x-skip-auth': '1' } }),
        fetch('/api/admin/jobs', { headers: { 'x-skip-auth': '1' } }),
        fetch('/api/admin/resources', { headers: { 'x-skip-auth': '1' } }),
      ]);
      const [quotes, contacts, apps, jobsList, resourcesList] = await Promise.all([
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
        jobs: Array.isArray(jobsList) ? jobsList.length : 0,
        resources: Array.isArray(resourcesList) ? resourcesList.length : 0,
      });
      setJobs(Array.isArray(jobsList) ? jobsList : []);
      setResources(Array.isArray(resourcesList) ? resourcesList : []);
    } catch (e) {
      console.warn('Failed to fetch counts', e);
    }
  };

  React.useEffect(() => {
    fetchCounts();
  }, []);

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export-xlsx', { headers: { 'x-skip-auth': '1' } });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'all_forms.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert('Export failed. Check server logs.');
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/admin/sync-local', { method: 'POST', headers: { 'x-skip-auth': '1' } });
      const text = await res.text().catch(() => '');
      if (!res.ok) throw new Error(text || `status=${res.status}`);
      setSyncResult(text || 'OK');
      await fetchCounts();
    } catch (e: any) {
      console.error('Sync failed', e);
      setSyncResult(`Sync failed: ${e?.message ?? String(e)}`);
    } finally {
      setSyncing(false);
    }
  };

  // Jobs CRUD
  const createJob = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-skip-auth': '1' },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCounts();
      setNewJob({ title: '', location: '', department: '', description: '' });
      setAddingJob(false);
    } catch (e) {
      console.error('Create job failed', e);
      alert('Create job failed');
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id: any, payload: any) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/jobs/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-skip-auth': '1' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCounts();
    } catch (e) {
      console.error('Update job failed', e);
      alert('Update job failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: any) => {
    if (!confirm('Delete job?')) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/jobs/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-skip-auth': '1' },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCounts();
    } catch (e) {
      console.error('Delete job failed', e);
      alert('Delete job failed');
    } finally {
      setLoading(false);
    }
  };

  // Resources CRUD
  const createResource = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-skip-auth': '1' },
        body: JSON.stringify(newResource),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCounts();
      setNewResource({ title: '', url: '', summary: '' });
      setAddingResource(false);
    } catch (e) {
      console.error('Create resource failed', e);
      alert('Create resource failed');
    } finally {
      setLoading(false);
    }
  };

  const updateResource = async (id: any, payload: any) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/resources/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-skip-auth': '1' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCounts();
    } catch (e) {
      console.error('Update resource failed', e);
      alert('Update resource failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id: any) => {
    if (!confirm('Delete resource?')) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/resources/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-skip-auth': '1' },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCounts();
    } catch (e) {
      console.error('Delete resource failed', e);
      alert('Delete resource failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">Analytics and form exports.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-muted-foreground">Total Quotes</div>
            <div className="text-2xl font-bold">{counts.quotes}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-muted-foreground">Contacts</div>
            <div className="text-2xl font-bold">{counts.contacts}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-muted-foreground">Applications</div>
            <div className="text-2xl font-bold">{counts.applications}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-muted-foreground">Resume Uploads</div>
            <div className="text-2xl font-bold">{counts.resources}</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button onClick={handleExport}>Export all forms (XLSX)</Button>
          <Button onClick={handleSync} disabled={syncing} variant="outline">
            {syncing ? 'Syncing...' : 'Sync local to Supabase'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded p-4 bg-white">
            <h2 className="font-semibold mb-2">Manage Jobs</h2>
            <div className="mb-4">
              <Button onClick={() => setAddingJob((s) => !s)}>
                {addingJob ? 'Cancel' : 'Add Job'}
              </Button>
            </div>
            {addingJob && (
              <div className="space-y-2 mb-4">
                <input className="w-full p-2 border" placeholder="Title" value={newJob.title} onChange={(e) => setNewJob((s) => ({ ...s, title: e.target.value }))} />
                <input className="w-full p-2 border" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob((s) => ({ ...s, location: e.target.value }))} />
                <input className="w-full p-2 border" placeholder="Department" value={newJob.department} onChange={(e) => setNewJob((s) => ({ ...s, department: e.target.value }))} />
                <textarea className="w-full p-2 border" placeholder="Description" value={newJob.description} onChange={(e) => setNewJob((s) => ({ ...s, description: e.target.value }))} />
                <div className="flex gap-2">
                  <Button onClick={createJob} disabled={loading}>Create</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {jobs.length === 0 && <div className="text-sm text-muted-foreground">No jobs</div>}
              {jobs.map((j: any) => (
                <div key={j.id} className="p-2 border rounded flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{j.position ?? j.title ?? j.name}</div>
                    <div className="text-sm text-muted-foreground">{j.location ?? j.city}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {
                      const updated = { title: (j.position ?? j.title ?? j.name) };
                      updateJob(j.id, updated);
                    }}>Quick Edit</Button>
                    <Button variant="destructive" onClick={() => deleteJob(j.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded p-4 bg-white">
            <h2 className="font-semibold mb-2">Manage Resources</h2>
            <div className="mb-4">
              <Button onClick={() => setAddingResource((s) => !s)}>{addingResource ? 'Cancel' : 'Add Resource'}</Button>
            </div>
            {addingResource && (
              <div className="space-y-2 mb-4">
                <input className="w-full p-2 border" placeholder="Title" value={newResource.title} onChange={(e) => setNewResource((s) => ({ ...s, title: e.target.value }))} />
                <input className="w-full p-2 border" placeholder="URL" value={newResource.url} onChange={(e) => setNewResource((s) => ({ ...s, url: e.target.value }))} />
                <textarea className="w-full p-2 border" placeholder="Summary" value={newResource.summary} onChange={(e) => setNewResource((s) => ({ ...s, summary: e.target.value }))} />
                <div className="flex gap-2">
                  <Button onClick={createResource} disabled={loading}>Create</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {resources.length === 0 && <div className="text-sm text-muted-foreground">No resources</div>}
              {resources.map((r: any) => (
                <div key={r.id} className="p-2 border rounded flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{r.title ?? r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.url}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => updateResource(r.id, { title: r.title })}>Quick Edit</Button>
                    <Button variant="destructive" onClick={() => deleteResource(r.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border rounded p-4 bg-white">
          <h2 className="font-semibold mb-2">Form submissions (preview)</h2>
          <p className="text-sm text-muted-foreground">Recent sync results</p>
          {syncResult && <pre className="mt-4 text-xs bg-gray-900 text-white p-2 rounded">{syncResult}</pre>}
        </div>
      </div>
    </div>
  );
}
