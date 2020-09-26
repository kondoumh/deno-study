// deno run --allow-net http_request.ts https://www.google.com

const url = Deno.args[0]
const res = await fetch(url)

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);
