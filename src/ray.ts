import Tuple from "./tuple";
import Sphere from "./sphere";

export default class Ray {

    constructor(public readonly origin: Tuple, public readonly direction: Tuple) {

    }

    public position(distance: number) {
        return this.origin.add(this.direction.multiply(distance));
    }

    public intersect(sphere: Sphere) {
        let difference = sphere.position.z - sphere.radius - this.origin.z,
            distance = difference > 0 ? 0 : difference,
            intersections: number[] = [],
            offsets = [[0, -1], [1, 0], [0, 1], [-1, 0]],
            position: Tuple;
            
        do {
            position = this.position(distance);
            for (let offset of offsets) {
                if (position.y === sphere.position.y + offset[0] &&
                    position.z === sphere.position.z + offset[1]) {
                        intersections.push(distance);
                    }
            }
            distance++;
        } while (position.z <= sphere.position.z + sphere.radius);

        if (intersections.length === 1) {
            intersections.push(intersections[0]);
        }

        return intersections;
    }
}