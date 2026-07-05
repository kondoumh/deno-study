const win = new Deno.BrowserWindow({ title: "My Tray Example App" });

// using を使うことで、関数やスコープを抜けた時に自動でトレイアイコンが破棄(destroy)される
using tray = new Deno.Tray();

// トレイアイコンを右クリックした時のメニューをセット
tray.setMenu([
  { item: { label: "再起動", id: "restart", enabled: true } },
  { item: { label: "終了", id: "quit", enabled: true } }
]);

// トレイアイコンを左クリックした時の処理
tray.addEventListener("menuclick", () => {
  // アイコンの座標を取得
  const bounds = tray.getBounds(); 
  
  if (bounds) {
    // トレイアイコンの真下に、枠なし(frameless)のポップオーバーウィンドウを表示する
    win.setPosition(bounds.x, bounds.y + bounds.height);
    win.show();
  }
});

// const icon = await Deno.readFile("./icons/tray.png");

// const tray = new Deno.Tray();
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
