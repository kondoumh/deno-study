// Deno.serve(() =>
//   new Response(
//     "<!DOCTYPE html><h1>Hello from Deno desktop </h1>",
//     { headers: { "content-type": "text/html" } },
//   )
// );

// ① 1回目の呼び出し：
// Deno Desktopが自動で作る最初のウィンドウを乗っ取って、タイトルなどを設定します。
const win = new Deno.BrowserWindow({ 
  title: "僕の初めてのDenoデスクトップアプリ", 
  width: 800, 
  height: 600,
});

win.openDevtools();

// ② Webサーバーの処理（Hello World）
Deno.serve((req) => {
  const url = new URL(req.url);

  // （おまけ）もし別ウィンドウ用のパスにアクセスされたら返す内容
  // if (url.pathname === "/settings") {
  //   return new Response("<h1>Settings</h1>", {
  //     headers: { "content-type": "text/html" },
  //   });
  // }

  // メイン画面
  console.log("Hello World!");
  return new Response("<h1>Hello, Deno Desktop!</h1>", {
    headers: { "content-type": "text/html" },
  });
});


// ③ 2回目の呼び出し（別ウィンドウを開きたい場合）：
// 自動でポートが割り当てられるため、そのポートを取得して新しいウィンドウで開きます。

// const base = Deno.env.get("DENO_SERVE_ADDRESS")!; // 例: "tcp:127.0.0.1:8000"
// const port = base.split(":").pop();

// const settingsWin = new Deno.BrowserWindow({
//   title: "設定",
//   width: 420,
//   height: 320,
// });
// // 設定用のURLへアクセスさせる
// settingsWin.navigate(`http://127.0.0.1:${port}/settings`);
