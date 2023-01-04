"use strict";

/** Textual markov chain generator using bigrams. */

const sample = require('lodash/sample');

class BigMarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains using bigrams.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The cat": ["in"],
   *   "cat in": ["the"],
   *   "in the": ["hat"],
   *   "the hat.": [null]
   *  }
   *
   * */

  getChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i++) {
      const bigram = `${this.words[i]} ${this.words[i+1]}`;
      const nextWord = this.words[i+2] || null;

      if (chains.has(bigram)) {
        chains.get(bigram).push(nextWord);
      } else {
        chains.set(bigram, [nextWord]);
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first bigram and continuing
   *  until it hits a null choice. */

  getText() {
    if (this.words.length <= 2) {
      return this.words.join(' ');
    }

    let outputText = [this.words[0], this.words[1]];
    let bigram = `${this.words[0]} ${this.words[1]}`;
    let nextWord = sample(this.chains.get(bigram));

    while (nextWord !== null) {
      bigram = `${outputText[outputText.length - 1]} ${nextWord}`
      outputText.push(nextWord);

      nextWord = sample(this.chains.get(bigram));
    }

    return outputText.join(' ');
  }
}

module.exports = BigMarkovMachine;