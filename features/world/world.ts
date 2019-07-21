import { Tuple } from "../../src/tuples";
import Canvas from "../../src/canvas";
import { Matrix } from "../../src/matrices";
 
declare module "cucumber" {
    interface World {
        actual: Tuple,
        a: Tuple,
        a1: Tuple,
        a2: Tuple,
        b: Tuple,
        p: Tuple,
        p1: Tuple,
        p2: Tuple,
        v: Tuple,
        v1: Tuple,
        v2: Tuple,
        zero: Tuple,
        norm: Tuple,
        c: Tuple,
        c1: Tuple,
        c2: Tuple,
        c3: Tuple,
        red: Tuple,
        canvas: Canvas,
        ppm: string,
        M: Matrix
    }
}