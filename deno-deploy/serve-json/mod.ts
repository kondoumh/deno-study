import { serve } from "https://deno.land/std@0.165.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const file = await Deno.readFile('./todo.json');
  return new Response(file, {
    headers: {
      "content-type": "application/json",
    },
  });

}

serve(handleRequest);
