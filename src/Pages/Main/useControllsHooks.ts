import React, { useState, useEffect } from "react";
import createScrollController from "../../Controllers/scrollController";
import { ShapeAndOwnPropsInterface } from "../../ThreeUtils/create3D";
import createShapesAnimation from "../../Controllers/animationControllers";

export type ShapesAndOwnPropsContainerType = Array<ShapeAndOwnPropsInterface>;

export default function useScrollAndAтimationControlls() {
	const [shapesAndOwnPropsContainer, setShapesAndOwnPropsContainer] = useState<
		[] | ShapesAndOwnPropsContainerType
	>([]);
	const isShapesCreatedInContainer = !!shapesAndOwnPropsContainer.length;
	useEffect(() => {
		if (isShapesCreatedInContainer) {
			console.log("run useeffect twice");
			const { resize, scroll, toDrawElementWhenPageWasLoaded } =
				createScrollController(shapesAndOwnPropsContainer);
			const { runShapesAnimation, stopShapesAnimation } = createShapesAnimation(
				shapesAndOwnPropsContainer
			);
			toDrawElementWhenPageWasLoaded(); //first render shapes
			window.addEventListener("scroll", scroll);
			window.addEventListener("resize", resize);
			runShapesAnimation();
			return () => {
				window.removeEventListener("scroll", scroll);
				window.removeEventListener("resize", resize);
				stopShapesAnimation();
			};
		}
		return void 0;
	}, [shapesAndOwnPropsContainer]);
	return setShapesAndOwnPropsContainer;
}
