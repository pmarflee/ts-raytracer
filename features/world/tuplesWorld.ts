import { Tuples, Tuple } from "../../src/tuples";
import { World } from "cucumber";
 
declare module "cucumber" {
    interface World {
        tuples: Tuples;
        actual: Tuple;
        a1: Tuple;
        a2: Tuple;
    }
}