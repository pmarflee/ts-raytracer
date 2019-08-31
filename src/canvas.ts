import Color from "./color";
import * as NodeCanvas from "canvas";
import fs from 'fs';

export default class Canvas {

    private static readonly maxColorValue = 255;
    private static readonly maxLineLength = 70;

    private readonly data: Color[][];

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
                this.data[i][j] = Color.fromRGB(0, 0, 0);
            }
        }
    }

    public readPixel(x: number, y: number): Color {
        return this.data[y][x];
    }

    public writePixel(x: number, y: number, c: Color): void {
        this.data[y][x] = c;
    }

    public toPPM(): string {
        return [ ...this.generatePPM() ].join("\n") + "\n";
    }

    public toImage(filename: string): void {
        let canvas = NodeCanvas.createCanvas(this.width, this.height),
            ctx = canvas.getContext("2d"),
            imageData = ctx.getImageData(0, 0, this.width, this.height);
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.drawPixel(imageData, x, this.height - y, this.data[y][x]);
            }
        }

        ctx.putImageData(imageData, 0, 0);

        fs.writeFileSync(filename, canvas.toBuffer());
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

    private * generatePPMPixelDataLine(lineData: Color[]): IterableIterator<number> {
        for (let i: number = 0; i < this.width; i++) {
            yield this.clamp(this.scale(lineData[i].red));
            yield this.clamp(this.scale(lineData[i].green));
            yield this.clamp(this.scale(lineData[i].blue));
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

    private drawPixel(imageData: NodeCanvas.ImageData, x: number, y: number, color: Color): void {
        let index = (x + y * this.width) * 4; 

        imageData.data[index + 0] = color.red;
        imageData.data[index + 1] = color.green;
        imageData.data[index + 2] = color.blue;
        imageData.data[index + 3] = 255;
    }
}