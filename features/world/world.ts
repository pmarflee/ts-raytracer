import Tuple from "../../src/tuple";
import Canvas from "../../src/canvas";
import Matrix from "../../src/matrix";
import Color from "../../src/color";
 
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
        c: Color,
        c1: Color,
        c2: Color,
        c3: Color,
        red: Color,
        canvas: Canvas,
        ppm: string,
        M: Matrix,
        A: Matrix,
        B: Matrix,
        C: Matrix
    }
}