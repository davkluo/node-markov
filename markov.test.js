"use strict";

const MarkovMachine = require("./markov");

let seedText = "This is a test."
let testMarkovMachine;

beforeEach(function () {
    testMarkovMachine = new MarkovMachine(seedText);
})

describe("getChains instance method", function() {
    
    test("should return chain map", function() {
        const testMap = new Map([
            ["This", ["is"]],
            ["is", ["a"]],
            ["a", ["test."]],
            ["test.", [null]]
        ])
        expect(testMarkovMachine.getChains()).toEqual(testMap);
    })

    // testing an input with some duplicate words.
})

describe("getText instance method", function() {

    test("should return string same as seed text (no duplicate words).", function() {
        expect(testMarkovMachine.getText()).toEqual(seedText)
    })
})