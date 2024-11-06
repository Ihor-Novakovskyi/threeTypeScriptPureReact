import * as THREE from "three";
import type { Shape } from "../../ThreeUtils/create3D";
import { isMobile } from "../../enums/threeSettings";
import { updateCamera } from "../../ThreeUtils/create3D";
import type { Sets } from "../../ThreeUtils/geometry";
import createGeometry from "../../ThreeUtils/geometry";
import type { CloseLoadPage } from "./LoadPage";
import { closeFullScreenMode } from "../../Controllers/fullScreenController";
// createGeometry({ type: nameDrawingFigure, settings })
interface ElementForLoadPageInterface {
	canvas: HTMLElement;
	geometries: FiguresLoadContainer;
	closeLoadPage: CloseLoadPage;
}
export type FiguresLoadContainer = Array<Sets>;
export default function createElementForLoadPage({
	canvas,
	geometries,
	closeLoadPage,
}: ElementForLoadPageInterface) {
    document.body.style.overflow = "hidden";

	const typesGeometryElements = geometries.map(createGeometry);
	const position = [
		{ startAngle: Math.round(120 / 57.3) },
		{ startAngle: Math.round(240 / 57.3) },
		{ startAngle: Math.round(360 / 57.3) },
	];
	const group = new THREE.Group();
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		document.documentElement.clientWidth /
			document.documentElement.clientHeight,
		0.1,
		1000
	);
	const renderer = new THREE.WebGLRenderer({ canvas });
	let isMovingToCenter = true;
	const maxRadiusDistance = 4;
	const minRadiusDistance = 1;
	let movingDistance = maxRadiusDistance;
	const stepToCenterMove = 0.01;
	const stepToLeaveCenterMove = 0.05;
	let isLoadPageOpen = true;
	let userCanCloseLoadPageAfterDelay = false;
	let date = Date.now();
	const material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true,
	});
	renderer.setSize(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	typesGeometryElements.forEach((geometry) => {
		const shape = new THREE.Mesh(geometry, material);
		group.add(shape);
	});
	scene.add(group);
	scene.add(camera);
	camera.position.z = isMobile ? 13 : 8;
	renderer.render(scene, camera);
	// document.body.style.overflow = 'hidden';
	canvas.addEventListener("mousemove", leaveCenterWhenMouseMove);
	setTimeout(delayBeforeUserCanCloseLoadingPage, 4000);
	canvas.addEventListener("click", loadPageFullScreenController);
	window.addEventListener("resize", updateCameraLoadPageWhenResize);
	animateRotation();

	function updatePositionShapes({
		geometry,
		id,
		tick,
	}: {
		geometry: Shape;
		id: number;
		tick: number;
	}) {
		geometry.position.x =
			movingDistance * Math.cos(tick / 1000 + position[id].startAngle);
		geometry.position.y =
			movingDistance * Math.sin(tick / 1000 + position[id].startAngle);
		geometry.rotation.x += 0.01;
		geometry.rotation.z += 0.01;
	}

	function animateRotation(tick: number = 0) {
		if (isLoadPageOpen) {
			if (minRadiusDistance > movingDistance - stepToCenterMove) {
				isMovingToCenter = false;
			} else if (movingDistance + stepToLeaveCenterMove > maxRadiusDistance) {
				isMovingToCenter = true;
			}
			if (isMovingToCenter) {
				//300 количесвто циклов по прибилижению элементров к ценру осей
				movingDistance -= stepToCenterMove;
				camera.position.z -= 0.02;
			} else {
				movingDistance += stepToLeaveCenterMove;
				//60 количество циклов выполнения условия по достижению удаления элемнта
				camera.position.z += 0.1;
			}
			const { children } = group;
			children.forEach((geometry, id) =>
				updatePositionShapes({ geometry: geometry as Shape, id, tick })
			);
			renderer.render(scene, camera);
			window.requestAnimationFrame(animateRotation);
		} else {
			closeLoadPage();
			window.removeEventListener("resize", updateCameraLoadPageWhenResize);
		}
	}

	function leaveCenterWhenMouseMove() {
		isMovingToCenter = false;
	}

	function loadPageFullScreenController() {
		userCanCloseLoadPageAfterDelay
			? closeLoadPageAndExitFullScreen()
			: openLoadPageInFullScreen();
	}
	function closeLoadPageAndExitFullScreen() {
		const isLoadPageInFullScreen = !!document.fullscreenElement;
		isLoadPageOpen = false; //this action stop animation(animation function have condition with this prop)
		isLoadPageInFullScreen ? closeFullScreenMode() : void 0;
		document.body.style.overflow = "";
	}
	function openLoadPageInFullScreen() {
		const isLoadNotOpenInFullScreen = !document.fullscreenElement;
		isLoadPageOpen && isLoadNotOpenInFullScreen
			? canvas.requestFullscreen()
			: void 0;
	}
	function delayBeforeUserCanCloseLoadingPage() {
		userCanCloseLoadPageAfterDelay = true;
	}
	function updateCameraLoadPageWhenResize() {
		updateCamera({ camera, renderer });
	}
}
