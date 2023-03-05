// deno run --allow-run run_cat.ts <somefile>

const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    "cat",
    ...fileNames,
  ],
  stdout: "piped",
  stderr: "piped"
});

const { code } = await p.status();

const rawOutput = await p.output();
const rawError = await p.stderrOutput();

if (code === 0) {
  console.info(new TextDecoder().decode(rawOutput));
} else {
  console.error(new TextDecoder().decode(rawError));
}

Deno.exit(code);
