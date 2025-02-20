import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globalStyles.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "@/components/Navbar/Navbar";
import SplashPage from "@/components/Splash/Splash";
import { ProductsProvider } from "../context/ProductContext";
import Footer from "@/components/Footer/Footer";


// TODO import Errorpage
// TODO import footer
export const metadata = {
	title: "GWACH Atelier",
	icons: {
	  icon: "/svgs/whiteAtom.svg", // Path to your SVG favicon
	},
  };

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
						<Footer />
					</CartProvider>
				</ProductsProvider>
			</body>
		</html>
	);
}
