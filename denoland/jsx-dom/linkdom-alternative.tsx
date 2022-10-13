import {serve} from "https://deno.land/std@0.140.0/http/server.ts";
import { DOMParser } from "https://esm.sh/linkedom";

function handler(_req: Request): Response {
  const document = new DOMParser().parseFromString(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Hello from Deno</title>
      </head>
      <body>
        <h1>Hello from Deno</h1>
        <form>
          <input name="user">
          <button>
            Submit
          </button>
        </form>
      </body>
    </html>`,
    "text/html",
  );
  return new Response(document, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);
