// deno run add_signal_listener.ts

console.log("Precc Ctrl-C to trigger a SIGINT signal");

Deno.addSignalListener("SIGINT", () => {
  console.log("interrupted!");
  Deno.exit();
});

setTimeout(() => {}, 5000);
