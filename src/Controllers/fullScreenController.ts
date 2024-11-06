import type { ShapeAndOwnPropsInterface } from "../ThreeUtils/create3D";
import  { isMobile } from "../enums/threeSettings";
export  function fullScreenControllerProps(shapeAndOwnProps: ShapeAndOwnPropsInterface) {
    let isDblTouchForMobileDevice = false;
	function dblClickCheckerAndFullScreenModeController() {
		if (isDblTouchForMobileDevice) {
			isDblTouchForMobileDevice = false;
			controllFullScreenMode();
		} else {
			isDblTouchForMobileDevice = true;
			setTimeout(() => (isDblTouchForMobileDevice = false), 200);
		}
	}

	function controllFullScreenMode() {
		const { isShapeInCenter, canvas } = shapeAndOwnProps;
		const isFullScreen = document.fullscreenElement !== null;
		if (isFullScreen) {
			closeFullScreenMode();
		} else {
			isShapeInCenter ? canvas.requestFullscreen() : void 0;
		}
	}
	function moveElementInFullScreenMode(e: React.MouseEvent) {
		const { clientX, clientY } = e;
		const { isShapeInCenter,canvas, camera } = shapeAndOwnProps;
		const canvasInFullScreen = document.fullscreenElement === canvas;
		isShapeInCenter && canvasInFullScreen
			? moveCameraDuringMouseMoveInFullscreen({
					camera,
					clientX,
					clientY,
			  })
			: void 0;
    }
    const deskTopDevice = {
        onTouchStart: null,
        onMouseMove: moveElementInFullScreenMode,
        onDoubleClick: controllFullScreenMode
    };
    const mobileDevice = {
        onTouchStart: dblClickCheckerAndFullScreenModeController,
        onMouseMove: null,
        onDoubleClick: null,
    }
    return isMobile ? mobileDevice : deskTopDevice;
}
export function closeFullScreenMode() {
	const isElementInFullScreen = document.fullscreenElement !== null;
	isElementInFullScreen ? document.exitFullscreen() : void 0;
}
function moveCameraDuringMouseMoveInFullscreen({
	clientX,
	clientY,
	camera,
}: {
	clientX: number;
	clientY: number;
	camera: any;
}): void {
	const normolizeX = clientX / document.documentElement.clientWidth - 0.5;
	const normolizeY = clientY / document.documentElement.clientHeight - 0.5;
	camera.rotation.y = normolizeX;
	camera.rotation.x = normolizeY;
}