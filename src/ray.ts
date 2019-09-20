import Tuple from "./tuple";

export default class Ray {

    constructor(public readonly origin: Tuple, public readonly direction: Tuple) {

    }

    public position(distance: number) {
        return this.origin.add(this.direction.multiply(distance));
    }
}