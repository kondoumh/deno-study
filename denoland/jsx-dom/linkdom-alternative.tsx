import {serve} from "https://deno.land/std@0.160.0/http/server.ts";
import { DOMParser } from "https://esm.sh/linkedom";

function handler(_req: Request): Response {
  const document = new DOMParser().parseFromString(
    `<!DOCTYPE html>
     <html>
      <head>
        <title>Current time</title>
      </head>
      <body>
        <h1>Current time</h1>
        <p>placeholder</p>
      </body>
    </html>`,
    "text/html",
  );

  const p = document.querySelector("p");
  p.innerHTML = new Date().toLocaleString();
  return new Response(document, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);
