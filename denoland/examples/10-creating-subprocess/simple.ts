// deno run --allow-run simple.ts

const cmd = ["echo", "hello"];
const p = Deno.run({ cmd });
await p.status();
