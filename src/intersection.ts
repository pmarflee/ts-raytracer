import Entity from "./entity";

export default interface Intersection {
    readonly t: number;
    readonly object: Entity
}