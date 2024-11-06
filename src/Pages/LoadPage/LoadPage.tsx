import React, { useEffect, useRef } from "react";
import createElementForLoadPage, { FiguresLoadContainer } from "./useLoadPage";
import { Sets } from "../../ThreeUtils/geometry";
// import createElementForLoadPage from "./useLoadPage";
export type CloseLoadPage = () => void;
interface LoadPageInterface {
	closeLoadPage: CloseLoadPage;
}
// const typesGeometryElements = [new THREE.BoxGeometry(1, 1, 1, 10, 10, 10), new THREE.CylinderGeometry(1, 1, 1, 32), new THREE.TorusGeometry];
const Cube = {
	type: "CUBE",
	settings: [1, 1, 1, 10, 10, 10],
};
const Cylinder = {
	type: "CYLINDER",
	settings: [1, 1, 1, 32],
};
const Torus = {
	type: "TORUS",
	settings: [],
};

export default function LoadPage({ closeLoadPage }: LoadPageInterface) {
	const ref = useRef(null);
	
	useEffect(() => {
		const { current: canvas } = ref;
	const isCanvasCreatedInDOM = canvas !== null;
		isCanvasCreatedInDOM
			? createElementForLoadPage({
					canvas,
					geometries: [Cube, Cylinder, Torus] as FiguresLoadContainer,
					closeLoadPage,
			  })
			: void 0;
	}, []);
	return (
		<div className="load-page">
			<canvas className="load-animation" ref={ref}></canvas>
		</div>
	);
}
