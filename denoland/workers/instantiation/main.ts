// deno run --allow-read main.ts
new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
