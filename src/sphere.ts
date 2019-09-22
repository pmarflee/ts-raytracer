import Tuple from "./tuple";
import Entity from "./entity";

export default class Sphere implements Entity {

    public readonly id: number;

    constructor(
        public readonly position: Tuple = Tuple.point(0, 0, 0),
        public readonly radius = 1) {
        this.id = Math.random();
    }

}