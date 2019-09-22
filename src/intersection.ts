import Entity from "./entity";

export default class Intersection {
    constructor(public readonly t: number, public readonly object: Entity) {

    }
}