import React from "react";
import runShapesAnimation from "../../Controllers/animationControllers";
import useScrollAndAтimationControlls from "./useControllsHooks";
import {
	Tetrahedron,
	Cylinder,
	Torus,
	Cube,
} from "../../Components/ThreeComponents/ThreeComponents";

export default function MainContent() {
	const setShapesAndOwnPropsContainer = useScrollAndAтimationControlls();
	return (
		<>
			<section className="container">
				<h1 className="shape-name animation-text">Tetrahedron</h1>
				<p>
					A tetrahedron is a geometric shape in three-dimensional space that
					consists of four triangular faces, six straight edges, and four vertex
					corners.
				</p>
				<Tetrahedron
					setShapesAndOwnPropsContainer={setShapesAndOwnPropsContainer}
				/>
			</section>
			<section className="container container-1">
				<h1 className="shape-name">Cube</h1>
				<p>Cube is a polyhedron whose surface consists of six squares.</p>
				<Cube setShapesAndOwnPropsContainer={setShapesAndOwnPropsContainer} />
			</section>
			<section className="container container-2">
				<h1 className="shape-name">Cylinder</h1>
				<p>
					Cylinder is a three-dimensional solid figure which has two identical
					circular bases joined by a curved surface at a particular distance
					from the center which is the height of the cylinder{" "}
				</p>
				<Cylinder
					setShapesAndOwnPropsContainer={setShapesAndOwnPropsContainer}
				/>
			</section>
			<section className="container container-3">
				<h1 className="shape-name">Torus</h1>
				<p>
					Torus - the surface of sound receives rotation of the generating
					circle around an axis that is concentrated in the plane of this circle
					and does not intersect it.
				</p>
				<Torus setShapesAndOwnPropsContainer={setShapesAndOwnPropsContainer} />
			</section>
		</>
	);
}
