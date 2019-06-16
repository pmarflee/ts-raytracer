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