import { serve } from "server";
import { serveFile } from "file_server";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/todo")) {
    const text = await Deno.readTextFile("./todo.json");
    const data = JSON.parse(text);
    const todos = data.todos.filter(item => item.done === false);
    data.todos = todos;
    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  return await serveFile(request, `${Deno.cwd()}/todo.json`);
}

serve(handleRequest);
