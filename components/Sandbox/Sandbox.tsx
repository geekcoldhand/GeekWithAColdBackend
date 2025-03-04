"use client";
import "./Sandbox.css";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "../../public/svgs/whiteAtom.svg";
// ACCESORIES
import vest2 from "../../public/images/clothes/vest2.png";
import hat1 from "../../public/images/clothes/hat1.png";
import hat2 from "../../public/images/clothes/hat2.png";
// TOPS
import jacket1 from "../../public/images/clothes/jacket1.png";
import jacket2 from "../../public/images/clothes/jacket2.png";
import shirt1 from "../../public/images/clothes/shirt1.png";
import shirt3 from "../../public/images/clothes/shirt3.png";
import shirt4 from "../../public/images/clothes/shirt4.png";
import shirt5 from "../../public/images/clothes/shirt5.png";
import shirt6 from "../../public/images/clothes/shirt6.png";
// PANTS
import pant1 from "../../public/images/clothes/pant1.png";
import pant3 from "../../public/images/clothes/pant3.png";
import pant4 from "../../public/images/clothes/pant4.png";
import pant5 from "../../public/images/clothes/pant5.png";
import pant6 from "../../public/images/clothes/pant6.png";
import pant7 from "../../public/images/clothes/pant7.png";

// Define the types
interface ItemState {
	isDragging: boolean;
	offsetX: number;
	offsetY: number;
}

interface ItemStateAndPosition {
	[key: string]: ItemState; // Allow string keys with values of type ItemState
}

const Sandbox = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const dragItemsRef = useRef<HTMLDivElement[]>([]);
	const [itemStateAndPosition, setItemStateAndPosition] =
		useState<ItemStateAndPosition>({});

	let count = 190;
	const alignItemPosition = (item: HTMLDivElement) => {
		count = count + 50;
		const container = containerRef.current;
		const containerBoundsRect = container?.getBoundingClientRect();
		if (!containerBoundsRect) return;
		const maxY = containerBoundsRect.height - item.offsetHeight - count;
		item.style.top = `${maxY}px`;
	};

	function positionItemsByClass(items: HTMLDivElement[]) {
		// Group items by their class
		const shirtItems: HTMLDivElement[] = [];
		const pantsItems: HTMLDivElement[] = [];
		const hatItems: HTMLDivElement[] = [];
		const otherItems: HTMLDivElement[] = [];

		// Categorize items
		items.forEach((item) => {
			if (item.classList.contains("shirt")) {
				shirtItems.push(item);
			} else if (item.classList.contains("pants")) {
				pantsItems.push(item);
			} else if (item.classList.contains("hats")) {
				hatItems.push(item);
			} else {
				otherItems.push(item);
			}
		});

		// Position each item group separately
		positionGroup(shirtItems, 10, 50, 10); // shirts start at y=100
		positionGroup(pantsItems, 10, 300, 10); // pants start at y=300
		positionGroup(hatItems, 10, 50, 10); // hats start at y=50
		positionGroup(otherItems, 10, 200, 10); // others start at y=200
	}

	function positionGroup(
		items: HTMLDivElement[],
		startX: number,
		y: number,
		spacingX: number
	) {
		items.forEach((item, index) => {
			//const x = startX + index * (item.offsetWidth + spacingX); // Calculate X position

			// Ensure the item stays within the container bounds
			const container = document.getElementById("drag-container");
			const containerBoundsRect = container?.getBoundingClientRect();
			if (!containerBoundsRect) return;

			const maxX = containerBoundsRect.width - item.offsetWidth;
			const maxY = containerBoundsRect.height - item.offsetHeight;

			const x = startX + Math.floor(Math.random() * (maxX - startX));

			item.style.left = `${Math.min(x, maxX)}px`; // Ensure X position doesn't exceed container width
			item.style.top = `${Math.min(y, maxY)}px`; // Ensure Y position doesn't exceed container height
		});
	}

	const populateBoxesWithDelay = (items: HTMLDivElement[]) => {
		setTimeout(() => {
			positionItemsByClass(items);
		}, 100); // You might want a single delay or other strategy
	};

	const handleAddMetaData = (e: Event) => {
		e.preventDefault();
		// window.open('https://');
	};

	const startDrag = (
		moveClientX: number,
		moveClientY: number,
		index: number,
		item: HTMLDivElement
	) => {
		setItemStateAndPosition((prevState) => ({
			...prevState,
			[index]: {
				isDragging: true,
				offsetX: moveClientX - item.offsetLeft + 23,
				offsetY: moveClientY - item.offsetTop + 34,
			},
		}));
	};

	const isStateDragging = (moveClientX: number, moveClientY: number) => {
		setItemStateAndPosition((prevState) => {
			const newState = { ...prevState };
			Object.keys(newState).forEach((key) => {
				const state = newState[key];
				if (state.isDragging) {
					if (!containerRef.current) return;
					const item = dragItemsRef.current[Number(key)]; // Convert key to number for indexing
					const x = moveClientX - state.offsetX;
					const y = moveClientY - state.offsetY;

					const maxX = containerRef.current.offsetWidth - item.offsetWidth;
					const maxY = containerRef.current.offsetHeight - item.offsetHeight;

					item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
					item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
				}
			});
			return newState;
		});
	};

	let moved = false;
	let touchedOrClicked = false;
	let itemWasDragged = false;

	const handleMouseDown = (
		e: MouseEvent,
		index: number,
		item: HTMLDivElement
	) => {
		e.preventDefault();
		touchedOrClicked = true;
		moved = false;
		//item.classList.add('grow-on-drag');
		startDrag(e.clientX, e.clientY, index, item);
	};

	const handleTouchStart = (
		e: TouchEvent,
		index: number,
		item: HTMLDivElement
	) => {
		e.preventDefault();
		touchedOrClicked = true;
		moved = false;
		//item.classList.add('grow-on-drag');
		startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
	};

	useEffect(() => {
		dragItemsRef.current = Array.from(
			document.querySelectorAll(".box")
		) as HTMLDivElement[];
		const container = containerRef.current;

		// Populate boxes with delay on mount
		populateBoxesWithDelay(dragItemsRef.current);

		const handleMouseMove = (e: MouseEvent) => {
			e.preventDefault();
			if (touchedOrClicked) {
				itemWasDragged = true;
				moved = true;
				isStateDragging(e.clientX, e.clientY);
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			e.preventDefault();
			if (touchedOrClicked) {
				itemWasDragged = true;
				moved = true;
				isStateDragging(e.touches[0].clientX, e.touches[0].clientY);
			}
		};

		const handleMouseUp = (e: MouseEvent) => {
			e.preventDefault();
			if (itemWasDragged) {
				setItemStateAndPosition((prevState) => {
					const newState = { ...prevState };
					Object.keys(newState).forEach((key) => {
						newState[key].isDragging = false;
					});
					return newState;
				});
			}
			if (!moved) {
				handleAddMetaData(e);
			}
			touchedOrClicked = false;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (itemWasDragged) {
				setItemStateAndPosition((prevState) => {
					const newState = { ...prevState };
					Object.keys(newState).forEach((key) => {
						newState[key].isDragging = false;
					});
					return newState;
				});
			}
			if (!moved) {
				handleAddMetaData(e);
			}
			touchedOrClicked = false;
		};

		container?.addEventListener("mousemove", handleMouseMove);
		container?.addEventListener("touchmove", handleTouchMove);
		container?.addEventListener("mouseup", handleMouseUp);
		container?.addEventListener("touchend", handleTouchEnd);

		dragItemsRef.current.forEach((item, index) => {
			item.addEventListener("mousedown", (e: MouseEvent) =>
				handleMouseDown(e, index, item)
			);
			item.addEventListener("touchstart", (e: TouchEvent) =>
				handleTouchStart(e, index, item)
			);
		});

		return () => {
			container?.removeEventListener("mousemove", handleMouseMove);
			container?.removeEventListener("touchmove", handleTouchMove);
			container?.removeEventListener("mouseup", handleMouseUp);
			container?.removeEventListener("touchend", handleTouchEnd);

			dragItemsRef.current.forEach((item, index) => {
				item.removeEventListener("mousedown", (e: MouseEvent) =>
					handleMouseDown(e, index, item)
				);
				item.removeEventListener("touchstart", (e: TouchEvent) =>
					handleTouchStart(e, index, item)
				);
			});
		};
	}, []);

	return (
		<div id="window-background">
			<div id="drag-container" ref={containerRef}>
				<div className="macos-button-box">
					<button className="macos-buttons red"></button>
					<button className="macos-buttons green"></button>
					<button className="macos-buttons yellow"></button>
					<span className="macos-text">
						{/* <Image src={logo.src} alt="logo" width={40} height={40}/> */}
					</span>
				</div>
				<Image
					className="box pants"
					src={pant1.src}
					width="100"
					height="100"
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box pants"
					src={pant3.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box pants"
					src={pant4.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box pants"
					src={pant5.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box pants"
					src={pant6.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box pants"
					src={pant7.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={shirt1.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={shirt4.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={shirt5.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={shirt3.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={shirt6.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={vest2.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={jacket1.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					className="box shirts"
					src={jacket2.src}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
				/>
				<Image
					src={hat1}
					width={100}
					height={80}
					style={{ height: "auto" }}
					alt="logo"
					className="box hats"
				/>
				<Image
					src={hat2}
					width={100}
					height={100}
					style={{ height: "auto" }}
					alt="logo"
					className="box hats"
				/>
			</div>
		</div>
	);
};

export default Sandbox;
