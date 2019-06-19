import { expect } from "chai";
import { Given, When, Then } from "cucumber";
import { Tuples } from "../../src/tuples";

Given("a <- tuple\\({float}, {float}, {float}, {float})", function (x: number, y: number, z: number, w: number) {
    this.actual = Tuples.tuple(x, y, z, w);
});

Then("a.x = {float}", function (expected: number) {
    expect(this.actual[0]).to.be.equal(expected);
});

Then("a.y = {float}", function (expected: number) {
    expect(this.actual[1]).to.be.equal(expected);
});

Then("a.z = {float}", function (expected: number) {
    expect(this.actual[2]).to.be.equal(expected);
});

Then("a.w = {float}", function (expected: number) {
    expect(this.actual[3]).to.be.equal(expected);
});

Then("a is a point", function () {
    expect(this.actual[3]).to.be.equal(1.0);
});

Then("a is not a vector", function () {
    expect(this.actual[3]).to.not.be.equal(0.0);
});

Then("a is a vector", function () {
    expect(this.actual[3]).to.be.equal(0.0);
});

Given("p <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p = Tuples.point(x, y, z);
});

Then("p = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.p).to.have.same.members(Tuples.tuple(x, y, z, w));
});

Given("v <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v = Tuples.vector(x, y, z);
});

Then("v = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.v).to.have.same.members(Tuples.tuple(x, y, z, w));
});

Given("a1 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a1 = Tuples.tuple(x, y, z, w);
});

Given("a2 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a2 = Tuples.tuple(x, y, z, w);
});

Then("a1 + a2 = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(Tuples.add(this.a1, this.a2)).to.have.same.members(Tuples.tuple(x, y, z, w));
});

Given("p1 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p1 = Tuples.point(x, y, z);
});

Given("p2 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p2 = Tuples.point(x, y, z);
});

Then("p1 - p2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.p1, this.p2)).to.have.same.members(Tuples.vector(x, y, z));
});

Then("p - v = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.p, this.v)).to.have.same.members(Tuples.point(x, y, z));
});

Given("v1 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v1 = Tuples.vector(x, y, z);
});

Given("v2 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v2 = Tuples.vector(x, y, z);
});

Then("v1 - v2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.v1, this.v2)).to.have.same.members(Tuples.vector(x, y, z));
});