// deno run --allow-read watcher.ts

const watcher = Deno.watchFs(".");
for await (const event of watcher) {
  console.log(">>>> event", event);
}
