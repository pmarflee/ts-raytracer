import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then, TableDefinition } from "cucumber";
import Matrix from "../../src/matrix";
import Tuple from "../../src/tuple";
import Ray from "../../src/ray";
import Sphere from "../../src/sphere";
import Intersection from "../../src/intersection";

chai.use(chaiAlmost(0.00001));

Given("origin <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.origin = Tuple.point(x, y, z);
});

Given("direction <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.direction = Tuple.vector(x, y, z);
});

Given("r <- ray\\(point {int} {int} {int}, vector {int} {int} {int})", function (pX: number, pY: number, pZ: number, vX: number, vY: number, vZ: number) {
    this.r = new Ray(Tuple.point(pX, pY, pZ), Tuple.vector(vX, vY, vZ));
});

Given("s <- sphere", function () {
    this.s = new Sphere();
});

When("r <- ray\\(origin, direction)", function () {
    this.r = new Ray(this.origin, this.direction);
});

When("xs <- intersect\\(s, r)", function () {
    this.xs = this.r.intersect(this.s);
});

When("i <- intersection\\({float}, s)", function (t: number) {              
    this.i = new Intersection(t, this.s);
});                                                                    

Then("r.origin = origin", function () {
    expect(this.r.origin).to.eql(this.origin);
});

Then("r.direction = direction", function () {
    expect(this.r.direction).to.eql(this.direction);
});

Then("position\\(r, {float}) = point\\({float}, {float}, {float})", function (t: number, x: number, y: number, z: number) {
    expect(this.r.position(t)).to.eql(Tuple.point(x, y, z));
});

Then("xs.count = {int}", function (count: number) {
    expect(this.xs.length).to.equal(count);
});

Then("xs[{int}] = {float}", function (index: number, distance: number) {
    expect(this.xs[index]).to.equal(distance);
});

Then("i.t = {float}", function (expected: number) {
    expect(this.i.t).to.equal(expected);
});

Then("i.object = s", function () {
    expect(this.i.object).to.equal(this.s);
});