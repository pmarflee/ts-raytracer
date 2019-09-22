import Tuple from "./tuple";

export default class Sphere {

    public readonly id: number;

    constructor(
        public readonly position: Tuple = Tuple.point(0, 0, 0),
        public readonly radius = 1) {
        this.id = Math.random();
    }

}