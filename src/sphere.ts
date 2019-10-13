import Tuple from "./tuple";
import Entity from "./entity";
import Matrix from "./matrix";
import Ray from "./ray";
import Intersections from "./intersections";

export default class Sphere implements Entity {

    public readonly id: number;
    public transform: Matrix;

    constructor(
        public readonly position: Tuple = Tuple.point(0, 0, 0),
        public readonly radius = 1) {
        this.id = Math.random();
        this.transform = Matrix.identity;
    }

    public intersect(ray: Ray): Intersections {
        let ray2 = ray.transform(this.transform.inverse()),
            sphereToRay = ray2.origin.subtract(this.position),
            a = ray2.direction.dot(ray2.direction),
            b = 2 * ray2.direction.dot(sphereToRay),
            c = sphereToRay.dot(sphereToRay) - 1,
            discriminant = (b ** 2) - 4 * a * c;

        if (discriminant < 0) return new Intersections();

        let t1 = (-b - Math.sqrt(discriminant)) / (2 * a),
            t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

        return new Intersections(
            { t: t1, object: this }, 
            { t: t2, object: this });
    }

}