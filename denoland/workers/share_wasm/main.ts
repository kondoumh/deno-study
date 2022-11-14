const worker1 = createWorker("worker1");
const worker2 = createWorker("worker2");


const mod = await WebAssembly.compileStreaming(
  fetch("https://mdn.github.io/webassembly-examples/js-api-examples/simple.wasm"),
);

worker1.postMessage({ module: mod });
worker2.postMessage({ module: mod });

function createWorker(name: string): worker {
  const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
    type: "module",
    name: name,
  });
  return worker;
}
