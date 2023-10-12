interface Notification {
  type: "email" | "sms";
  to: string;
  body: string;
}

const db = await Deno.openKv("db");

const message1: Notification = { type: "email", to: "Alice", body: "Hello, Alice!" };
const message2: Notification = { type: "sms", to: "Bob", body: "Hi, Bob!" };

await db.enqueue(message1);
await db.enqueue(message2);

console.log("messages enqueued");
