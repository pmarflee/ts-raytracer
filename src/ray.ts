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

    public intersect(sphere: Sphere): Intersections {
        let sphereToRay = this.origin.subtract(sphere.position),
            a = this.direction.dot(this.direction),
            b = 2 * this.direction.dot(sphereToRay),
            c = sphereToRay.dot(sphereToRay) - 1,
            discriminant = (b ** 2) - 4 * a * c;

        if (discriminant < 0) return new Intersections();

        let t1 = (-b - Math.sqrt(discriminant)) / (2 * a),
            t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

        return new Intersections(
            { t: t1, object: sphere }, 
            { t: t2, object: sphere });
    }

    public transform(matrix: Matrix) {
        let origin = matrix.multiply(this.origin),
            direction = matrix.multiply(this.direction);
        
        return new Ray(origin, direction);
    }
}