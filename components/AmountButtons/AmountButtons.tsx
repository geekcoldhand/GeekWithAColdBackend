import React from "react";
import "./AmountButtons.css";

// Define the props interface
interface AmountButtonsProps {
	inc: () => void; // Function to increment the amount
	dec: () => void; // Function to decrement the amount
	amount: number; // Current amount
}

const AmountButtons = React.memo(function AmountButtons({
	inc,
	dec,
	amount,
}: AmountButtonsProps) {
	return (
		<div className="amount-btns">
			<button type="button" className="amount-btn" onClick={inc}>
				<svg
					data-slot="icon"
					fill="none"
					width={"1.5rem"}
					className="inc-dec-svg"
					strokeWidth={1.5}
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</button>
			<h3 className="amount">{amount}</h3>
			<button type="button" className="amount-btn" onClick={dec}>
				<svg
					data-slot="icon"
          fill="none"
          width={"1.5rem"}
					strokeWidth="1.5"
					className="inc-dec-svg"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 12h14"
					></path>
				</svg>
			</button>
		</div>
	);
});

export default AmountButtons;
