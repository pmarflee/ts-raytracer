import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then, TableDefinition } from "cucumber";
import Matrix from "../../src/matrix";
import Tuple from "../../src/tuple";

chai.use(chaiAlmost(0.00001));

Given("transform <- translation\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.transform = Matrix.translation(x, y, z);
});

Given("inv <- inverse\\(transform)", function () {
    this.inv = this.transform.inverse();
});

Given("transform <- scaling\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.transform = Matrix.scaling(x, y, z);
});

Given("half_quarter <- rotation_x\\(π \/ {int})", function (v: number) {
    this.half_quarter = Matrix.rotation_x(Math.PI / v);
});

Given("full_quarter <- rotation_x\\(π \/ {int})", function (v: number) {
    this.full_quarter = Matrix.rotation_x(Math.PI / v);
});

Then("transform * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.transform.multiply(this.p)).to.eql(Tuple.point(x, y, z));
});

Then("inv * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.inv.multiply(this.p)).to.eql(Tuple.point(x, y, z));
});

Then("transform * v = v", function () {                                
    expect(this.transform.multiply(this.v)).to.eql(this.v);
});                                                                    

Then("transform * v = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.transform.multiply(this.v)).to.eql(Tuple.vector(x, y, z));
});

Then("inv * v = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.inv.multiply(this.v)).to.eql(Tuple.vector(x, y, z));
});

Then("half_quarter * p = point\\({int}, √{int} \/ {int}, √{int} \/ {int})", function (x: number, y1: number, y2: number, z1: number, z2: number) {
    expect(this.half_quarter.multiply(this.p)).to.almost.eql(Tuple.point(x, Math.sqrt(y1) / y2, Math.sqrt(z1) / z2));
});

Then("full_quarter * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.full_quarter.multiply(this.p)).to.almost.eql(Tuple.point(x, y, z));
});