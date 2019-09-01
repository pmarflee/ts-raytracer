export default class Tuple {
    constructor(readonly x: number, readonly y: number, readonly z: number, readonly w: number) {
    }

    public static point(x: number, y: number, z: number) {
        return new Tuple(x, y, z, 1);
    }

    public static vector(x: number, y: number, z: number) {
        return new Tuple(x, y, z, 0);
    }

    public static color(red: number, green: number, blue: number) {
        return new Tuple(red, green, blue, 0);
    }

    public add(other: Tuple) {
        return new Tuple(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }

    public subtract(other: Tuple) {
        return new Tuple(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    }

    public negate() {
        return new Tuple(-this.x, -this.y, -this.z, -this.w);
    }

    public multiply(v: number) {
        return new Tuple(this.x * v, this.y * v, this.z * v, this.w * v);
    }

    public divide(v: number) {
        return new Tuple(this.x / v, this.y / v, this.z / v, this.w / v);
    }

    public get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    }

    public normalize() {
        let magnitude = this.magnitude;
        return new Tuple(this.x / magnitude, this.y / magnitude, this.z / magnitude, this.w / magnitude);
    }

    public dot(other: Tuple) {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    public cross(other: Tuple) {
        return Tuple.vector(
            this.y * other.z - this.z * other.y, 
            this.z * other.x - this.x * other.z, 
            this.x * other.y - this.y * other.x);
    }
}