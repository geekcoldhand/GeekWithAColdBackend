"use client";
import "./Sandbox.css";
import React, { useEffect, useRef, useState } from "react";
import { useProductsContext } from "../../context/ProductContext";
import { StaticImageData } from "next/image";
import Image from 'next/image';

// Define the types
interface ItemState {
	isDragging: boolean;
	offsetX: number;
	offsetY: number;
}

interface ItemStateAndPosition {
	[key: string]: ItemState; // Allow string keys with values of type ItemState
}

interface Product {
	id: string;
	name: string;
	price: number;
	amount: number;
    image: string | StaticImageData ;
    description: string;
	stock: number;
	category: string;
}

export const Sandbox = () => {
	const { products } = useProductsContext();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const dragItemsRef = useRef<HTMLDivElement[]>([]);
	const [itemStateAndPosition, setItemStateAndPosition] =
		useState<ItemStateAndPosition>({});

	const setPositionItemsByClass = (items: HTMLDivElement[]) => {
		// Group items by their class
		const shirtItems: HTMLDivElement[] = [];
		const pantsItems: HTMLDivElement[] = [];
		const hatItems: HTMLDivElement[] = [];
		const otherItems: HTMLDivElement[] = [];

		// Categorize items
		items.forEach((item) => {
			if (item.classList.contains("shirt" || "hoodie" || "jacket" || "vest"|| "tie")) {
				shirtItems.push(item);
			} else if (item.classList.contains("pant")) {
				pantsItems.push(item);
			} else if (item.classList.contains("hat")) {
				hatItems.push(item);
			} else {
				otherItems.push(item);
			}
		});

		// seperatre postion groups
		setPositionGroup(shirtItems, 10, 100, 10); // shirts start at y=100
		setPositionGroup(pantsItems, 10, 300, 10); // pants start at y=300
		setPositionGroup(hatItems, 10, 50, 10); // hats start at y=50
		setPositionGroup(otherItems, 10, 200, 10); // others start at y=200
	}

	const setPositionGroup = (
		items: HTMLDivElement[],
		startX: number,
		startY: number,
		spacingX: number
	) => {
		items.forEach((item, index) => {
			// container bounds
			const container = document.getElementById("drag-container");
			const containerBoundsRect = container?.getBoundingClientRect();
			if (!containerBoundsRect) return;

			const maxX = containerBoundsRect.width - item.offsetWidth;
			const maxY = containerBoundsRect.height - item.offsetHeight;

			const currX = startX + Math.floor(Math.random() * (maxX - startX));

			item.style.left = `${Math.min(currX, maxX)}px`; // container width
			item.style.top = `${Math.min(startY, maxY)}px`; // container height
		});
	}

	const populateBoxesWithDelay = (items: HTMLDivElement[]) => {
		//add to product context
		setTimeout(() => {
			setPositionItemsByClass(items);
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
						GWACH
					</span>
				</div>
				
				{products.map((product, index) => (
					<Image
						className={`${product.category} box`}
						src={product.image}
						key={index}
						width={100}
						height={100}
						style={{ height: "auto" }}
						alt={product.name}
					/>
				))}
				
			</div>
		</div>
	);
};

export default Sandbox;