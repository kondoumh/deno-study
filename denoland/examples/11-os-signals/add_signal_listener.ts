// deno run add_signal_listener.ts

const pid = Deno.pid;
console.log(`Run 'kill ${pid}' to terminate.`);

Deno.addSignalListener("SIGTERM", () => {
  console.log("Terminating...");
  Deno.exit();
});

setTimeout(() => {}, 50000);
