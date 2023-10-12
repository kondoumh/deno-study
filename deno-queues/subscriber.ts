interface Notification {
  type: "email" | "sms";
  to: string;
  body: string;
}

function isNotification(o : unknown): o is Notification {
  return (
    ((o as Notification)?.type === "email" || (o as Notification)?.type === "sms") &&
     (o as Notification)?.to !== undefined &&
     typeof (o as Notification)?.to === "string" &&
     (o as Notification)?.body !== undefined &&
     typeof (o as Notification)?.body === "string"
     );
}

const db = await Deno.openKv("db");

db.listenQueue((msg) => {
  if (!isNotification(msg)) {
    console.error("invalid message", msg);
    return;
  }
  if (msg.type === "email") {
    console.log("sending email to ", msg.to, msg.body);
  } else if (msg.type === "sms") {
    console.log("sending sms to ", msg.to, msg.body);
  }
});
