// deno run --allow-read --allow-write --allow-net fetch_file.ts

import { writableStreamFromWriter } from "https://deno.land/std@0.151.0/streams/mod.ts";

const fileResponse = await fetch("https://deno.land/logo.svg");

if (fileResponse.body) {
  const file = await Deno.open("./logo.svg", { write: true, create: true });
  const writableStream = writableStreamFromWriter(file);
  await fileResponse.body.pipeTo(writableStream);
}

import { readableStreamFromReader } from "https://deno.land/std@0.151.0/streams/mod.ts";

const file = await Deno.open("./logo.svg", { read: true });
const readableStream = readableStreamFromReader(file);

const res = await fetch("https://example.com", {
  method: "POST",
  body: readableStream,
});
const text = await res.text();
console.log(text);
