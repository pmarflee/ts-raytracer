import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then, TableDefinition } from "cucumber";
import Matrix from "../../src/matrix";
import Tuple from "../../src/tuple";

chai.use(chaiAlmost(0.00001));

Given("the following {int}x{int} matrix M:", function (width: number, height: number, table: TableDefinition) {
    this.M = Matrix.fromTable(table.raw());
});

Given("the following {int}x{int} matrix A:", function (width: number, height: number, table: TableDefinition) {
    this.A = Matrix.fromTable(table.raw());
});

Given("the following matrix A:", function (table: TableDefinition) {
    this.A = Matrix.fromTable(table.raw());
});

Given("the following matrix B:", function (table: TableDefinition) {
    this.B = Matrix.fromTable(table.raw());
});

Given("b <- tuple\\({int}, {int}, {int}, {int})", function (x: number, y: number, z: number, w: number) {
    this.b = new Tuple(x, y, z, w);
});

Given("A <- transpose\\(identity_matrix)", function () {
    this.A = Matrix.identity.transpose();
});

Given("B <- submatrix\\(A, {int}, {int})", function (row: number, col: number) {
    this.B = this.A.submatrix(row, col);
});

Given("B <- inverse\\(A)", function () {
    this.B = this.A.inverse();
});

Then("M[{int},{int}] = {float}", function (y: number, x: number, expected: number) {
    expect(this.M.data[y][x]).to.be.equal(expected);
});

Then("A = B", function () {
    expect(this.A.compare(this.B)).to.be.true;
});

Then("A != B", function () {
    expect(this.A.compare(this.B)).to.be.false;
});

Then("A * B is the following {int}x{int} matrix:", function (width: number, height: number, table: TableDefinition) {
    let expected = Matrix.fromTable(table.raw()),
        actual = this.A.multiply(this.B);
    expect(expected.compare(actual)).to.be.true;
});

Then("A * b = tuple\\({int}, {int}, {int}, {int})", function (a: number, b: number, c: number, d: number) {
    expect(this.A.multiply(this.b)).to.eql(new Tuple(a, b, c, d));
});

Then("A * identity_matrix = A", function () {
    expect(this.A.multiply(Matrix.identity)).to.eql(this.A);
});

Then("identity_matrix * a = a", function () {
    expect(Matrix.identity.multiply(this.a)).to.be.eql(this.a);
});

Then("transpose\\(A) is the following matrix", function (table: TableDefinition) {
    expect(this.A.transpose()).to.eql(Matrix.fromTable(table.raw()));
});

Then("A = identity_matrix", function () {
    expect(this.A).to.eql(Matrix.identity);
});

Then("determinant\\(A) = {int}", function (expected: number) {
    expect(this.A.determinant).equals(expected);
});

Then("determinant\\(B) = {int}", function (expected: number) {
    expect(this.B.determinant).equals(expected);
});

Then("submatrix\\(A, {int}, {int}) is the following {int}x{int} matrix:", function (row: number, col: number, width: number, height: number, table: TableDefinition) {
    expect(this.A.submatrix(row, col)).to.eql(Matrix.fromTable(table.raw()));
});

Then("minor\\(A, {int}, {int}) = {int}", function (row: number, col: number, expected: number) {
    expect(this.A.minor(row, col)).to.equal(expected);
});

Then("cofactor\\(A, {int}, {int}) = {int}", function (row: number, col: number, expected: number) {
    expect(this.A.cofactor(row, col)).to.equal(expected);
});

Then("A is invertible", function () {
    expect(this.A.isInvertible).to.be.true;
});

Then("A is not invertible", function () {
    expect(this.A.isInvertible).to.be.false;
});

Then("B[{int},{int}] = {int} / {int}", function (y: number, x: number, numerator: number, denominator: number) {
    expect(this.B.data[y][x]).to.equal(numerator / denominator);
});

Then("B is the following 4x4 matrix:", function (table: TableDefinition) {
    expect(this.B).to.almost.eql(Matrix.fromTable(table.raw()));
});

Then("inverse\\(A) is the following 4x4 matrix:", function (table: TableDefinition) {
    expect(this.A.inverse()).to.almost.eql(Matrix.fromTable(table.raw()));
});