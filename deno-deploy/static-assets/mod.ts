// deno run --allow-net --allow-read --watch mod.ts
import { serve } from "https://deno.land/std@0.165.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/style.css")) {
    const file = await Deno.readFile('./style.css');
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Example</h1>
      </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

serve(handleRequest);
