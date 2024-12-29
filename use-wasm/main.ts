const worker1 = createWorker("worker1");
const worker2 = createWorker("worker2");

handleWorkerMessage(worker1);
handleWorkerMessage(worker2);

worker1.postMessage({ a: 1, b: 2 });
worker2.postMessage({ a: 3, b: 4 });

function createWorker(name: string) {
  const worker = new Worker(new URL("./worker.ts", import.meta.url).href, { 
    type: "module",
    name: name 
  });
  return worker;
}

function handleWorkerMessage(worker: Worker) {
  worker.onmessage = (e) => {
    console.log(e.data);
  };
}
