Deno.serve({ port: 9000}, (req) => {
  for (const [key, value] of req.headers.entries()) {
    console.log(key, value);
  }
  console.log("Service B Recieved request for", req.url);
  return new Response("Hello world");
});
