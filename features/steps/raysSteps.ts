import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then, TableDefinition } from "cucumber";
import Matrix from "../../src/matrix";
import Tuple from "../../src/tuple";
import Ray from "../../src/ray";
import Sphere from "../../src/sphere";
import Intersection from "../../src/intersection";
import Intersections from "../../src/intersections";

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

Given("i1 <- intersection\\({float}, s)", function (t: number) {
    this.i1 = { t: t, object: this.s };
})

Given("i2 <- intersection\\({float}, s)", function (t: number) {
    this.i2 = { t: t, object: this.s };
})

Given("i3 <- intersection\\({float}, s)", function (t: number) {
    this.i3 = { t: t, object: this.s };
})

Given("i4 <- intersection\\({float}, s)", function (t: number) {
    this.i4 = { t: t, object: this.s };
})

When("r <- ray\\(origin, direction)", function () {
    this.r = new Ray(this.origin, this.direction);
});

When("xs <- intersect\\(s, r)", function () {
    this.xs = this.s.intersect(this.r);
});

When("i <- intersection\\({float}, s)", function (t: number) {              
    this.i = { t: t, object: this.s };
});                                                                    

When("xs <- intersections\\(i1, i2)", function () {
    this.xs = new Intersections(this.i1, this.i2);
});

When("xs <- intersections\\(i2, i1)", function () {
    this.xs = new Intersections(this.i2, this.i1);
});

When("xs <- intersections\\(i1, i2, i3, i4)", function () {
    this.xs = new Intersections(this.i1, this.i2, this.i3, this.i4);
});

When("i <- hit\\(xs)", function () {
    this.i = this.xs.hit;
});

When("r2 <- transform\\(r, m)", function () {
    this.r2 = this.r.transform(this.m);
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
    expect(this.xs.values.length).to.equal(count);
});

Then("i.t = {float}", function (expected: number) {
    let i = this.i as Intersection;
    expect(i).to.not.be.undefined && expect(i.t).to.equal(expected);
});

Then("i.object = s", function () {
    let i = this.i as Intersection;
    expect(i).to.not.be.undefined && expect(i.object).to.equal(this.s);
});

Then("xs[{int}].t = {float}", function (index: number, expected: number) {
    expect(this.xs.values[index].t).to.equal(expected);
});

Then("xs[{int}].object = s", function (index: number) {
    expect(this.xs.values[index].object).to.equal(this.s);
});

Then("i = i1", function () {
    expect(this.i).to.equal(this.i1);
});

Then("i = i2", function () {
    expect(this.i).to.equal(this.i2);
});

Then("i = i4", function () {
    expect(this.i).to.equal(this.i4);
});

Then("i is nothing", function () {
    expect(this.i).to.be.null;
});

Then("r2.origin = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.r2.origin).to.eql(Tuple.point(x, y, z));
}); 

Then("r2.direction = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.r2.direction).to.eql(Tuple.vector(x, y, z));
});