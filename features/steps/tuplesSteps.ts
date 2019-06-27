import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then } from "cucumber";
import { Tuple, Tuples } from "../../src/tuples";

let actual: Tuple,
    a: Tuple,
    a1: Tuple,
    a2: Tuple,
    b: Tuple,
    p: Tuple,
    p1: Tuple,
    p2: Tuple,
    v: Tuple,
    v1: Tuple,
    v2: Tuple,
    zero: Tuple,
    norm: Tuple,
    c: Tuple,
    c1: Tuple,
    c2: Tuple;

chai.use(chaiAlmost(0.00001));

Given("a <- tuple\\({float}, {float}, {float}, {float})", function (x: number, y: number, z: number, w: number) {
    actual = Tuples.tuple(x, y, z, w);
});

Then("a.x = {float}", function (expected: number) {
    expect(actual[0]).to.be.equal(expected);
});

Then("a.y = {float}", function (expected: number) {
    expect(actual[1]).to.be.equal(expected);
});

Then("a.z = {float}", function (expected: number) {
    expect(actual[2]).to.be.equal(expected);
});

Then("a.w = {float}", function (expected: number) {
    expect(actual[3]).to.be.equal(expected);
});

Then("a is a point", function () {
    expect(actual[3]).to.be.equal(1.0);
});

Then("a is not a vector", function () {
    expect(actual[3]).to.not.be.equal(0.0);
});

Then("a is a vector", function () {
    expect(actual[3]).to.be.equal(0.0);
});

Given("p <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    p = Tuples.point(x, y, z);
});

Then("p = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(p).to.eql(Tuples.tuple(x, y, z, w));
});

Given("v <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    v = Tuples.vector(x, y, z);
});

Then("v = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(v).to.eql(Tuples.tuple(x, y, z, w));
});

Given("a1 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    a1 = Tuples.tuple(x, y, z, w);
});

Given("a2 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    a2 = Tuples.tuple(x, y, z, w);
});

Then("a1 + a2 = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(Tuples.add(a1, a2)).to.eql(Tuples.tuple(x, y, z, w));
});

Given("p1 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    p1 = Tuples.point(x, y, z);
});

Given("p2 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    p2 = Tuples.point(x, y, z);
});

Then("p1 - p2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(p1, p2)).to.eql(Tuples.vector(x, y, z));
});

Then("p - v = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(p, v)).to.eql(Tuples.point(x, y, z));
});

Given("v1 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    v1 = Tuples.vector(x, y, z);
});

Given("v2 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    v2 = Tuples.vector(x, y, z);
});

Then("v1 - v2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(v1, v2)).to.eql(Tuples.vector(x, y, z));
});

Given("zero <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    zero = Tuples.vector(x, y, z);
});

Then("zero - v = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.subtract(zero, v)).to.eql(Tuples.vector(x, y, z));
});

Given("a <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    actual = Tuples.tuple(x, y, z, w);
});

Then("-a = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(Tuples.negate(actual)).to.eql(Tuples.tuple(x, y, z, w));
});

Then("a * {float} = tuple\\({float}, {float}, {float}, {float})", function (v: number, x: number, y: number, z: number, w: number) {
    expect(Tuples.multiply(actual, v)).to.eql(Tuples.tuple(x, y, z, w));
});

Then("a / {float} = tuple\\({float}, {float}, {float}, {float})", function (v: number, x: number, y: number, z: number, w: number) {
    expect(Tuples.divide(actual, v)).to.eql(Tuples.tuple(x, y, z, w));
});

Then("magnitude\\(v) = {int}", function (expected: number) {
    expect(Tuples.magnitude(v)).to.equal(expected);
});

Then("magnitude\\(v) = √{int}", function (expected: number) {
    expect(Tuples.magnitude(v)).to.equal(Math.sqrt(expected));
});

Then("normalize\\(v) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.normalize(v)).to.eql(Tuples.vector(x, y, z));
});

Then("normalize\\(v) = approximately vector\\({float}, {float}, {float})", function (x: number, y: number, z: number) {
    expect(Tuples.normalize(v)).to.almost.eql(Tuples.vector(x, y, z));
});

When("norm <- normalize\\(v)", function () {
    norm = Tuples.normalize(v);
});

Then("magnitude\\(norm) = {int}", function (v: number) {
    expect(Tuples.magnitude(norm)).to.equal(v);
});

Given("a <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    a = Tuples.vector(x, y, z);
});

Given("b <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    b = Tuples.vector(x, y, z);
});

Then("dot\\(a, b) = {int}", function (expected: number) {
    expect(Tuples.dot(a, b)).to.equal(expected);
});

Then("cross\\(a, b) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.cross(a, b)).to.eql(Tuples.vector(x, y, z));
});

Then("cross\\(b, a) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(Tuples.cross(b, a)).to.eql(Tuples.vector(x, y, z));
});

Given("c <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    c = Tuples.color(red, green, blue);
});

Then("c.red = {float}", function (expected: number) {
    expect(c[0]).to.equal(expected);
});

Then("c.green = {float}", function (expected: number) {
    expect(c[1]).to.equal(expected);
});

Then("c.blue = {float}", function (expected: number) {
    expect(c[2]).to.equal(expected);
});

Given("c1 <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    c1 = Tuples.color(red, green, blue);
});

Given("c2 <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    c2 = Tuples.color(red, green, blue);
});

Then("c1 + c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(Tuples.add(c1, c2)).to.eql(Tuples.color(red, green, blue));
});

Then("c1 - c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(Tuples.subtract(c1, c2)).to.almost.eql(Tuples.color(red, green, blue));
});

Then("c * {float} = color\\({float}, {float}, {float})", function (multiplier: number, red: number, green: number, blue: number) {
    expect(Tuples.multiply(c, multiplier)).to.eql(Tuples.color(red, green, blue));
});

Then("c1 * c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(Tuples.hadamardProduct(c1, c2)).to.almost.eql(Tuples.color(red, green, blue));
});