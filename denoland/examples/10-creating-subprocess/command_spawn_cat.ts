// deno run --allow-run --allow-read command_spawn_cat.ts <somefile>

const fileNames : string[] = Deno.args;

const p = new Deno.Command("cat", {
  stdin: "piped",
  stdout: "piped",
}).spawn();

const file = await Deno.open(fileNames[0]);
file.readable.pipeTo(p.stdin);

const { stdout } = await p.output();

console.info(new TextDecoder().decode(stdout));
