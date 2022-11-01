// deno run --allow-run subprocess_piping_to_file.ts

import {
  readableStreamFromReader,
  writableStreamFromWriter,  
} from "https://deno.land/std@0.161.0/streams/conversion.ts";
import { mergeReadableStreams } from "https://deno.land/std@0.161.0/streams/merge.ts";

const file = await Deno.open("./process_output.txt", {
  read: true,
  write: true,
  create: true,
});
const fileWriter = await writableStreamFromWriter(file);

const process = Deno.run({
  cmd: ["yes"],
  stdout: "piped",
  stderr: "piped",
});

const stdout = readableStreamFromReader(process.stdout);
const stderr = readableStreamFromReader(process.stderr);
const joined = mergeReadableStreams(stdout, stderr);

joined.pipeTo(fileWriter).then(() => console.log("pipe join done"));

setTimeout(async () => {
  process.kill("SIGINT");
}, 100);
