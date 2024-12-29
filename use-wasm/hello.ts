// deno --allow-read hello.ts

const wasmInstance = await WebAssembly.instantiateStreaming(fetch(new URL("./add.wasm", import.meta.url)));

const { add } = wasmInstance.instance.exports as { add: (a: number, b: number) => number };

console.log(add(1, 2));
