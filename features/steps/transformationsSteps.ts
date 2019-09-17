import chai from "chai";
import { expect } from "chai";
import chaiAlmost from "chai-almost";
import { Given, When, Then, TableDefinition } from "cucumber";
import Matrix from "../../src/matrix";
import Tuple from "../../src/tuple";

chai.use(chaiAlmost(0.00001));

Given("transform <- translation\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    this.transform = Matrix.translation(x, y, z);
});

Given("inv <- inverse\\(transform)", function () {
    this.inv = this.transform.inverse();
});

Then("transform * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.transform.multiply(this.p)).to.eql(Tuple.point(x, y, z));
});

Then("inv * p = point\\({int}, {int}, {int})", function (x: number, y: number, z: number) {
    expect(this.inv.multiply(this.p)).to.eql(Tuple.point(x, y, z));
});

Then("transform * v = v", function () {                                
    expect(this.transform.multiply(this.v)).to.eql(this.v);
});                                                                    
