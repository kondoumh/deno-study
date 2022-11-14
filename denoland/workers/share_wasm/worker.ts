const importObject = {
  imports: {
    imported_func: arg => {
      console.log(arg);
    }
  }
};

self.onmessage = async (e) => {
  console.log(self.name, "module received from main thread");
  const { module } = e.data;
  const instance = await WebAssembly.instantiate(module, importObject);
  instance.exports.exported_func();

  self.close();
};
