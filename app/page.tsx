import Banner from "../components/Banner/Banner";
import Link from "next/link";
import "./HomeCSS/home.css";


export default function Home() {
	console.log(`
#  ┏┓┓ ┏┏┓┏┓┓┏
#  ┃┓┃┃┃┣┫┃ ┣┫
#  ┗┛┗┻┛┛┗┗┛┛┗
#  `);
	return (
		<div className="info">
			{/* Video background */}
			<video autoPlay loop muted playsInline id="myVideo"> 
				<source src="/images/backgrounds/theHero.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<Banner />
			<div className="hero">
				<div className="content">
					<div className="head">
						<h1>Subtle Sophistication </h1>
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
		</div>
	);
}
