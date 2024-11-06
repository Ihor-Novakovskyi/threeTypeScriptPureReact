import React, { useRef, useEffect, useState } from "react";
import type { ShapeAndOwnPropsInterface } from "../../ThreeUtils/create3D";
import type { NameGeometry } from "../../ThreeUtils/geometry";
import Create3DShapeWithOwnProps from "../../ThreeUtils/create3D";
import { fullScreenControllerProps } from "../../Controllers/fullScreenController";
import createGeometry from "../../ThreeUtils/geometry";
import type { ShapesAndOwnPropsContainerType } from "../../Pages/Main/useControllsHooks";
interface FigureInterface {
	setShapesAndOwnPropsContainer: (
		addNewPropToCurrentProps:
			| ((
					shapesWithPropsContainer: ShapesAndOwnPropsContainerType
			  ) => ShapesAndOwnPropsContainerType)
			| ShapesAndOwnPropsContainerType
	) => void;
}
interface DrawingSettings extends FigureInterface {
	nameDrawingFigure: NameGeometry;
	settings: Array<number>;
}
function Drawing(props: DrawingSettings) {
	const [shapeAndOwnProps, setShapesAndOwnProps] =
		useState<ShapeAndOwnPropsInterface | null>(null);
	const { setShapesAndOwnPropsContainer, nameDrawingFigure, settings } = props;
	const ref = useRef(null);
	const { current: canvas } = ref;
	const isObjectCreatedInRenderTree = canvas !== null;
    useEffect(() => {
        
		console.log("useEffect run");
        if (isObjectCreatedInRenderTree) {

			const shapeWithProps = new Create3DShapeWithOwnProps(
				canvas,
				createGeometry({ type: nameDrawingFigure, settings })
			);
			setShapesAndOwnProps(shapeWithProps); //for current compoment
			setShapesAndOwnPropsContainer((shapesWithPropsContainer) => {
				console.log("change state function");
				shapesWithPropsContainer.push(shapeWithProps);
				return [...shapesWithPropsContainer];
			});
		}
	}, [isObjectCreatedInRenderTree]);
	const setPropsForCanvas: {} | ShapeAndOwnPropsInterface =
		shapeAndOwnProps !== null
			? fullScreenControllerProps(shapeAndOwnProps)
			: {};
	return <canvas className="canvas" ref={ref} {...setPropsForCanvas} />;
}
export function Cube(props: FigureInterface) {
	return (
		<Drawing
			{...props}
			nameDrawingFigure="CUBE"
			settings={[1, 1, 1, 10, 10, 10]}
		/>
	);
}
export function Tetrahedron(props: FigureInterface) {
	return (
		<Drawing {...props} nameDrawingFigure="TETRAHEDRON" settings={[1, 0]} />
	);
}
export function Cylinder(props: FigureInterface) {
	return (
		<Drawing {...props} nameDrawingFigure="CYLINDER" settings={[1, 1, 1, 32]} />
	);
}
export function Torus(props: FigureInterface) {
	return <Drawing {...props} nameDrawingFigure="TORUS" settings={[]} />;
}
