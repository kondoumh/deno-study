const wasmCode = await Deno.readFile("./target/wasm32-unknown-unknown/debug/deno_wasm_example.wasm");

const wasmModule = new WebAssembly.Module(wasmCode);

const wasmInstance = new WebAssembly.Instance(wasmModule);

const { fib } = wasmInstance.exports;

console.log(fib(3));
