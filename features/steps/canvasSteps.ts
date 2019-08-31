import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import chaiString from "chai-string";
import { Given, When, Then } from "cucumber";
import Color from "../../src/color";
import Canvas from "../../src/canvas";

chai.use(chaiAlmost(0.00001));
chai.use(chaiString);

Given("c <- canvas\\({int}, {int})", function (width: number, height: number) {
    this.canvas = new Canvas(width, height);
});

Then("c.width = {int}", function (expected: number) {
    expect(this.canvas.width).to.be.equal(expected);
});

Then("c.height = {int}", function (expected: number) {
    expect(this.canvas.height).to.be.equal(expected);
});

Then("every pixel of c is color\\({int}, {int}, {int})", function (red: number, green: number, blue: number) {
    let expected = Color.fromRGB(0, 0, 0);

    for (let i = 0; i < this.canvas.height; i++) {
        for (let j = 0; j < this.canvas.width; j++) {
            expect(this.canvas.readPixel(j, i)).to.eql(expected);
        }
    }
});

Given("red <- color\\({int}, {int}, {int})", function (r: number, g: number, b: number) {
    this.red = Color.fromRGB(r, g, b);
});

When("write_pixel\\(c, {int}, {int}, red)", function (x: number, y: number) {
    this.canvas.writePixel(x, y, this.red);
});

Then("pixel_at\\(c, {int}, {int}) = red", function (x: number, y: number) {
    expect(this.canvas.readPixel(x, y)).to.eql(this.red);
});

When("ppm <- canvas_to_ppm\\(c)", function () {
    this.ppm = this.canvas.toPPM();
});

Then("lines {int}-{int} of ppm are", function (from: number, to: number, expected: string) {
    let expectedLines = expected.split("\n"),
        actualLines = this.ppm.split("\n").slice(from - 1, to);
    expect(actualLines).to.be.eql(expectedLines);
});

Given("c3 <- color\\({float}, {float}, {float})", function (r: number, g: number, b: number) {
    this.c3 = Color.fromRGB(r, g, b);
});

When("write_pixel\\(c, {int}, {int}, c1)", function (x: number, y: number) {
    this.canvas.writePixel(x, y, this.c1);
});

When("write_pixel\\(c, {int}, {int}, c2)", function (x: number, y: number) {
    this.canvas.writePixel(x, y, this.c2);
});

When("write_pixel\\(c, {int}, {int}, c3)", function (x: number, y: number) {
    this.canvas.writePixel(x, y, this.c3);
});

Given("every pixel of c is set to color\\({float}, {float}, {float})", function (red: number, green: number, blue: number) {
    for (let i = 0; i < this.canvas.height; i++) {
        for (let j = 0; j < this.canvas.width; j++) {
            this.canvas.writePixel(j, i, Color.fromRGB(red, green, blue));
        }
    }
});

Then("ppm ends with a newline character", function () {
    expect(this.ppm).to.endsWith("\n");
});