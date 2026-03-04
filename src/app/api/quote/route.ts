import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const YOUR_EMAILS = [
    process.env.QUOTE_EMAIL_1,
    process.env.QUOTE_EMAIL_2,
].filter(Boolean) as string[];

function sanitizeInput(str: string): string {
    return str.replace(/[<>"'&]/g, "");
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { property, bill, name, email, phone, area } = body;

        if (!property || !bill || !name || (!email && !phone)) {
            return NextResponse.json(
                { error: "Please fill in all required fields" },
                { status: 400 }
            );
        }

        if (email && !validateEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        const sanitizedName = sanitizeInput(String(name).slice(0, 100));
        const sanitizedEmail = email ? sanitizeInput(String(email).slice(0, 100)) : "";
        const sanitizedPhone = phone ? sanitizeInput(String(phone).slice(0, 20)) : "";
        const sanitizedArea = area ? sanitizeInput(String(area).slice(0, 100)) : "";
        const sanitizedProperty = sanitizeInput(String(property).slice(0, 50));
        const sanitizedBill = sanitizeInput(String(bill).slice(0, 50));

        if (YOUR_EMAILS.length === 0) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const emailPromises = YOUR_EMAILS.map(toEmail => 
            resend.emails.send({
                from: "Enewable Quotes <quotes@enewable.co.za>",
                to: toEmail,
                subject: `New Quote Request from ${sanitizedName}`,
                html: `
                    <h2>New Solar Quote Request</h2>
                    <p><strong>Name:</strong> ${sanitizedName}</p>
                    <p><strong>Email:</strong> ${sanitizedEmail || "Not provided"}</p>
                    <p><strong>Phone:</strong> ${sanitizedPhone || "Not provided"}</p>
                    <p><strong>Area:</strong> ${sanitizedArea || "Not provided"}</p>
                    <p><strong>Property Type:</strong> ${sanitizedProperty}</p>
                    <p><strong>Monthly Bill:</strong> ${sanitizedBill}</p>
                    <hr>
                    <p>Submitted: ${new Date().toLocaleString("en-ZA")}</p>
                `,
            })
        );
        
        await Promise.all(emailPromises);

        if (sanitizedEmail && validateEmail(sanitizedEmail)) {
            await resend.emails.send({
                from: "Enewable Quotes <quotes@enewable.co.za>",
                to: sanitizedEmail,
                subject: "We've Received Your Quote Request! 🌞",
                html: `
                    <h2>Hi ${sanitizedName},</h2>
                    <p>Thank you for requesting a solar quote from Enewable!</p>
                    <p>We've received your details and our team will review your requirements:</p>
                    <ul>
                        <li><strong>Property:</strong> ${sanitizedProperty}</li>
                        <li><strong>Current Bill:</strong> ${sanitizedBill}</li>
                    </ul>
                    <p><strong>What happens next?</strong></p>
                    <ol>
                        <li>Rob or one of our engineers will call you within 24 hours</li>
                        <li>We'll schedule a free site assessment at your convenience</li>
                        <li>You'll receive a custom system design and quote within 2-3 days</li>
                    </ol>
                    <p>Questions? Call Rob Bagley at <a href="tel:+27829006199">+27 82 900 6199</a></p>
                    <p>Power your independence!<br>The Enewable Team</p>
                `,
            });
        }

        return NextResponse.json({ 
            success: true,
            message: "Quote request submitted successfully!"
        });

    } catch (error) {
        console.error("Quote submission error:", error);
        return NextResponse.json(
            { error: "Failed to submit quote request. Please try again." },
            { status: 500 }
        );
    }
}
