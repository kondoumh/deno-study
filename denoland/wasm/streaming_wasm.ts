const importObject = {
  imports: { imported_func: (arg) => console.log(arg) }
};

const obj = await WebAssembly.instantiateStreaming(
  fetch("https://mdn.github.io/webassembly-examples/js-api-examples/simple.wasm"),
  importObject
);

obj.instance.exports.exported_func()
