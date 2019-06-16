"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var cucumber_1 = require("cucumber");
var tuples_1 = require("../../src/tuples");
cucumber_1.Given("a <- tuple\\({float}, {float}, {float}, {float})", function (x, y, z, w) {
    this.actual = tuples_1.Tuples.tuple(x, y, z, w);
});
cucumber_1.Then("a.x = {float}", function (expected) {
    chai_1.expect(this.actual[0]).to.be.equal(expected);
});
cucumber_1.Then("a.y = {float}", function (expected) {
    chai_1.expect(this.actual[1]).to.be.equal(expected);
});
cucumber_1.Then("a.z = {float}", function (expected) {
    chai_1.expect(this.actual[2]).to.be.equal(expected);
});
cucumber_1.Then("a.w = {float}", function (expected) {
    chai_1.expect(this.actual[3]).to.be.equal(expected);
});
cucumber_1.Then("a is a point", function () {
    chai_1.expect(this.actual[3]).to.be.equal(1.0);
});
cucumber_1.Then("a is not a vector", function () {
    chai_1.expect(this.actual[3]).to.not.be.equal(0.0);
});
cucumber_1.Then("a is a vector", function () {
    chai_1.expect(this.actual[3]).to.be.equal(0.0);
});
