import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { parseHTML } from "https://esm.sh/linkedom";

const { document, customElements, HTMLElement } = parseHTML(
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
  </html>`
);

customElements.define(
  "custom-element",
  class extends HTMLElement {
    connectedCallback() {
      console.log("it works 🥳");
    }
  },
);

document.body.appendChild(document.createElement("custom-element"));

function handler(_req: Request): Response {
  return new Response(document.toString(), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);
