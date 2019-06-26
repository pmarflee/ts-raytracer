import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then } from "cucumber";
import { Tuples } from "../../src/tuples";

chai.use(chaiAlmost(0.00001));

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
    expect(this.p).to.eql(Tuples.tuple(x, y, z, w));
});

Given("v <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v = Tuples.vector(x, y, z);
});

Then("v = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.v).to.eql(Tuples.tuple(x, y, z, w));
});

Given("a1 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a1 = Tuples.tuple(x, y, z, w);
});

Given("a2 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a2 = Tuples.tuple(x, y, z, w);
});

Then("a1 + a2 = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(Tuples.add(this.a1, this.a2)).to.eql(Tuples.tuple(x, y, z, w));
});

Given("p1 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p1 = Tuples.point(x, y, z);
});

Given("p2 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p2 = Tuples.point(x, y, z);
});

Then("p1 - p2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.p1, this.p2)).to.eql(Tuples.vector(x, y, z));
});

Then("p - v = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.p, this.v)).to.eql(Tuples.point(x, y, z));
});

Given("v1 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v1 = Tuples.vector(x, y, z);
});

Given("v2 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v2 = Tuples.vector(x, y, z);
});

Then("v1 - v2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.v1, this.v2)).to.eql(Tuples.vector(x, y, z));
});

Given("zero <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.zero = Tuples.vector(x, y, z);
});

Then("zero - v = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(this.zero, this.v)).to.eql(Tuples.vector(x, y, z));
});

Given("a <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.actual = Tuples.tuple(x, y, z, w);
});

Then("-a = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(Tuples.negate(this.actual)).to.eql(Tuples.tuple(x, y, z, w));
});

Then("a * {float} = tuple\\({float}, {float}, {float}, {float})", function (v: number, x: number, y: number, z: number, w: number) {
    expect(Tuples.multiply(this.actual, v)).to.eql(Tuples.tuple(x, y, z, w));
});

Then("a / {float} = tuple\\({float}, {float}, {float}, {float})", function (v: number, x: number, y: number, z: number, w: number) {
    expect(Tuples.divide(this.actual, v)).to.eql(Tuples.tuple(x, y, z, w));
});

Then("magnitude\\(v) = {int}", function (v: number) {
    expect(Tuples.magnitude(this.v)).to.equal(v);
});

Then("magnitude\\(v) = √{int}", function (v: number) {
    expect(Tuples.magnitude(this.v)).to.equal(Math.sqrt(v));
});

Then("normalize\\(v) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.normalize(this.v)).to.eql(Tuples.vector(x, y, z));
});

Then("normalize\\(v) = approximately vector\\({float}, {float}, {float})", function (x: number, y: number, z: number) {
    expect(Tuples.normalize(this.v)).to.almost.eql(Tuples.vector(x, y, z));
});

When("norm <- normalize\\(v)", function () {
    this.norm = Tuples.normalize(this.v);
});

Then("magnitude\\(norm) = {int}", function (v: number) {
    expect(Tuples.magnitude(this.norm)).to.equal(v);
});

Given("a <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.a = Tuples.vector(x, y, z);
});

Given("b <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.b = Tuples.vector(x, y, z);
});

Then("dot\\(a, b) = {int}", function (expected: number) {
    expect(Tuples.dot(this.a, this.b)).to.equal(expected);
});

Then("cross\\(a, b) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.cross(this.a, this.b)).to.eql(Tuples.vector(x, y, z));
});

Then("cross\\(b, a) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.cross(this.b, this.a)).to.eql(Tuples.vector(x, y, z));
});

Given("c <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    this.c = Tuples.color(red, green, blue);
});

Then("c.red = {float}", function (expected: number) {
    expect(this.c[0]).to.equal(expected);
});

Then("c.green = {float}", function (expected: number) {
    expect(this.c[1]).to.equal(expected);
});

Then("c.blue = {float}", function (expected: number) {
    expect(this.c[2]).to.equal(expected);
});

Given("c1 <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    this.c1 = Tuples.color(red, green, blue);
});

Given("c2 <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    this.c2 = Tuples.color(red, green, blue);
});

Then("c1 + c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(Tuples.add(this.c1, this.c2)).to.eql(Tuples.color(red, green, blue));
});

Then("c1 - c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(Tuples.subtract(this.c1, this.c2)).to.almost.eql(Tuples.color(red, green, blue));
});

Then("c * {float} = color\\({float}, {float}, {float})", function (multiplier: number, red: number, green: number, blue: number) {
    expect(Tuples.multiply(this.c, multiplier)).to.eql(Tuples.color(red, green, blue));
});

Then("c1 * c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(Tuples.hadamardProduct(this.c1, this.c2)).to.almost.eql(Tuples.color(red, green, blue));
});