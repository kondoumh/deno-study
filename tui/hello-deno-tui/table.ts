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

const rows = [
  ["0", "foo"],
  ["1", "bar"],
  ["2", "baz"],
  ["3", "qux"],
  ["4", "quux"],
  ["5", "corge"],
  ["6", "grault aaaaaaaaaaaaaaaaaaaaaaa"],
];

const button = new Button({
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
});

const selected = new Signal(0);

let table: Table;

function createTable(data: string[][]) {
  if (table) {
    table.data.value = data;
    table.rectangle.value.height = data.length + 3 < 10 ? data.length + 3 : 10;
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
      height: data.length + 3 < 10 ? data.length + 3 : 10,
    },
    headers: [
      { title: "ID", width: 500 },
      { title: "Name", width: 10 },
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

const size = new Signal(rows.length);

new Label({
  parent: tui,
  text: new Computed(() => "items: " + size.value.toString()),
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
    row: 14,
  },
  zIndex: 0,
 });

button.state.subscribe((state) => {
  if (state == "active") {
    createTable(rows);
  }
});

