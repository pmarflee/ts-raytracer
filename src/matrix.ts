import Tuple from "./tuple";

export default class Matrix {

    constructor(public readonly data: number[][]) {
    }

    public static fromTable(table: string[][]) {
        let data : number[][] = [];

        for (let y = 0; y < table.length; y++) {
            data[y] = [];
            for (let x = 0; x < table[y].length; x++) {
                data[y][x] = parseFloat(table[y][x]);
            }
        }

        return new Matrix(data);
    }

    public compare(other: Matrix) {
        if (this.data.length !== other.data.length) {
            return false;
        }
        
        for (let y = 0; y < this.data.length; y++) {
            if (this.data[y].length !== other.data[y].length) {
                return false;
            }

            for (let x = 0; x < this.data[y].length; x++) {
                if (this.data[y][x] !== other.data[y][x]) {
                    return false;
                }
            }
        }

        return true;
    }

    public multiply(matrix: Matrix) : Matrix;
    public multiply(tuple: Tuple) : Tuple;
    multiply(v: Matrix | Tuple) : Matrix | Tuple {
        return v instanceof Matrix ? this.multiplyByMatrix(<Matrix>v) : this.multiplyByTuple(<Tuple>v);
    }

    private multiplyByMatrix(other: Matrix) {
        let m : number[][] = [];
        for (let row = 0; row < this.data.length; row++) {
            let mr : number[] = [];
            for (let col = 0; col < other.data[row].length; col++) {
                let v = 0;
                for (let i = 0; i < this.data[row].length; i++) {
                    v += this.data[row][i] * other.data[i][col];
                }
                mr.push(v);
            }
            m.push(mr);
        }
        return new Matrix(m);
    }

    private multiplyByTuple(tuple: Tuple) {
        let matrix = this.multiplyByMatrix(new Matrix([[tuple.x], [tuple.y], [tuple.z], [tuple.w]])),
            data = matrix.data;
        return new Tuple(data[0][0], data[1][0], data[2][0], data[3][0]);
    }

    public transpose() {
        let t = Array.from({ length: this.data.length }, () => 
            Array.from({ length: this.data[0].length }, () => 0));

        for (let row: number = 0; row < this.data.length; row++) {
            for (let col: number = 0; col < this.data[row].length; col++) {
                t[col][row] = this.data[row][col];
            }
        }
        
        return new Matrix(t);
    }

    public get determinant() : number {
        return this.data.length === 2
            ? this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0]
            : [...Array(this.data.length).keys()]
                .reduce((acc, col) => 
                    acc + this.data[0][col] * this.cofactor(0, col), 0);
    };

    public submatrix(rowToRemove: number, colToRemove: number) {
        let s: number[][] = [];

        for (let row: number = 0; row < this.data.length; row++) {
            if (row === rowToRemove) continue;
            let sr : number[] = [];
            for (let col: number = 0; col < this.data[row].length; col++) {
                if (col === colToRemove) continue;
                sr.push(this.data[row][col]);
            }
            s.push(sr);
        }

        return new Matrix(s);
    }

    public minor(row: number, col: number) {
        return this.submatrix(row, col).determinant;
    }

    public cofactor(row: number, col: number) {
        let minor = this.minor(row, col);
        return (row + col) % 2 > 0 ? -minor : minor;
    }

    public get isInvertible() {
        return this.determinant !== 0;
    }

    public inverse() {
        if (!this.isInvertible) {
            throw new Error("Matrix is not invertible");
        }

        let determinant = this.determinant,
            data = Array.from({ length: this.data.length }, () => 
            Array.from({ length: this.data.length }, () => 0));

        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data.length; col++) {
                data[col][row] = this.cofactor(row, col) / determinant;
            }
        }

        return new Matrix(data);
    }

    public static readonly identity : Matrix = new Matrix([
        [ 1, 0, 0, 0 ],
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ] 
    ]);
}