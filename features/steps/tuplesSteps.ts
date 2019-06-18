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
    this.actual = Tuples.point(x, y, z);
});

Then("p = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.actual).to.have.same.members(Tuples.tuple(x, y, z, w));
});

Given("v <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.actual = Tuples.vector(x, y, z);
});

Then("v = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.actual).to.have.same.members(Tuples.tuple(x, y, z, w));
});

Given("a1 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a1 = Tuples.tuple(x, y, z, w);
});

Given("a2 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a2 = Tuples.tuple(x, y, z, w);
});

Then("a1 + a2 = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(Tuples.add(this.a1, this.a2)).to.have.same.members(Tuples.tuple(x, y, z, w));
})