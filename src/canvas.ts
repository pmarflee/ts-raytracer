import { Tuples, Tuple } from "./tuples";
import { stringify } from "querystring";

export default class Canvas {
    private readonly data: Tuple[][];

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

    public readPixel(x: number, y: number): Tuple {
        return this.data[y][x];
    }

    public writePixel(x: number, y: number, c: Tuple): void {
        this.data[y][x] = c;
    }

    public toPPM(): string {
        return [ "P3",
                 `${this.width} ${this.height}`,
                 "255" ].join("\n");
    }
}