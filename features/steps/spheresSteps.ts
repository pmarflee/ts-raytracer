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

Then("s.transform = identity_matrix", function () {
    expect(this.s.transform).to.eql(Matrix.identity);
});

Then("s.transform = t", function () {
    expect(this.s.transform).to.eql(this.t)
});