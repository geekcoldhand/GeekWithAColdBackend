'use client';
import Image from "next/image";
import "./Splash.css";
import { useState, useEffect } from 'react';

export default function SplashPage() {
  const [splashIsVisible, setShowSplash] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
        setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


	return splashIsVisible ? (
		<div id="splash">
			{" "}
			<div className="splash-container">
				<div className="splash-logo">
					<Image
						src="/images/triAtom.png"
						className="splash-image"
						alt="logo"
						priority
						width={240}
						height={200}
						style={{ width: 'auto', height: 'auto' }}
					/>
				</div>
			</div>
		</div>
	) : null;
}
