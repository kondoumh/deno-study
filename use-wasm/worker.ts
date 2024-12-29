import { add } from "./add.wasm";

self.onmessage = e => {
  const result = add(e.data.a, e.data.b);
  postMessage(self.name + ": " + result);
};
