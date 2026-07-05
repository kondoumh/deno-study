const win = new Deno.BrowserWindow({ title: "My Menu Example App" });

console.log(win.windowid); // ウィンドウIDを確認

win.setApplicationMenu([
  {
    submenu: {
      label: "File",
      items: [
        {
          item: {
            label: "New",
            id: "new",
            accelerator: "CmdOrCtrl+N",
            enabled: true,
          },
        },
        {
          item: {
            label: "Open…",
            id: "open",
            accelerator: "CmdOrCtrl+O",
            enabled: true,
          },
        },
        "separator",
        {
          item: {
            label: "Save",
            id: "save",
            accelerator: "CmdOrCtrl+S",
            enabled: true,
          },
        },
        { role: { role: "quit" } },
      ],
    },
  },
  {
    submenu: {
      label: "Edit",
      items: [
        { role: { role: "undo" } },
        { role: { role: "redo" } },
        "separator",
        { role: { role: "cut" } },
        { role: { role: "copy" } },
        { role: { role: "paste" } },
      ],
    },
  },
]);

console.log("Application menu set. You can click on the menu items to see the events in the console.");

win.addEventListener("menuclick", (e) => {
  console.log("Menu item clicked:", e);
  const detail = (e as CustomEvent).detail;
  switch (detail.id) {
    case "new":
      console.log("New clicked");
      break;
    case "open":
      console.log("Open clicked");
      break;
    case "save":
      console.log("Save clicked");
      break;
  }
});

console.log (win.getWindowListeners());