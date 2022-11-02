// deno run async_iterator_signal.ts

import { signal } from "https://deno.land/std@0.161.0/signal/mod.ts";

const sig = signal("SIGUSR1", "SIGINT");

setTimeout(() => {}, 5000);

for await (const _ of sig) {
  console.log("interrupt or usr1 signal received");
}

sig.dispose();
