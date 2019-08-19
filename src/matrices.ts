import { Tuple, Tuples } from "./tuples";

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

    static multiply(m1: Matrix, m2: Matrix) : Matrix {
        let m : Matrix = [];
        for (let row : number = 0; row < m1.length; row++) {
            let mr : number[] = [];
            for (let col : number = 0; col < m2[row].length; col++) {
                let v : number = 0;
                for (let i : number = 0; i < m1[row].length; i++) {
                    v += m1[row][i] * m2[i][col];
                }
                mr.push(v);
            }
            m.push(mr);
        }
        return m;
    }

    static multiplyByTuple(m: Matrix, t: Tuple) : Tuple {
        let result = Matrices.multiply(m, 
            [[t[0]], [t[1]], [t[2]], [t[3]]]);
        return Tuples.tuple(
            result[0][0],
            result[1][0],
            result[2][0],
            result[3][0]);
    }

    static transpose(m: Matrix) : Matrix {
        let t : Matrix = Array.from({ length: m.length }, () => 
            Array.from({ length: m[0].length }, () => 0));

        for (let row: number = 0; row < m.length; row++) {
            for (let col: number = 0; col < m[row].length; col++) {
                t[col][row] = m[row][col];
            }
        }
        
        return t;
    }

    static determinant(m: Matrix) : number {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    };

    static submatrix(m: Matrix, rowToRemove: number, colToRemove: number) : Matrix {
        let s : Matrix = [];

        for (let row: number = 0; row < m.length; row++) {
            if (row === rowToRemove) continue;
            let sr : number[] = [];
            for (let col: number = 0; col < m[row].length; col++) {
                if (col === colToRemove) continue;
                sr.push(m[row][col]);
            }
            s.push(sr);
        }

        return s;
    }

    static minor(m: Matrix, row: number, col: number) : number {
        return Matrices.determinant(Matrices.submatrix(m, row, col));
    }

    static cofactor(m: Matrix, row: number, col: number) : number {
        let minor = Matrices.minor(m, row, col);
        return row + col % 2 > 0 ? -minor : minor;
    }

    static readonly identity : Matrix = [
        [ 1, 0, 0, 0 ],
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ] 
    ];
}

export type Matrix = number[][];