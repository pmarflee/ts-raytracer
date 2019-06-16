export class Tuples {
    static tuple(x: number, y: number, z: number, w: number) : [number, number, number, number] {
        return [x, y, z, w];
    }

    static point(x: number, y: number, z: number) : [number, number, number, number] {
        return this.tuple(x, y, z, 1.0);
    }

    static vector(x: number, y: number, z: number) : [number, number, number, number] {
        return this.tuple(x, y, z, 0.0);
    }
}