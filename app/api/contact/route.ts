import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

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
    const adminEmail = process.env.ADMIN_EMAIL || "sashwinfoundation6@gmail.com";

    // Send high-fidelity luxury HTML email to admin
    const { data, error } = await resend.emails.send({
      from: "Sashwin Foundation Lead <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `[PROSPECT] ${category} | ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0b0b0b; font-family: 'Inter', sans-serif; color: #f4f4f4;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0b0b; padding: 60px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #141414; border: 1px solid #c9a84c22; overflow: hidden;">
                    <!-- Luxury Header -->
                    <tr>
                      <td align="center" style="padding: 40px 0; background-color: #0d0d0d; border-bottom: 2px solid #c9a84c;">
                        <span style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: 0.2em; color: #f4f4f4; text-transform: uppercase;">
                          SASHWIN <span style="color: #c9a84c;">FOUNDATION</span>
                        </span>
                        <div style="font-size: 10px; letter-spacing: 0.5em; color: #888; margin-top: 10px; font-weight: 600;">TECHNICAL VANGUARD SYSTEM</div>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 50px 40px;">
                        <div style="border-left: 3px solid #c9a84c; padding-left: 20px; margin-bottom: 40px;">
                          <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #f4f4f4; margin: 0; font-style: italic;">New Lead Distribution</h1>
                          <p style="color: #888; font-size: 14px; margin: 10px 0 0 0;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</p>
                        </div>

                        <table role="presentation" width="100%" cellspacing="0" cellpadding="20" border="0" style="background-color: #0d0d0d; border: 1px solid #222;">
                          <tr>
                            <td>
                              <div style="font-size: 10px; color: #c9a84c; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 5px;">Prospect Name</div>
                              <div style="font-size: 18px; color: #f4f4f4; font-weight: 400;">${name}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="border-top: 1px solid #222;">
                              <div style="font-size: 10px; color: #c9a84c; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 5px;">Direct Line</div>
                              <div style="font-size: 18px; color: #f4f4f4;">${phone}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="border-top: 1px solid #222;">
                              <div style="font-size: 10px; color: #c9a84c; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 5px;">Architecture Vertical</div>
                              <div style="font-size: 18px; color: #f4f4f4;">${category}</div>
                            </td>
                          </tr>
                          ${message ? `
                          <tr>
                            <td style="border-top: 1px solid #222;">
                              <div style="font-size: 10px; color: #c9a84c; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 5px;">Legacy Blueprint Inquiry</div>
                              <div style="font-size: 15px; color: #aaa; line-height: 1.8; font-style: italic;">&ldquo;${message}&rdquo;</div>
                            </td>
                          </tr>
                          ` : ''}
                        </table>

                        <div style="margin-top: 40px; text-align: center;">
                           <a href="tel:${phone}" style="background-color: #c9a84c; color: #000; padding: 15px 35px; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; display: inline-block;">INITIALIZE CONTACT</a>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td align="center" style="padding: 30px; background-color: #0d0d0d; border-top: 1px solid #222;">
                        <p style="font-size: 11px; color: #555; letter-spacing: 0.1em; margin: 0;">
                          PROPRIETARY TRANSMISSION &copy; 2025 SASHWIN FOUNDATION<br/>
                          ENGINEERED BY ANTIGRAVITY FOR LEGACY INTEGRITY
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: "Failed to transmit lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
