import { db } from "@/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET as string,
    });

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { first_name, last_name, email_addresses, image_url } = evt.data;

      const user = await db.user.create({
        data: {
          firstName: first_name || "",
          lastName: last_name || "",
          name: `${first_name} ${last_name}`,
          email: email_addresses[0]?.email_address || "",
          avatar: image_url || "",
        },
      });
    } else if (eventType === "user.updated") {
      const { first_name, last_name, email_addresses, image_url } = evt.data;

      const user = await db.user.findUnique({
        where: {
          email: email_addresses[0]?.email_address,
        },
      });

      await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          firstName: first_name || "",
          lastName: last_name || "",
          name: `${first_name} ${last_name}`,
          email: email_addresses[0]?.email_address || "",
          avatar: image_url || "",
        },
      });
    } else if (eventType === "user.deleted") {
      await db.user.delete({
        where: {
          id,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
