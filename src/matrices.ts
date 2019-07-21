export class Matrices {
    static matrix(width: number, height: number, table: string[][]) : Matrix {
        let data : Matrix = [];

        for (let y = 0; y < height; y++) {
            data[y] = [];
            for (let x = 0; x < width; x++) {
                data[y][x] = parseFloat(table[y][x]);
            }
        }

        return data;
    }
}

export type Matrix = number[][];