import Error from "next/error";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const { context } = await req.json();
		if (!context) {
			return NextResponse.json(
				{ message: "context is required." },
				{ status: 400 }
			);
		}

		try {
			const response = await resend.emails.send({
				from: "onboarding@resend.dev",
				to: "6786208782@tmomail.net",
				subject: "GWACH New Booking Confirmation",
				html: `<h1>A new booking has been made on with GWACH </h1>
			<h2> Here are the details of the booking: </h2>
			<p> ${context} </p>`,
			});
			console.log(response);
			return NextResponse.json(
				{ message: "Email sent successfully!" },
				{ status: 200 }
			);
		} catch (error: any) {
			return NextResponse.json(
				{ error: error.message || "Failed to set date in email" },
				{ status: 500 }
			);
		}
	} catch (error: any) {
		console.error("Error sending email:", error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
