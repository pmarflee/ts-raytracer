import { Tuples } from "../../src/tuples";
import { World } from "cucumber";
 
declare module "cucumber" {
    interface World {
        tuples: Tuples;
        actual: [number, number, number, number];
    }
}