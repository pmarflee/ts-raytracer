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

Given("t <- translation\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.t = Matrix.translation(x, y, z);
});

When("set_transform\\(s, t)", function () {
    this.s.transform = this.t;
});

When("set_transform\\(s, scaling {int} {int} {int})", function (x: number, y: number, z: number) {
    this.s.transform = Matrix.scaling(x, y, z);
});

When("set_transform\\(s, translation {int} {int} {int})", function (x: number, y: number, z: number) {
    this.s.transform = Matrix.translation(x, y, z);
});

When("n <- normal_at\\(s, point {int} {int} {int})", function (x: number, y: number, z: number) {
    this.n = this.s.normalAt(Tuple.point(x, y, z));
});

When("n <- normal_at\\(s, point √{int} / {int} √{int} / {int} √{int} / {int})", function (x1: number, x2: number, y1: number, y2: number, z1: number, z2: number) {
    this.n = this.s.normalAt(Tuple.point(Math.sqrt(x1) / x2, Math.sqrt(y1) / y2, Math.sqrt(z1) / z2));
});

Then("s.transform = identity_matrix", function () {
    expect(this.s.transform).to.eql(Matrix.identity);
});

Then("s.transform = t", function () {
    expect(this.s.transform).to.eql(this.t)
});

Then("n = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.n).to.eql(Tuple.vector(x, y, z));
});

Then("n = vector\\(√{int} \/ {int}, √{int} \/ {int}, √{int} \/ {int})", function (x1: number, x2: number, y1: number, y2: number, z1: number, z2: number) {
    expect(this.n).to.eql(Tuple.vector(Math.sqrt(x1) / x2, Math.sqrt(y1) / y2, Math.sqrt(z1) / z2));
});

Then("n = normalize\\(n)", function () {
    expect(this.n).to.eql(this.n.normalize());
});