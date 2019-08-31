import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then } from "cucumber";
import Tuple from "../../src/tuple";
import Color from "../../src/color";

chai.use(chaiAlmost(0.00001));

Given("a <- tuple\\({float}, {float}, {float}, {float})", function (x: number, y: number, z: number, w: number) {
    this.a = new Tuple(x, y, z, w);
});

Then("a.x = {float}", function (expected: number) {
    expect(this.a.x).to.be.equal(expected);
});

Then("a.y = {float}", function (expected: number) {
    expect(this.a.y).to.be.equal(expected);
});

Then("a.z = {float}", function (expected: number) {
    expect(this.a.z).to.be.equal(expected);
});

Then("a.w = {float}", function (expected: number) {
    expect(this.a.w).to.be.equal(expected);
});

Then("a is a point", function () {
    expect(this.a.w).to.be.equal(1.0);
});

Then("a is not a vector", function () {
    expect(this.a.w).to.not.be.equal(0.0);
});

Then("a is a vector", function () {
    expect(this.a.w).to.be.equal(0.0);
});

Given("p <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p = Tuple.point(x, y, z);
});

Then("p = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.p).to.eql(new Tuple(x, y, z, w));
});

Given("v <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v = Tuple.vector(x, y, z);
});

Then("v = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.v).to.eql(new Tuple(x, y, z, w));
});

Given("a1 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a1 = new Tuple(x, y, z, w);
});

Given("a2 <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.a2 = new Tuple(x, y, z, w);
});

Then("a1 + a2 = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.a1.add(this.a2)).to.eql(new Tuple(x, y, z, w));
});

Given("p1 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p1 = Tuple.point(x, y, z);
});

Given("p2 <- point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.p2 = Tuple.point(x, y, z);
});

Then("p1 - p2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.p1.subtract(this.p2)).to.eql(Tuple.vector(x, y, z));
});

Then("p - v = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.p.subtract(this.v)).to.eql(Tuple.point(x, y, z));
});

Given("v1 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v1 = Tuple.vector(x, y, z);
});

Given("v2 <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.v2 = Tuple.vector(x, y, z);
});

Then("v1 - v2 = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.v1.subtract(this.v2)).to.eql(Tuple.vector(x, y, z));
});

Given("zero <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.zero = Tuple.vector(x, y, z);
});

Then("zero - v = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.zero.subtract(this.v)).to.eql(Tuple.vector(x, y, z));
});

Given("a <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.actual = new Tuple(x, y, z, w);
});

Then("-a = tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    expect(this.actual.negate()).to.eql(new Tuple(x, y, z, w));
});

Then("a * {float} = tuple\\({float}, {float}, {float}, {float})", function (v: number, x: number, y: number, z: number, w: number) {
    expect(this.actual.multiply(v)).to.eql(new Tuple(x, y, z, w));
});

Then("a / {float} = tuple\\({float}, {float}, {float}, {float})", function (v: number, x: number, y: number, z: number, w: number) {
    expect(this.actual.divide(v)).to.eql(new Tuple(x, y, z, w));
});

Then("magnitude\\(v) = {int}", function (expected: number) {
    expect(this.v.magnitude).to.equal(expected);
});

Then("magnitude\\(v) = √{int}", function (expected: number) {
    expect(this.v.magnitude).to.equal(Math.sqrt(expected));
});

Then("normalize\\(v) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.v.normalize()).to.eql(Tuple.vector(x, y, z));
});

Then("normalize\\(v) = approximately vector\\({float}, {float}, {float})", function (x: number, y: number, z: number) {
    expect(this.v.normalize()).to.almost.eql(Tuple.vector(x, y, z));
});

When("norm <- normalize\\(v)", function () {
    this.norm = this.v.normalize();
});

Then("magnitude\\(norm) = {int}", function (v: number) {
    expect(this.norm.magnitude).to.equal(v);
});

Given("a <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.a = Tuple.vector(x, y, z);
});

Given("b <- vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.b = Tuple.vector(x, y, z);
});

Then("dot\\(a, b) = {int}", function (expected: number) {
    expect(this.a.dot(this.b)).to.equal(expected);
});

Then("cross\\(a, b) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.a.cross(this.b)).to.eql(Tuple.vector(x, y, z));
});

Then("cross\\(b, a) = vector\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.b.cross(this.a)).to.eql(Tuple.vector(x, y, z));
});

Given("c <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    this.c = Color.fromRGB(red, green, blue);
});

Then("c.red = {float}", function (expected: number) {
    expect(this.c.red).to.equal(expected);
});

Then("c.green = {float}", function (expected: number) {
    expect(this.c.green).to.equal(expected);
});

Then("c.blue = {float}", function (expected: number) {
    expect(this.c.blue).to.equal(expected);
});

Given("c1 <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    this.c1 = Color.fromRGB(red, green, blue);
});

Given("c2 <- color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    this.c2 = Color.fromRGB(red, green, blue);
});

Then("c1 + c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(this.c1.add(this.c2)).to.eql(Color.fromRGB(red, green, blue));
});

Then("c1 - c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(this.c1.subtract(this.c2)).to.almost.eql(Color.fromRGB(red, green, blue));
});

Then("c * {float} = color\\({float}, {float}, {float})", function (multiplier: number, red: number, green: number, blue: number) {
    expect(this.c.multiply(multiplier)).to.eql(Color.fromRGB(red, green, blue));
});

Then("c1 * c2 = color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    expect(this.c1.hadamardProduct(this.c2)).to.almost.eql(Color.fromRGB(red, green, blue));
});