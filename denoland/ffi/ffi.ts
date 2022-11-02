// deno run --allow-ffi --unstable ffi.ts

let libSuffix = "";

switch(Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  default:
    libSuffix = "so";
    break;
}

const libName = `./libadd.${libSuffix}`;
const dylib = Deno.dlopen(
  libName,
  {
    "add": { parameters: ["i32", "i32"], result: "i32" },
  } as const,
);

const result = dylib.symbols.add(35, 34);

console.log(`Result from extrnal addition of 35 and 34: ${result}`);
