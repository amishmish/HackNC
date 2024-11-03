// scratch work for gpt testing until we get it to work

import axios from "axios";
import { ChatOpenAI } from "@langchain/openai";
// import dotenv from 'dotenv'; // dotenv is a Node.js module that reads key-value pairs from a .env file and adds them to the process.env object in your Node.js environment.

// let's look closely at this python function:
// def get_products(word): # gets product from Lowe's API based on word search
    // """Returns first product in results of searching for <word> in Lowe's API"""
    // global lowes_word""
    // link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+word+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    // response = requests.get(link)
    // lowes_word = word
    // return response.json()["Results"][0]



// dotenv.config();
console.log("Hello ${process.env.'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'}");

// process.env[OPENAI_API_KEY] = await getpass.getPass();

const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

async function getProduct(word) { // gets product from Lowe's API based on word search
    const link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search=' + word + '&api_key=8e2ed113c38dce504bd8557d66cb54719be94205';
    const response = await axios.get(link);
    return response.data.Results[0];
}

async function getProjectMaterials(projectDescription) { //asks GPT for materials for project input
    const link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search=' + projectDescription + '&api_key=8e2ed113c38dce504bd8557d66cb54719be94205';
    const response = await llm.generate("List the materials needed to build a ${projectDescription} using products from ${link} and place each item on a new line.");
    return response.split('\n');
}

async function getProjectQuantity(materials, project) { //asks GPT for materials for project input
    const returnDict = {};
    for (const item of materials) {
        const response = await llm.generate("How much of ${item} do we need to make ${project}?");
        returnDict[item] = response;
    }
    return returnDict;
}

async function getProductCosts(quantityDict) { //materials comes from the gpt function, input material list??
    let totalCost = 0;
    const totalCostList = [];
    const costList = [];
    const materials = Object.keys(quantityDict);
    const quantities = Object.values(quantityDict);

    for (let idx = 0; idx < materials.length; idx++) {
        const product = await getProduct(materials[idx]); //assign product var to matching Lowe's product based on material
        const productCost = product.price; //find price
        const quantity = parseInt(quantities[idx]);
        costList.push(productCost);
        totalCostList.push(productCost * quantity);
        totalCost += (productCost * quantity);
    }

    return [totalCost, costList, totalCostList];
}

function displayTable(materials, quantity, costs, totalCosts) { //table with material, quantity, cost, total cost
    console.log("Project Materials and Costs");
    const data = { "Material": materials, "Quantity": quantity, "Cost per Item": costs, "Total Cost per Item": totalCosts };
    return data;
}

async function main(input) {
    const materials = await getProjectMaterials(input);
    const quantities = await getProjectQuantity(materials, input);

    const stuff = await getProductCosts(quantities);
    const totalCost = stuff[0];
    const costs = stuff[1];
    const totalCosts = stuff[2];
    return displayTable(materials, Object.values(quantities), costs, totalCosts);
}
