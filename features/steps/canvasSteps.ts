import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then } from "cucumber";
import { Tuple, Tuples } from "../../src/tuples";
import Canvas from "../../src/canvas";

let canvas: Canvas,
    red: Tuple;

chai.use(chaiAlmost(0.00001));

Given("c <- canvas\\({int}, {int})", (width: number, height: number) => {
    canvas = new Canvas(width, height);
});

Then("c.width = {int}", (expected: number) => {
    expect(canvas.width).to.be.equal(expected);
});

Then("c.height = {int}", (expected: number) => {
    expect(canvas.height).to.be.equal(expected);
});

Then("every pixel of c is color\\({int}, {int}, {int})", (red: number, green: number, blue: number) => {
    let expected = Tuples.color(0, 0, 0);

    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            expect(canvas.readPixel(j, i)).to.eql(expected);
        }
    }
});

Given("red <- color\\({int}, {int}, {int})", (r: number, g: number, b: number) => {
    red = Tuples.color(r, g, b);
});

When("write_pixel\\(c, {int}, {int}, red)", (x: number, y: number) => {
    canvas.writePixel(x, y, red);
});

Then("pixel_at\\(c, {int}, {int}) = red", (x: number, y: number) => {
    expect(canvas.readPixel(x, y)).to.eql(red);
});