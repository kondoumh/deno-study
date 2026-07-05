const win = new Deno.BrowserWindow({ 
  title: "My Deno Desktop App", 
  width: 800, 
  height: 600,
});

win.openDevtools();

Deno.serve((req) => {
  const url = new URL(req.url);
  return new Response("<h1>Hello, Deno Desktop!</h1>", {
    headers: { "content-type": "text/html" },
  });
});

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

win.addEventListener("menuclick", (e) => {
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

const contextMenu: Deno.MenuItem[] = [
  { item: { label: "Copy", id: "copy", enabled: true } },
  { item: { label: "Paste", id: "paste", enabled: true } },
  "separator",
  { item: { label: "Properties…", id: "props", enabled: true } },
];

// Trigger from a right-click. The webview may not forward the browser
// `contextmenu` event, so handle the secondary mouse button on the window.
win.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    win.showContextMenu(e.clientX, e.clientY, contextMenu);
  }
});

win.addEventListener("contextmenuclick", (e) => {
  if (e.detail.id === "copy") { console.log("Copy clicked"); }
  if (e.detail.id === "paste") { console.log("Paste clicked"); }
  if (e.detail.id === "props") { console.log("Properties clicked"); }
});

// using tray = new Deno.Tray();
// const iconPath = new URL("./icons/tray.png", import.meta.url).pathname;
// const icon = await Deno.readFile(iconPath);
// tray.setIcon(icon);
// tray.setTooltip("My App");

// tray.setMenu([
//   { item: { label: "Open", id: "open", enabled: true } },
//   { item: { label: "Quit", id: "quit", enabled: true } },
// ]);

// tray.addEventListener("menuclick", (e) => {
//   if (e.detail.id === "open") win.show();
//   if (e.detail.id === "quit") Deno.exit(0);
// });
