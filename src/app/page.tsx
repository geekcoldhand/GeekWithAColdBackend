import SplashPage from "../components/Splash/Splash";
import NavBar from "../components/Navbar/Navbar";
import { CartProvider } from "@/context/CartContext";
// const Cart = lazy(() => import("./pages/CartContent/CartItems"));
// const Homepage = lazy(() => import("./pages/Home/Home"));
// const Errorpage = lazy(() => import("./pages/Error/Error"));
// const Productlist = lazy(() => import("./pages/Products/ProductList"));
// const ProductDetails = lazy(() => import("./pages/SingleProduct/SingleProduct")

export default function Home() {
	return (
		<div>
			<SplashPage />
			<CartProvider>
				<NavBar />
			</CartProvider>
			<h1>Home</h1>
		</div>
	);
}
