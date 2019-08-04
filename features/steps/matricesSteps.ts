import chai from "chai";
import { expect } from "chai";
import { Given, When, Then, TableDefinition } from "cucumber";
import { Matrices } from "../../src/matrices";

Given("the following {int}x{int} matrix M:", function (width: number, height: number, table: TableDefinition) {
    this.M = Matrices.matrix(table.raw());
});

Given("the following matrix A:", function (table: TableDefinition) {
    this.A = Matrices.matrix(table.raw());
});

Given("the following matrix B:", function (table: TableDefinition) {
    this.B = Matrices.matrix(table.raw());
});

Then("M[{int},{int}] = {float}", function (y: number, x: number, expected: number) {
    expect(this.M[y][x]).to.be.equal(expected);
});

Then("A = B", function () {
    expect(Matrices.compare(this.A, this.B)).to.be.true;
});

Then("A != B", function () {
    expect(Matrices.compare(this.A, this.B)).to.be.false;
});