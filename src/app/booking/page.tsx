'use client';
import React, { useState } from 'react';
import "./booking.css";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Handle confirm button click
  const handleConfirm = async () => {
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    try {
      // Call the backend API to send the email
      const response = await fetch('/api/booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
        }),
      });

      if (response.ok) {
        alert('Thank You! We will get back to you soon to confirm your booking.');
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Consultation</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="date-input"
      />
      <button onClick={handleConfirm} className="confirm-button">
             Book
      </button>
    </div>
  );
};

export default Booking;