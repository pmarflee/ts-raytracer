export class Tuples {
    static tuple(x: number, y: number, z: number, w: number) : Tuple {
        return [x, y, z, w];
    }

    static point(x: number, y: number, z: number) : Tuple {
        return this.tuple(x, y, z, 1.0);
    }

    static vector(x: number, y: number, z: number) : Tuple {
        return this.tuple(x, y, z, 0.0);
    }

    static add(t1: Tuple, t2: Tuple) : Tuple {
        return this.tuple(t1[0] + t2[0], t1[1] + t2[1], t1[2] + t2[2], t1[3] + t2[3]);
    }

    static subtract(t1: Tuple, t2: Tuple) : Tuple {
        return this.tuple(t1[0] - t2[0], t1[1] - t2[1], t1[2] - t2[2], t1[3] - t2[3]);
    }

    static negate(t: Tuple) : Tuple {
        return this.tuple(-t[0], -t[1], -t[2], -t[3]);
    }

    static multiply(t: Tuple, v: number) : Tuple {
        return this.tuple(t[0] * v, t[1] * v, t[2] * v, t[3] * v);
    }
}

export type Tuple = [number, number, number, number];