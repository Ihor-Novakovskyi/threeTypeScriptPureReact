import * as THREE from "three";
export type NameGeometry = "TETRAHEDRON" | "CUBE" | "CYLINDER" | "TORUS";
export interface Sets {
	type: NameGeometry;
	settings: number[];
}
export default function createGeometry(sets: Sets) {
	const { type, settings } = sets;
	switch (type) {
		case "TETRAHEDRON":
			return new THREE.TetrahedronGeometry(...settings);
		case "CUBE":
			return new THREE.BoxGeometry(...settings);
		case "CYLINDER":
			return new THREE.CylinderGeometry(...settings);
		case "TORUS":
			return new THREE.TorusGeometry(...settings);
	}
}
