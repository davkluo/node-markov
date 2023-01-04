"use strict";

const MarkovMachine = require("./markov");
const fsP = require("fs/promises");
const axios = require("axios");

// process.argv[2] --> whether file or url
// process.argv[3] --> the file path or url

const inputType = process.argv[2];
const inputPath = process.argv[3];

if (inputType !== "file" && inputType !== "url") {
    console.error("Invalid input type.")
    process.exit(1);
}

processInputAndGenerateText();

/**
 * processInput: processes input based on user input.
*/
async function processInputAndGenerateText() {
    const inputContent = 
        inputType === "file" ? 
        await processFile(inputPath) : 
        await processUrl(inputPath);

    const newMachine = new MarkovMachine(inputContent);
    
    console.log(newMachine.getText());
}

/**
 * processFile: loads text from provided file; probably instantiate a machine
 */
async function processFile(path) {
    let content;

    try {
        content = await fsP.readFile(path, "utf8");
    } catch(err) {
        console.error(err.message);
        process.exit(1);    
    }

    return content;
}

/**
 * processUrl: loads text from provided Url; probably instantiate a machine
*/
async function processUrl(url) {
    let content;

    try {
        content = (await axios.get(url)).data;
    } catch(err) {
        console.error(err.message);
        process.exit(1);    
    }
    
    return content;
}