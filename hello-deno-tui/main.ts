import { crayon } from "https://deno.land/x/crayon@3.3.3/mod.ts";
import { Canvas, Tui,  handleInput, handleKeyboardControls, handleMouseControls, Signal, Computed } from "https://deno.land/x/tui@2.1.4/mod.ts";
import { Button } from "https://deno.land/x/tui@2.1.4/src/components/mod.ts";

const tui = new Tui({
  style: crayon.bgBlack, // Make background black
  refreshRate: 1000 / 60, // Run in 60FPS
});

handleInput(tui);
handleMouseControls(tui);
handleKeyboardControls(tui);

const number = new Signal(0);

const button = new Button({
  parent: tui,
  zIndex: 0,
  label: {
    text: new Computed(() => number.value.toString()), // cast number to string
  },
  theme: {
    base: crayon.bgRed,
    focused: crayon.bgLightRed,
    active: crayon.bgYellow,
  },
  rectangle: {
    column: 1,
    row: 1,
    height: 5,
    width: 10,
  },
});

// Subscribe for button state changes
button.state.subscribe((state) => {
  // If button is active (pressed) make number bigger by one
  if (state === "active")  {
    ++number.value;
  }
});

// Listen to mousePress event
button.on("mousePress", ({ drag, movementX, movementY }) => {
  if (!drag) return;

  // Use peek() to get signal's value when it happens outside of Signal/Computed/Effect
  const rectangle = button.rectangle.peek();
  // Move button by how much mouse has moved while dragging it
  rectangle.column += movementX;
  rectangle.row += movementY;
});

tui.dispatch(); // Close Tui on CTRL+C
tui.run();
