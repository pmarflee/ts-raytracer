import Tuple from "./tuple";
import Sphere from "./sphere";
import Intersection from "./intersection";
import Intersections from "./intersections";
import Matrix from "./matrix";

export default class Ray {

    constructor(public readonly origin: Tuple, public readonly direction: Tuple) {

    }

    public position(distance: number) {
        return this.origin.add(this.direction.multiply(distance));
    }

    public transform(matrix: Matrix) {
        let origin = matrix.multiply(this.origin),
            direction = matrix.multiply(this.direction);
        
        return new Ray(origin, direction);
    }
}