import Tuple from "./tuple";
import Sphere from "./sphere";

export default class Ray {

    constructor(public readonly origin: Tuple, public readonly direction: Tuple) {

    }

    public position(distance: number) {
        return this.origin.add(this.direction.multiply(distance));
    }

    public intersect(sphere: Sphere) {
        let sphereToRay = this.origin.subtract(sphere.position),
            a = this.direction.dot(this.direction),
            b = 2 * this.direction.dot(sphereToRay),
            c = sphereToRay.dot(sphereToRay) - 1,
            discriminant = (b ** 2) - 4 * a * c;

        if (discriminant < 0) return [];

        let t1 = (-b - Math.sqrt(discriminant)) / (2 * a),
            t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

        return [t1, t2];
    }
}