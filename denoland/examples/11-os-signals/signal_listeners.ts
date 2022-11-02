// deno run signal_listeners.ts

console.log("Press Ctrl-C to trigger a SIGINT signal");

const sigIntHandler = () => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);

setTimeout(() => {}, 5000);

setTimeout(() => {
  console.log("removing sigIntHandler..");
  Deno.removeSignalListener("SIGINT", sigIntHandler);
}, 1000);
