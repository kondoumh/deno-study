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

const data = new Signal<string[][]>([]);

const rows = [
  ["0", "foo"],
  ["1", "bar"],
  ["2", "baz"],
  ["3", "qux"],
  ["4", "quux"],
  ["5", "corge"],
];

data.value = rows;

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
    height: 3,
    width: 10,
  },
});

const table = new Table({
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
    column: 2,
    row: 7,
    height: 10,
  },
  headers: [
    { title: "ID", width: 500 },
    { title: "Name", width: 10 },
  ],
  data: data.value,
  charMap: "rounded",
  zIndex: 0,
});

const size = new Signal(data.value.length);

const label = new Label({
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
    row: 5,
  },
  zIndex: 0,
 });

 button.state.subscribe((state) => {
  if (state == "active") {
    const id = data.value.length.toString();
    const length = data.value.push([id, "item of table " + id]);
    size.value = length;
  }
});
