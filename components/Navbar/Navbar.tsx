"use client"; // Mark this component as a Client Component

import React, { useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "../../context/CartContext";
import "./Navbar.css";
import whiteAtomLogo from "../../public/svgs/whiteAtom.svg";
import Image from "next/image";

const Navbar: React.FC = () => {
	//const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
	//const isUser = isAuthenticated && user;
	const { state } = useGlobalContext();
	const amount = state.amount;

	useEffect(() => {
		const hamMenu = document.querySelector(".ham-menu");
		const offScreenLinks = document.querySelector(".off-screen-links");
		const links = document.querySelectorAll(".links");

		const toggleMenu = () => {
			hamMenu?.classList.toggle("active");
			offScreenLinks?.classList.toggle("active");
		};

		if (hamMenu && offScreenLinks) {
			hamMenu.addEventListener("click", toggleMenu);
		}

		// Add click event to each link
		if (links) {
			links.forEach((link) => {
				link.addEventListener("click", toggleMenu);
			});
		}

		// Cleanup
		return () => {
			if (hamMenu) {
				hamMenu.removeEventListener("click", toggleMenu);
			}
			if (links) {
				links.forEach((link) => {
					link.removeEventListener("click", toggleMenu);
				});
			}
		};
	}, []);

	return (
		<div className="nav">
			<div className="nav-container">
				<ul className="off-screen-links">
					<li className="links">
						<Link href="/">
							<Image id="nav-logo" src={whiteAtomLogo.src} alt="logo" width={30} height={30}></Image>
						</Link>
					</li>
					<li className="links">
						<Link href="/products">Atelier</Link>
					</li>
					<li className="links">
						<Link href="/booking">Booking</Link>
					</li>
					<li className="links">
						<Link href="/products#drag-container">Closet</Link>
					</li>
				</ul>
				<nav className="ham-menu-container">
					<div className="ham-menu">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</nav>
				<Link href="/">
					<label className="nav-name nav-logo">GWACH</label>
				</Link>
				<div className="nav-item">
					<div className="amount-container">
						<p className="total-amount">{amount}</p>
					</div>
					<Link href="/cart">
						<svg
							className="cart-icon"
							data-slot="icon"
							fill="none"
							width="24"
							height="24"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125
                1.125 0 0 1-1.12-1.243l1.264-12A1.125
                1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375
                0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
							></path>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
