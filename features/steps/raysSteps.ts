import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then, TableDefinition } from "cucumber";
import Matrix from "../../src/matrix";
import Tuple from "../../src/tuple";
import Ray from "../../src/ray";

chai.use(chaiAlmost(0.00001));

Given("origin <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.origin = Tuple.point(x, y, z);
});

Given("direction <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.direction = Tuple.vector(x, y, z);
});

Given("r <- ray\\(point {int}, {int}, {int}, vector {int}, {int}, {int})", function (pX: number, pY: number, pZ: number, vX: number, vY: number, vZ: number) {
    this.r = new Ray(Tuple.point(pX, pY, pZ), Tuple.vector(vX, vY, vZ));
});

When("r <- ray\\(origin, direction)", function () {
    this.r = new Ray(this.origin, this.direction);
});

Then("r.origin = origin", function () {
    this.r.origin === this.origin;
});

Then("r.direction = direction", function () {
    this.r.direction === this.direction;
});

Then("position\\(r, {float}) = point\\({float}, {float}, {float})", function (t: number, x: number, y: number, z: number) {
    this.r.position(t) === Tuple.point(x, y, z);
});