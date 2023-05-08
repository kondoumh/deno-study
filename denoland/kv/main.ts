const kv = await Deno.openKv();

// basic
await kv.set(["users", "alice"], { name: "Alice" });
const res = await kv.get(["users", "alice"]);
console.log(res.key, res.value);

await kv.delete(["users", "alice"]);
const res2 = await kv.get(["users", "alice"]);
console.log(res2.key, res2.value);

// list

await kv.set(["users", "alice"], { birthday: "January 1, 1990" });
await kv.set(["users", "sam"], { birthday: "February 14, 1985" });
await kv.set(["users", "taylor"], { birthday: "December 25, 1970" });

await printUsers();

// atomic
const key = ["users", "bob"];
const value = { birthday: "January 1, 1990" };
const res3 = await kv.atomic()
  .check({ key, versionstamp: null })
  .set(key, value)
  .commit();
if (res3.ok) {
  console.log("User did not yet exist. Inserted!");
} else {
  console.log("User already exists");
}

// delete all
console.log("Deleting all users");
for await (const entry of kv.list({ prefix: ["users"] })) {
  kv.delete(entry.key);
}

printUsers();

async function printUsers() {
  for await (const entry of kv.list({ prefix: ["users"] })) {
    console.log(entry.key, entry.value);
  }  
}
