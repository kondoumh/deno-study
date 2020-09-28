// deno run --unstable --allow-read=/foo permission_api.ts

const desc1 = { name: "read", path: "/foo" };
console.log(await Deno.permissions.query(desc1));

const desc2 = { name: "read", path: "/foo/bar" };
console.log(await Deno.permissions.query(desc2));

const desc3 = { name: "read", path: "/bar" };
console.log(await Deno.permissions.query(desc3));
