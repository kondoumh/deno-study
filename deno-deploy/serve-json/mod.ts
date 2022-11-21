import { serve } from "https://deno.land/std@0.165.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.165.0/http/file_server.ts";

async function handleRequest(request: Request): Promise<Response> {
  return await serveFile(request, `${Deno.cwd()}/todo.json`);
}

serve(handleRequest);
