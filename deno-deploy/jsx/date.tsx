/** @jsx h */
// deno run --allow-net=:8000 date.tsx
import {serve} from "https://deno.land/std@0.160.0/http/server.ts";
import { h } from "https://esm.sh/preact@10.11.2";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.2.5?deps=preact@10.11.2";

function handler(_req: Request): Response {
  const page = (
    <div>
      <h1>Current time</h1>
      <p>{new Date().toLocaleString()}</p>
    </div>
  );
  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);
