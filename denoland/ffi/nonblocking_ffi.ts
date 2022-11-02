const library = Deno.dlopen(
  "./sleep.dylib",
  {
    sleep: {
      parameters: ["usize"],
      result: "void",
      nonblocking: true,
    },
  } as const,
);

console.log("Before");
await library.symbols.sleep(500);
console.log("After");
