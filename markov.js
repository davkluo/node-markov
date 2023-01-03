/** Textual markov chain generator. */

const _ = require('lodash');

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i+1] || null;

      if (chains.has(word)) {
        if (!chains.get(word).includes(nextWord)) {
          chains.get(word).push(nextWord);
        }
      } else {
        chains.set(word, [nextWord]);
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    let outputText = [];

    let prevWord = Array.from(this.chains.keys())[0];

    while (prevWord !== null) {
      outputText.push(prevWord);
      prevWord = _.sample(this.chains.get(prevWord));
    }

    return outputText.join(' ');
  }
}

const catInHatMachine = new MarkovMachine("The cat in the hat. The cat is also not in the hat simultaneously.");
console.log(catInHatMachine.chains);
console.log(catInHatMachine.getText());