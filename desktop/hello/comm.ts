// main.ts

const win = new Deno.BrowserWindow({ 
  title: "Bindingsのテスト", 
  width: 800, 
  height: 600,
});

// デバッグ用にDevToolsを開く（CEFモードの場合）
win.openDevtools();

// ==========================================
// 1. バックエンド側：フロントから呼ばれる関数を登録
// ==========================================
win.bind("getSystemInfo", async (userName) => {
  console.log(`[Deno側] フロントエンドから呼ばれました！ 引数: ${userName}`);
  
  // Denoの機能を使ってOSの情報を取得
  const denoVersion = Deno.version.deno;
  const os = Deno.build.os;

  // 少し重い処理をシミュレート（0.5秒待つ）
  await new Promise(resolve => setTimeout(resolve, 500));

  // フロントエンドに返すデータ（JSON化できるものなら何でもOK）
  return {
    message: `こんにちは、${userName}さん！`,
    os: os,
    denoVersion: denoVersion
  };
});

// ==========================================
// 2. フロントエンド側：画面のHTMLを返す
// ==========================================
Deno.serve(() => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bindings Test</title>
    </head>
    <body>
      <h1>Deno Desktop Bindings</h1>
      <button id="btn">システム情報を取得</button>
      <pre id="result">ここに結果が出ます</pre>

      <script>
        // ボタンが押された時の処理
        document.getElementById('btn').addEventListener('click', async () => {
          const resultArea = document.getElementById('result');
          resultArea.textContent = "取得中...";

          try {
            // 💡 ここが魔法！ preload.js なしでDeno側の関数が直接呼べる！
            const data = await bindings.getSystemInfo("Deno太郎");
            
            // 結果を画面に表示
            resultArea.textContent = JSON.stringify(data, null, 2);
          } catch (error) {
            resultArea.textContent = "エラー: " + error.message;
          }
        });
      </script>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html" },
  });
});