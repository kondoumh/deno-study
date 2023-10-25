// https://github.com/Im-Beast/deno_tui/blob/main/examples/layout.ts

import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
import { Tui, handleInput, handleKeyboardControls, handleMouseControls, GridLayout } from "https://deno.land/x/tui@2.1.4/mod.ts"
import { Button } from "https://deno.land/x/tui@2.1.4/src/components/mod.ts";;

const tui = new Tui({
  style: crayon.bgBlack,
  refreshRate: 1000 / 60,
});

handleInput(tui);
handleMouseControls(tui);
handleKeyboardControls(tui);
tui.dispatch();
tui.run();

const layout = new GridLayout(
  {
    pattern: [
      ["a", "b", "c"],
      ["d", "b", "f"],
      ["g", "h", "f"],
      ["i", "i", "i"],
      ["j", "k", "l"],
    ],
    gapX: 2,
    gapY: 1,
    rectangle: tui.rectangle,
  },
);

const elements = ["a", "b", "c", "d", "f", "g", "h", "i", "j", "k", "l"] as const;
let h = 0;
let i = 0;
for (const layoutId of elements) {
  const rectangle = layout.element(layoutId);

  i++;
  h += 360 / elements.length;

  const button = new Button({
    parent: tui,
    theme: {
      base: crayon.bgHsl(~~h, 60, 40),
      focused: crayon.bgHsl(~~h, 50, 50),
      active: crayon.bgHsl(~~h, 100, 70),
    },
    rectangle,
    zIndex: 360 - ~~h,
  });

  button.on("mousePress", ({ drag, movementX, movementY }) => {
    if (drag) {
      const rect = button.rectangle.value;
      rect.column += movementX;
      rect.row += movementY;
    }
  });
}
