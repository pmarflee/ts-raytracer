import chai from "chai";
import { expect } from "chai";
import { Given, When, Then, TableDefinition } from "cucumber";
import { Matrices } from "../../src/matrices";

Given("the following {int}x{int} matrix M:", function (width: number, height: number, table: TableDefinition) {
    this.M = Matrices.matrix(width, height, table.raw());
});

Then("M[{int},{int}] = {float}", function (y: number, x: number, expected: number) {
    expect(this.M[y][x]).to.be.equal(expected);
});