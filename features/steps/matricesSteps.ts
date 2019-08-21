import chai from "chai";
import { expect } from "chai";
import { Given, When, Then, TableDefinition } from "cucumber";
import { Matrices } from "../../src/matrices";
import { Tuples } from "../../src/tuples";

Given("the following {int}x{int} matrix M:", function (width: number, height: number, table: TableDefinition) {
    this.M = Matrices.matrix(table.raw());
});

Given("the following {int}x{int} matrix A:", function (width: number, height: number, table: TableDefinition) {
    this.A = Matrices.matrix(table.raw());
});

Given("the following matrix A:", function (table: TableDefinition) {
    this.A = Matrices.matrix(table.raw());
});

Given("the following matrix B:", function (table: TableDefinition) {
    this.B = Matrices.matrix(table.raw());
});

Given("b <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.b = Tuples.tuple(x, y, z, w);
});

Given("A <- transpose\\(identity_matrix)", function () {
    this.A = Matrices.transpose(Matrices.identity);
});

Given("B <- submatrix\\(A, {int}, {int})", function (row: number, col: number) {
    this.B = Matrices.submatrix(this.A, row, col);
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

Then("A * B is the following {int}x{int} matrix:", function (width: number, height: number, table: TableDefinition) {
    let expected = Matrices.matrix(table.raw()),
        actual = Matrices.multiply(this.A, this.B);
    expect(Matrices.compare(expected, actual)).to.be.true;
});

Then("A * b = tuple\\({int}, {int}, {int}, {int})", function (a: number, b: number, c: number, d: number) {
    expect(Matrices.multiplyByTuple(this.A, this.b)).to.eql(Tuples.tuple(a, b, c, d));
});

Then("A * identity_matrix = A", function () {
    expect(Matrices.multiply(this.A, Matrices.identity)).to.eql(this.A);
});

Then("identity_matrix * a = a", function () {
    expect(Matrices.multiplyByTuple(Matrices.identity, this.a)).to.be.eql(this.a);
});

Then("transpose\\(A) is the following matrix", function (table: TableDefinition) {
    expect(Matrices.transpose(this.A)).to.eql(Matrices.matrix(table.raw()));
});

Then("A = identity_matrix", function () {
    expect(this.A).to.eql(Matrices.identity);
});

Then("determinant\\(A) = {int}", function (expected: number) {
    expect(Matrices.determinant(this.A)).equals(expected);
});

Then("determinant\\(B) = {int}", function (expected: number) {
    expect(Matrices.determinant(this.B)).equals(expected);
});

Then("submatrix\\(A, {int}, {int}) is the following {int}x{int} matrix:", function (row: number, col: number, width: number, height: number, table: TableDefinition) {
    expect(Matrices.submatrix(this.A, row, col)).to.eql(Matrices.matrix(table.raw()));
});

Then("minor\\(A, {int}, {int}) = {int}", function (row: number, col: number, expected: number) {
    expect(Matrices.minor(this.A, row, col)).to.equal(expected);
});

Then("cofactor\\(A, {int}, {int}) = {int}", function (row: number, col: number, expected: number) {
    expect(Matrices.cofactor(this.A, row, col)).to.equal(expected);
});

Then("A is invertible", function () {
    expect(Matrices.isInvertible(this.A)).to.be.true;
});

Then("A is not invertible", function () {
    expect(Matrices.isInvertible(this.A)).to.be.false;
});