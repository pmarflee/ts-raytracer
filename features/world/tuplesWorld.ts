import { Tuples, Tuple } from "../../src/tuples";
import { World } from "cucumber";
 
declare module "cucumber" {
    interface World {
        tuples: Tuples;
        actual: Tuple;
        a: Tuple;
        a1: Tuple;
        a2: Tuple;
        b: Tuple;
        p: Tuple;
        p1: Tuple;
        p2: Tuple;
        v: Tuple;
        zero: Tuple;
        norm: Tuple;
        c: Tuple;
    }
}