// deno --allow-run sumprocess.ts <somefile>
const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "https://deno.land/std@0.161.0/examples/cat.ts",
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
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
