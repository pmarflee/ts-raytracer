import Tuple from "./tuple";

export default class Color {
    constructor(readonly data: Tuple) {
    }

    public static fromRGB(red: number, green: number, blue: number) {
        return new Color(new Tuple(red, green, blue, 0));
    }

    public get red() {
        return this.data.x;
    }

    public get green() {
        return this.data.y;
    }

    public get blue() {
        return this.data.z;
    }

    public hadamardProduct(other: Color) {
        return Color.fromRGB(
            this.red * other.red,
            this.green * other.green,
            this.blue * other.blue);
    }

    public add(other: Color) {
        return new Color(this.data.add(other.data));
    }

    public subtract(other: Color) {
        return new Color(this.data.subtract(other.data));
    }

    public multiply(v: number) {
        return new Color(this.data.multiply(v));
    }
}