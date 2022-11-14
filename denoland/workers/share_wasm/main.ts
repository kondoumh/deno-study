const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
  type: "module",
});

const mod = await WebAssembly.compileStreaming(
  fetch("https://mdn.github.io/webassembly-examples/js-api-examples/simple.wasm"),
);

worker.postMessage({ module: mod });
