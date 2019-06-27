import { Tuples, Tuple } from "./tuples";

export default class Canvas {
    public readonly data: Tuple[][];

    get width(): number {
        return this.data[0].length;
    }

    get height(): number {
        return this.data.length;
    }

    constructor(width: number, height: number) {
        this.data = [];

        for (var i: number = 0; i < height; i++) {
            this.data[i] = [];
            for (var j: number = 0; j < width; j++) {
                this.data[i][j] = Tuples.color(0, 0, 0);
            }
        }
    }
}