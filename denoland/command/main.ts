// deno run --allow-run main.ts

executeCommand(new Deno.Command(
  "ls", {args: ["-lh"]}
));
executeCommand(new Deno.Command(
  "docker", {args: ["ps"]}
));

executeCommand(new Deno.Command(
  "kubectl", {args: ["get", "pods", "-A"]}
));

async function executeCommand(command: Deno.Command) : Promise<void> {
  const { code, stdout, stderr } = await command.output();
  if (code === 0) {
    console.info(new TextDecoder().decode(stdout));
  } else {
    console.error(new TextDecoder().decode(stderr));
  }
}
