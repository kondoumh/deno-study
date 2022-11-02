// HOST=localhost PORT=8080 deno run --allow-env get-env.ts

// Shell environment variables
console.log(Deno.env.get("HOME"));
console.log(Deno.env.get("USER"));
console.log(Deno.env.get("LANG"));

// User defiened environment variables
const HOST = Deno.env.get("HOST");
const PORT = Deno.env.get("PORT");

console.log(`Serving at ${HOST}:${PORT}`);
