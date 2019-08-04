export class Matrices {
    static matrix(table: string[][]) : Matrix {
        let data : Matrix = [];

        for (let y = 0; y < table.length; y++) {
            data[y] = [];
            for (let x = 0; x < table[y].length; x++) {
                data[y][x] = parseFloat(table[y][x]);
            }
        }

        return data;
    }

    static compare(m1: Matrix, m2: Matrix) : boolean {
        if (m1.length !== m2.length) {
            return false;
        }

        for (let y = 0; y < m1.length; y++) {
            if (m1[y].length !== m2[y].length) {
                return false;
            }

            for (let x = 0; x < m1[y].length; x++) {
                if (m1[y][x] !== m2[y][x]) {
                    return false;
                }
            }
        }

        return true;
    }
}

export type Matrix = number[][];