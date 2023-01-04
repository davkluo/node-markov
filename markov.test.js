"use strict";

const { mapKeys } = require('lodash');
const MarkovMachine = require("./markov");

let seedText = "This is a test."
let testMarkovMachine;
let dupMarkovMachine;

beforeEach(function () {
    testMarkovMachine = new MarkovMachine(seedText);
    dupMarkovMachine = new MarkovMachine('A test is a test if it tests.');
});

describe("getChains instance method", function() {

    test('should return a Map', function() {
        expect(testMarkovMachine.getChains()).toEqual(expect.any(Map));
    })

    test("should return chain map", function() {
        const testMap = new Map([
            ["This", ["is"]],
            ["is", ["a"]],
            ["a", ["test."]],
            ["test.", [null]]
        ]);
        expect(testMarkovMachine.getChains()).toEqual(testMap);
    });

    test('should work with duplicate words', function() {
        const dupMap = new Map([
            ['A', ['test']],
            ['test', ['is', 'if']],
            ['is', ['a']],
            ['a', ['test']],
            ['if', ['it']],
            ['it', ['tests.']],
            ['tests.', [null]]
        ]);
        expect(dupMarkovMachine.getChains()).toEqual(dupMap);
    });
});

describe("getText instance method", function() {

    test('should return a string', function() {
        expect(testMarkovMachine.getText()).toEqual(expect.any(String));
    })

    test("should return string same as seed text (no duplicate words).", function() {
        expect(testMarkovMachine.getText()).toEqual(seedText);
    });

    test('should have consistent first/last words if given 1 sentence', function() {
        // expect(dupMarkovMachine.getText().startsWith('A ')).toBeTruthy();
        // expect(dupMarkovMachine.getText().endsWith(' tests.')).toBeTruthy();
        // WOWOWOWOWO
        expect(dupMarkovMachine.getText()).toMatch(/^A .* tests\.$/);
    })

});