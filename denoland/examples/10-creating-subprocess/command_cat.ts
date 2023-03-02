// deno run --allow-run command_cat.ts <somefile>

const fileNames : string[] = Deno.args;

const command = new Deno.Command(
  "cat", {
  args: fileNames
});

const { code, stdout, stderr } = await command.output();

if (code === 0) {
  console.info(new TextDecoder().decode(stdout));
} else {
  console.error(new TextDecoder().decode(stderr));
}
