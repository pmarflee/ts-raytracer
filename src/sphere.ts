import Tuple from "./tuple";
import Entity from "./entity";
import Matrix from "./matrix";

export default class Sphere implements Entity {

    public readonly id: number;
    public transform: Matrix;

    constructor(
        public readonly position: Tuple = Tuple.point(0, 0, 0),
        public readonly radius = 1) {
        this.id = Math.random();
        this.transform = Matrix.identity;
    }

}