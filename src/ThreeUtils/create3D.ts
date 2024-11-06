import * as THREE from "three";
import { THREE_SETTINGS } from "../enums/threeSettings";

type GeometryType =
	| THREE.TetrahedronGeometry
	| THREE.BoxGeometry
	| THREE.CylinderGeometry
	| THREE.TorusGeometry;
interface ShapesPositionProps {
	startPositionX: number;
	startPositionY: number;
	endPositionX: number;
	endPositionY: number;
}
export type Camera = THREE.PerspectiveCamera;
export type Scene = THREE.Scene;
export type Renderer = THREE.WebGLRenderer;
export type Shape = THREE.Mesh<
	GeometryType,
	THREE.MeshBasicMaterial,
	THREE.Object3DEventMap
>;
export interface ShapeAndOwnPropsInterface {
	canvas: HTMLElement;
	shape: Shape;
	renderer: Renderer;
	scene: Scene;
	camera: Camera;
	isShapeInCenter: boolean;
	positionProps: ShapesPositionProps;
	topDistanceToCanvasElement: number;
	setDefaultPositionCameraAfterMouseMove: () => void;
	updateCameraRatioAfterResizeScreen: () => void;
	render: () => void;
}
export default class Create3DShapeWithOwnProps
	implements ShapeAndOwnPropsInterface
{
	scene: Scene;
	camera: Camera;
	render: () => void;
	renderer: Renderer;
	updateCameraRatioAfterResizeScreen: () => void;
	setDefaultPositionCameraAfterMouseMove: () => void;
	positionProps: ShapesPositionProps;
	isShapeInCenter: boolean;
	topDistanceToCanvasElement: number;
	canvas: HTMLElement;
	shape: Shape;
	constructor(canvas: HTMLElement, geometry: GeometryType) {
		const width = document.documentElement.clientWidth;
		const height = document.documentElement.clientHeight;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(width, height);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true,
		});
		const shape = new THREE.Mesh(geometry, material);
		this.canvas = canvas;
		this.shape = shape;
		this.scene = scene;
		this.camera = camera;
		this.render = () => renderer.render(scene, camera);
		this.setDefaultPositionCameraAfterMouseMove = () =>
			returnDefaultPositionCameraAfterFullScreen(camera);
		this.renderer = renderer;
		this.updateCameraRatioAfterResizeScreen = () => {
			updateCamera({ camera, renderer });
		};
		this.positionProps = {
			startPositionX: -10,
			startPositionY: 4,
			endPositionX: 0,
			endPositionY: 0,
		};
		this.isShapeInCenter = false;
		this.topDistanceToCanvasElement =
			canvas.getBoundingClientRect().top + window.scrollY; // исправить на канвас а чилдрен єто сама фигура
		scene.add(shape);
		scene.add(camera);
		camera.position.z = THREE_SETTINGS.CAMERA_POSITION_Z;
		shape.position.x = this.positionProps.startPositionX;
		shape.position.y = this.positionProps.startPositionY;
		renderer.setClearColor(0xffffff, 0);
		renderer.render(scene, camera);
	}
}
export function updateCamera({
	camera,
	renderer,
}: {
	camera: Camera;
	renderer: Renderer;
}) {
	const width = document.documentElement.clientWidth;
	const height = document.documentElement.clientHeight;
	camera.updateProjectionMatrix();
	camera.aspect = width / height;
	renderer.setSize(width, height);
	// document.querySelectorAll('.container').forEach(el => el.style.width = `${width}px`);
}

// нужно перенести в другой документ

// выполнится после ресайза окна
function returnDefaultPositionCameraAfterFullScreen(camera: Camera) {
	camera.rotation.y = 0;
	camera.rotation.x = 0;
}
