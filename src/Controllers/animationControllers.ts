import { THREE_SETTINGS } from "../enums/threeSettings";
import type { ShapesAndOwnPropsContainerType } from "../Pages/Main/useControllsHooks";
import { ShapeAndOwnPropsInterface } from "../ThreeUtils/create3D";
export default function createShapesAnimation(
	shapesAndOwnPropsContainer: ShapesAndOwnPropsContainerType
) {
	let isAnimationRunning = true;
	let nowTime = Date.now();
	function animate() {
		if (isAnimationRunning) {
			const currentTime = Date.now();
			const delta = currentTime - nowTime;
			nowTime = currentTime;
			shapesAndOwnPropsContainer.forEach((shapeAndOwnProps) =>
				setAnimationProps(shapeAndOwnProps, delta)
			);
			window.requestAnimationFrame(animate);
		}
		return void 0;
	}

	function stopShapesAnimation() {
		isAnimationRunning = false;
	}

	return {
		runShapesAnimation: () => animate(),
		stopShapesAnimation,
	};
}

function animateScaling(
	shapeAndOwnProps: ShapeAndOwnPropsInterface,
	step: number
) {
	const stepToScale = step / 500;
	const stepToUnScale = step / 100;
	const { isShapeInCenter, shape } = shapeAndOwnProps;
	const isScale = isShapeInCenter;
	const zPosition = shape.position.z;
	switch (isScale) {
		case true:
			THREE_SETTINGS.MAX_SCALE_SHAPE >= zPosition + stepToScale
				? (shape.position.z += stepToScale)
				: (shape.position.z = THREE_SETTINGS.MAX_SCALE_SHAPE);
			return;
		case false:
			zPosition - stepToUnScale > THREE_SETTINGS.DEFAULT_SCALE
				? (shape.position.z -= stepToUnScale)
				: (shape.position.z = THREE_SETTINGS.DEFAULT_SCALE);
			return;
	}
}
function setAnimationProps(
	shapeAndOwnProps: ShapeAndOwnPropsInterface,
	delta: number
) {
	const { shape, render } = shapeAndOwnProps;
	const step = (0.01 * delta) / 10;
	shape.rotation.y += step;
	shape.rotation.x += step;
	animateScaling(shapeAndOwnProps, delta);
	render();
}
