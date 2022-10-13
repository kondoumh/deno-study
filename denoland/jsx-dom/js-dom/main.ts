import { JSDOM } from "jsdom";
import { serve } from "serve";

const { window: { document } } = new JSDOM(
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
  {
    url: "https://example.com/",
    referrer: "https://example.org/",
    contentType: "text/html",
    storageQuota: 10000000,
  },
);

function handler(_req: Request): Response {
  return new Response(document);
}

serve(handler);
