import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globalStyles.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "@/components/Navbar/Navbar";
import SplashPage from "@/components/Splash/Splash";
import { ProductsProvider } from "../context/ProductContext";
import StripeCheckout from "../components/StripeCheckout/StripeCheckout";

// TODO import Errorpage
//TODO const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ProductsProvider>
					<CartProvider>
						<SplashPage />
						<Navbar />
						{children}
					</CartProvider>
				</ProductsProvider>
			</body>
		</html>
	);
}
