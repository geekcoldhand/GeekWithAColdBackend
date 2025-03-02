'use client';
import Image from "next/image";
import "./Splash.css";
import { useState, useEffect } from 'react';
import whiteLogo from "../../public/svgs/whiteAtom.svg";

export default function SplashPage() {
  const [splashIsVisible, setShowSplash] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
       setShowSplash(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);


	return splashIsVisible ? (
		<div id="splash">
			{" "}
			<div className="splash-container">
				<div className="splash-logo">
					<Image
						src={whiteLogo}
						className="splash-image"
						alt="logo"
						priority
						width={24}
						height={20}
						style={{ width: 'auto' }}
					/>
				</div>
			</div>
		</div>
	) : null;
}
