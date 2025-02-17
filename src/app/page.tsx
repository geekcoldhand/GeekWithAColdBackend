import SplashPage from "../components/Splash/Splash";
import NavBar from "../components/Navbar/Navbar";
import { CartProvider } from "@/context/CartContext";
import Banner from "@/components/Banner/Banner";
import Link from "next/link";

export default function Home() {
	return (
		<div className="info">
			<Banner />
			<div className="hero">
				<div className="content">
					<div className="head">
						<h1>Simple Sophistication </h1>
						<p>
							Shop Ivy League, our new collection of clothes, bags, head-gear
							and more
						</p>

						<Link href="/products">
							<button>Start Shopping</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="drag-section">
				{/* <DragZone/> */}

				{/* <Footer/> */}
			</div>
		</div>
	);
}
