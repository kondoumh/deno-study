// deno run --allow-run kube.ts
import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
import { Tui, handleInput, handleKeyboardControls, handleMouseControls, Signal, Computed} from "https://deno.land/x/tui@2.1.4/mod.ts"
import { Button, Label, Table } from "https://deno.land/x/tui@2.1.4/src/components/mod.ts";

const tui = new Tui({
  style: crayon.bgBlack,
  refreshRate: 1000 / 60,
});

handleInput(tui);
handleMouseControls(tui);
handleKeyboardControls(tui);
tui.dispatch();
tui.run();

new Button({
  parent: tui,
  zIndex: 0,
  label: {
    text: "refresh",
  },
  theme: {
    base: crayon.bgRed,
    focused: crayon.bgLightRed,
    active: crayon.bgYellow,
  },
  rectangle: {
    column: 1,
    row: 1,
    height: 1,
    width: 10,
  },
}).state.subscribe(async (state) => {
  if (state == "active") {
    const rows = await kubeOutput();
    createTable(rows);
  }
});

const selected = new Signal(0);

new Label({
  parent: tui,
  text: new Computed(() => "selected: " + selected.value.toString()),
  align: {
    horizontal: "center",
    vertical: "center",
  },
  theme: {
    base: crayon.magenta,
  },
  rectangle: {
    column: 1,
    row: 3,
  },
  zIndex: 0,
 });

let table: Table;

function createTable(data: string[][]) {
  if (table) {
    return;
  }
  table = new Table({
    parent: tui,
    theme: {
      base: crayon.bgBlack.white,
      frame: { base: crayon.bgBlack },
      header: { base: crayon.bgBlack.bold.lightBlue },
      selectedRow: {
        base: crayon.bold.bgBlue.white,
        focused: crayon.bold.bgLightBlue.white,
        active: crayon.bold.bgMagenta.black,
      },
    },
    rectangle: {
      column: 1,
      row: 4,
      height: data.length + 4 < 10 ? data.length + 4 : 10,
    },
    headers: [
      { title: "NAMESPACE" },
      { title: "NAME" },
      { title: "READY" },
      { title: "STATUS" },
    ],
    data: data,
    charMap: "rounded",
    zIndex: 0,
  });
  table.state.subscribe((state) => {
    if (state == "active") {
      selected.value = table.selectedRow.value;
    }
  });
}

async function kubeOutput(): Promise<string[][]> {
  const { code, stdout, stderr } = await new Deno.Command(
    "kubectl", {args: ["get", "pods", "-A"]}
  ).output();

  let rows: string[][] = [];
  if (code !== 0) {
    console.error(new TextDecoder().decode(stderr));
  } else {
    const lines = new TextDecoder().decode(stdout).split("\n");
    lines.shift(); // remove header
    rows = lines.map(line => line.split(/\s+/).slice(0, 4)).filter(row => row.length > 3);
  }
  return rows;
} 
