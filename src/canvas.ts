import { Tuples, Tuple } from "./tuples";

export default class Canvas {

    private static readonly maxColorValue = 255;
    private static readonly maxLineLength = 70;

    private readonly data: Tuple[][];

    get width(): number {
        return this.data[0].length;
    }

    get height(): number {
        return this.data.length;
    }

    constructor(width: number, height: number) {
        this.data = [];

        for (let i: number = 0; i < height; i++) {
            this.data[i] = [];
            for (let j: number = 0; j < width; j++) {
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
        return [ ...this.generatePPM() ].join("\n") + "\n";
    }

    private * generatePPM(): IterableIterator<string> {
        yield * this.generatePPMHeader();
        yield * this.generatePPMPixelData();
    }

    private * generatePPMHeader(): IterableIterator<string> {
        yield "P3";
        yield `${this.width} ${this.height}`;
        yield Canvas.maxColorValue.toString();
    }

    private * generatePPMPixelData(): IterableIterator<string> {
        for (let i: number = 0; i < this.height; i++) {
            yield * this.splitLine([ ...this.generatePPMPixelDataLine(this.data[i]) ].join(" "));
        }
    }

    private * generatePPMPixelDataLine(lineData: Tuple[]): IterableIterator<number> {
        for (let i: number = 0; i < this.width; i++) {
            for (let j: number = 0; j < 3; j++) {
                yield this.clamp(this.scale(lineData[i][j]));
            }
        }
    }

    private * splitLine(line: string): IterableIterator<string> {
        if (line.length <= Canvas.maxLineLength) {
            yield line;
            return;
        }

        let start = 0, i = 0, lastSpace = 0;
        while (i < line.length) {
            if (line[i] === ' ') {
                lastSpace = i;
            }
            if (i - start === Canvas.maxLineLength) {
                yield line.substring(start, lastSpace);
                i = start = lastSpace + 1;
            } else {
                i++;
            }
        }

        if (i > lastSpace) {
            yield line.substring(start);
        }
    }

    private scale(value: number): number {
        return Math.round(value * Canvas.maxColorValue);
    }

    private clamp(value: number): number {
        if (value < 0) return 0;
        if (value > Canvas.maxColorValue) return Canvas.maxColorValue;
        return value;
    }
}