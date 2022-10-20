/** @jsx h */
import { h } from "preact";
import { renderToString } from "preact-render-to-string";
import { serve } from "serve";

function handler(_req: Request): Response {
  const page = (
    <div>
      <h1>Current time</h1>
      <p>{ new Date().toLocaleString() }</p>
    </div>
  );
  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);
