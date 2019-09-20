import Ray from "./ray";
import Tuple from "./tuple";

export default class Sphere {

    public readonly id: number;

    constructor(
        public readonly position: Tuple = Tuple.point(0, 0, 0),
        public readonly radius = 1) {
        this.id = Math.random();
    }

    public intersect(ray: Ray) {
        let distance = 0,
        values: number[] = [];

        do {
            let position = ray.position(distance);
            if (this.position.x - this.radius === position.x || 
                this.position.x + this.radius === position.x ||
                this.position.y - this.radius === position.y ||
                this.position.y + this.radius === position.y ||
                this.position.z - this.radius === position.z ||
                this.position.z + this.radius === position.z) {
                values.push(distance);
            }
            distance++;
        } while (values.length < 2);

        return values;
    }

}