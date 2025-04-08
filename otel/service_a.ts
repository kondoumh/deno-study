Deno.serve({ port: 3001 }, async (req) => {
  console.log("Service A Recieved request for", req.url);
  const res = await fetch("http://localhost:9000");
  const text = await res.text();
  console.log("Service A Recieved response from Service B", text);
  return new Response(`Service A got: ${text}`);
});
