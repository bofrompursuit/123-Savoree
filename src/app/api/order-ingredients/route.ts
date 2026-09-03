import { NextResponse } from "next/server";

// SIMULATION ONLY — no real SMS is sent. There is no Twilio (or other SMS
// provider) integration wired up; this endpoint just returns the payload
// that a real integration would send, so the UI can demonstrate the
// parental-approval flow end to end.
export async function POST(request: Request) {
  let body: { guardianPhone?: string; recipeName?: string; groceryList?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { guardianPhone, recipeName, groceryList } = body;
  if (!guardianPhone?.trim()) {
    return NextResponse.json({ error: "Missing guardian phone number" }, { status: 400 });
  }

  const itemCount = groceryList?.length ?? 0;
  const message = `123 Savoree: Your kid wants help getting ingredients for "${
    recipeName ?? "a new recipe"
  }" (${itemCount} items). Reply YES to approve the order, or open the app to review the list.`;

  const simulatedPayload = {
    provider: "simulated-sms",
    to: guardianPhone.trim(),
    from: "123-SAVOREE",
    body: message,
    status: "queued (simulated — no real SMS sent)",
    sentAt: new Date().toISOString(),
  };

  console.log("[order-ingredients] simulated SMS:", simulatedPayload);

  return NextResponse.json({ simulatedPayload });
}
