import fs from "fs/promises";
import path from "path";

type Result = { table: string; success: number; failed: number; errors: any[] };

export async function syncLocalData(supabaseRequest: (table: string, method?: string, body?: any, query?: string) => Promise<any>) {
  const dataDir = path.resolve(process.cwd(), "server", "data");
  const results: Result[] = [];

  try {
    const files = await fs.readdir(dataDir).catch(() => []);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const table = path.basename(file, ".json");
      const filePath = path.join(dataDir, file);
      const raw = await fs.readFile(filePath, "utf-8").catch(() => "[]");
      let arr: any[] = [];
      try {
        arr = JSON.parse(raw || "[]");
      } catch (e) {
        // skip invalid file
        continue;
      }
      if (!Array.isArray(arr) || arr.length === 0) {
        results.push({ table, success: 0, failed: 0, errors: [] });
        continue;
      }

      const errors: any[] = [];
      const successes: any[] = [];

      for (const item of arr) {
        const payload = item.payload ?? item.application ?? item;
        // remove probable UI-only props
        delete payload.agree;
        // remove fields that may not exist in DB schema
        delete payload.subject;
        delete payload.bill;
        try {
          const res = await supabaseRequest(table, "POST", payload, "?return=representation");
          successes.push(res);
        } catch (err) {
          errors.push({ item, error: String(err && err.message ? err.message : err) });
        }
      }

      // If any successes, remove those entries from the local store (we'll keep failed ones)
      if (errors.length === 0) {
        // all succeeded -> remove file
        await fs.unlink(filePath).catch(() => {});
      } else {
        // keep only failed items
        const failed = arr.filter((it) => errors.find((e) => e.item === it));
        await fs.writeFile(filePath, JSON.stringify(failed, null, 2)).catch(() => {});
      }

      results.push({ table, success: successes.length, failed: errors.length, errors });
    }
  } catch (err) {
    // return top-level error
    return { error: String(err && (err as any).message ? (err as any).message : err) };
  }

  return results;
}
