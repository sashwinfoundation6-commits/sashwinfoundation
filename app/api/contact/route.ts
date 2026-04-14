import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  category: z.string(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const { name, phone, category, message } = validatedData;

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: "Sashwin Foundation <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL || "sashwinfoundation@gmail.com"],
      subject: `New Lead: ${category} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c9a84c;">New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Interest:</strong> ${category}</p>
          <p><strong>Message:</strong> ${message || "No message provided."}</p>
          <hr />
          <p style="font-size: 10px; color: #666;">Generated from Sashwin Foundation Platform</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
