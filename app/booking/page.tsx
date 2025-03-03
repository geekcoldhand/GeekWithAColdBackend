"use client";
import React, { useState } from "react";
import "./booking.css";

const Booking = () => {
	const [selectedDate, setSelectedDate] = useState<string>("");

	// Handle date input change
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedDate(e.target.value);
	};

	// Handle confirm button click
	const handleConfirm = async () => {
		if (!selectedDate) {
			alert("Please select a date.");
			return;
		}

		try {
			// Call the backend API to send the email
			const response = await fetch("/api/booking-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					date: selectedDate,
				}),
			});

			if (response.ok) {
				alert(
					"Thank You! We will get back to you soon to confirm your booking."
				);
			} else {
				alert("Failed to send email. Please try again.");
			}
		} catch (error) {
			console.error("Error sending email:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className="booking-container">
			<h1 className="booking-title">Book Consultation</h1>

			<div className="graphics-container">
				<svg
					data-slot="icon"
					fill="none"
					strokeWidth=".5"
					stroke="currentColor"
					width="auto"
					height={24}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
					></path>
				</svg>

				<svg
					data-slot="icon"
					fill="none"
					strokeWidth=".5"
					stroke="currentColor"
					viewBox="0 0 24 24"
					width="auto"
					height={24}
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					></path>
				</svg>

				<svg
					data-slot="icon"
					fill="#e3e3e3"
					stroke="currentColor"
					height="24px"
					strokeWidth={0.5}
					viewBox="0 0 24 24"
					width="auto"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
					></path>
				</svg>
			</div>
			<div className="client-input-container">
				<input
					type="date"
					value={selectedDate}
					onChange={handleDateChange}
					className="date-input"
				/>

				<input
					type="number"
					className="number-input"
					placeholder="cell-number"
					maxLength={10}
				/>
				<input type="text" className="message-input" placeholder="message" />
				<button onClick={handleConfirm} className="confirm-button">
					Book
				</button>
			</div>
		</div>
	);
};

export default Booking;
