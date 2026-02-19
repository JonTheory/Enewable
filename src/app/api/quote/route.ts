import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Your email where you want to receive quote requests
const YOUR_EMAIL = "rob@enewable.co.za"; // Update this to your actual email

export async function POST(request: Request) {
    try {
        const { property, bill, name, email, phone, area } = await request.json();

        // Validate required fields
        if (!property || !bill || !name || (!email && !phone)) {
            return NextResponse.json(
                { error: "Please fill in all required fields" },
                { status: 400 }
            );
        }

        // Email to you (the business owner)
        await resend.emails.send({
            from: "Enewable Quotes <quotes@enewable.co.za>",
            to: YOUR_EMAIL,
            subject: `New Quote Request from ${name}`,
            html: `
                <h2>New Solar Quote Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email || "Not provided"}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Area:</strong> ${area || "Not provided"}</p>
                <p><strong>Property Type:</strong> ${property}</p>
                <p><strong>Monthly Bill:</strong> ${bill}</p>
                <hr>
                <p>Submitted: ${new Date().toLocaleString("en-ZA")}</p>
            `,
        });

        // Confirmation email to customer (if they provided email)
        if (email) {
            await resend.emails.send({
                from: "Enewable Solar <hello@enewable.co.za>",
                to: email,
                subject: "We've Received Your Quote Request! 🌞",
                html: `
                    <h2>Hi ${name},</h2>
                    <p>Thank you for requesting a solar quote from Enewable!</p>
                    <p>We've received your details and our team will review your requirements:</p>
                    <ul>
                        <li><strong>Property:</strong> ${property}</li>
                        <li><strong>Current Bill:</strong> ${bill}</li>
                    </ul>
                    <p><strong>What happens next?</strong></p>
                    <ol>
                        <li>Rob or one of our engineers will call you within 24 hours</li>
                        <li>We'll schedule a free site assessment at your convenience</li>
                        <li>You'll receive a custom system design and quote within 2-3 days</li>
                    </ol>
                    <p>Questions? Reply to this email or call us at +27 (0) 11 000 0000</p>
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
