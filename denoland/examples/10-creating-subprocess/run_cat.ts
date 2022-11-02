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
  await Deno.stdout.write(rawOutput);
} else {
  await Deno.stderr.write(rawError);
}

Deno.exit(code);
