import "./Footer.css";
import whiteAtom from "../../public/svgs/whiteAtom.svg";
import Image from "next/image";

const Footer = () => {
	const quotes = [
		{
			id: 1,
			text: "You can never be overdressed or over educated.",
		},
		{
			id: 2,
			text: "Style leads -it's a way to say who you are without having to speak",
		},
		{
			id: 3,
			text: "Good style is as little as possible while saying as mush you possible.",
		},
		{
			id: 4,
			text: "People will stare. Make it worth their while",
		},

		{
			id: 5,
			text: "The joy of dressing is an art.",
		},
	];

	let num = Math.floor(Math.random() * quotes.length);
	let arr = quotes[num].text;
	console.log(arr);
	console.log(`
#  ┏┓┓ ┏┏┓┏┓┓┏
#  ┃┓┃┃┃┣┫┃ ┣┫
#  ┗┛┗┻┛┛┗┗┛┛┗
#             
`);
	return (
		<footer className="footer">
			<div className="social">
				<a href="https://www.instagram.com/gwach_shop/">
					<i className="bi bi-instagram "></i>
				</a>
				<a href="https://github.com/geekcoldhand">
					<i className="fa fa-github "></i>
				</a>
				<a href="https://www.youtube.com/channel/UCcesTsu0RH9FxMKHbFh9RWA">
					<i className="fa fa-youtube "></i>
				</a>
				<a href="https://www.linkedin.com/in/horatious-harris-41970a159/">
					<i className="fa fa-linkedin "></i>
				</a>
			</div>
			<div className="statement">
				<p> &copy; {new Date().getFullYear()} Powered by A Geek With A Cold Hand </p>

				<a href="https://github.com/geekcoldhand">
					<Image
						className="logo"
						src={whiteAtom.src}
						width={50}
						height={50}
						style={{ height: "auto" }}
						alt="logo"
					/>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
