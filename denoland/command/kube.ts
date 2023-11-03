// deno run --allow-run kube.ts

const { code, stdout, stderr } = await new Deno.Command(
  "kubectl", {args: ["get", "pods", "-A"]}
).output();

if (code !== 0) {
  console.error(new TextDecoder().decode(stderr));
} else {
  const rows = toArray(stdout);
  rows.forEach((row) => {
    console.log(row[1]);
  });
}

function toArray(stdout: Uint8Array) : string[][] {
  const lines = new TextDecoder().decode(stdout).split("\n");
  return lines.map((line) => line.split(/\s+/)).filter((row) => row.length > 5);
}
