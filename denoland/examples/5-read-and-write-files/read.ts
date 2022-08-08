// deno run --allow-read read.ts

const text = await Deno.readTextFile("./people.json");
console.log(text);
