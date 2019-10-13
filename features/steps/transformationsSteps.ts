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

Given("C <- translation\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.C = Matrix.translation(x, y, z);
});

Given("m <- translation\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.m = Matrix.translation(x, y, z);
});

Given("inv <- inverse\\(transform)", function () {
    this.inv = this.transform.inverse();
});

Given("transform <- scaling\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.transform = Matrix.scaling(x, y, z);
});

Given("B <- scaling\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.B = Matrix.scaling(x, y, z);
});

Given("m <- scaling\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.m = Matrix.scaling(x, y, z);
});

Given("half_quarter <- rotation_x\\(π \/ {int})", function (v: number) {
    this.half_quarter = Matrix.rotation_x(Math.PI / v);
});

Given("full_quarter <- rotation_x\\(π \/ {int})", function (v: number) {
    this.full_quarter = Matrix.rotation_x(Math.PI / v);
});

Given("A <- rotation_x\\(π \/ {int})", function (v: number) {
    this.A = Matrix.rotation_x(Math.PI / v);
});

Given("full_quarter <- rotation_y\\(π \/ {int})", function (v: number) {
    this.full_quarter = Matrix.rotation_y(Math.PI / v);
});

Given("half_quarter <- rotation_y\\(π \/ {int})", function (v: number) {
    this.half_quarter = Matrix.rotation_y(Math.PI / v);
});

Given("full_quarter <- rotation_z\\(π \/ {int})", function (v: number) {
    this.full_quarter = Matrix.rotation_z(Math.PI / v);
});

Given("half_quarter <- rotation_z\\(π \/ {int})", function (v: number) {
    this.half_quarter = Matrix.rotation_z(Math.PI / v);
});

Given("transform <- shearing\\({int}, {int}, {int}, {int}, {int}, {int})", function (xy: number, xz: number, yx: number, yz: number, zx: number, zy: number) {
    this.transform = Matrix.shearing(xy, xz, yx, yz, zx, zy);
});

When("p2 <- A * p", function () {
    this.p2 = this.A.multiply(this.p);
});

When("p3 <- B * p2", function () {
    this.p3 = this.B.multiply(this.p2);
});

When("p4 <- C * p3", function () {
    this.p4 = this.C.multiply(this.p3);
});

When("T <- C * B * A", function () {
    this.T = this.C.multiply(this.B).multiply(this.A);
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

Then("half_quarter * p = point\\(√{int} \/ {int}, {int}, √{int} \/ {int})", function (x1: number, x2: number, y: number, z1: number, z2: number) {
    expect(this.half_quarter.multiply(this.p)).to.almost.eql(Tuple.point(Math.sqrt(x1) / x2, y, Math.sqrt(z1) / z2));
});

Then("half_quarter * p = point\\(-√{int} \/ {int}, √{int} \/ {int}, {int})", function (x1: number, x2: number, y1: number, y2: number, z: number) {
    expect(this.half_quarter.multiply(this.p)).to.almost.eql(Tuple.point(-(Math.sqrt(x1) / x2), Math.sqrt(y1) / y2, z));
});

Then("full_quarter * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.full_quarter.multiply(this.p)).to.almost.eql(Tuple.point(x, y, z));
});

Then("p2 = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.p2).to.almost.eql(Tuple.point(x, y, z));
});

Then("p3 = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.p3).to.almost.eql(Tuple.point(x, y, z));
});

Then("p4 = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.p4).to.almost.eql(Tuple.point(x, y, z));
});

Then("T * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.T.multiply(this.p)).to.eql(Tuple.point(x, y, z));
});