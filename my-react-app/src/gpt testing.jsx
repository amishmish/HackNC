// scratch work for gpt testing until we get it to work

import axios from "axios";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from 'dotenv';
// dotenv is a Node.js module that reads key-value pairs from a .env file and adds them to the process.env object in your Node.js environment.

dotenv.config();
console.log(`Hello ${process.env.OPENAI_API_KEY}`)
console.log("Hello ${process.env.'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'}");

const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

async function getProjectComponents(input) {
    // Asks ChatGPT for materials needed for project.
    const response = await llm.generate("List the materials and quantity of each material needed to build a " + input + " and place each item on a new line in the format 'material == quantity'.")
    let materialDict = newObject();
    for (line in response.split('\n')) {
        if (line.include("==")) {
            const list1 = line.split("==")
            materialDict(list1[0]) = list1[1];
        }
    }
    return materialDict;
}

async function fetchProducts(input) {
    // Uses Unwrangle to get Lowe's product matching each material in dictionary.
    let initialMaterialDict = getProjectComponents(input);
    let totalCost = 0.0;
    let productDict = newObject();
    for (key in initialMaterialDict) {
        let wordToSearch = key.replaceAll(" ", "+");
        let link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+wordToSearch+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
        let response = requests.get(link)
        let firstProduct = response.json()["results"][0] 
            // this will give us a dictionary in the form 
            // {"name": ..., "brand": ..., "id": ..., "url": ..., "rating": ..., "total_ratings":..., 
            // "model_no":..., "in_stock":..., "social_proof_msg":..., "highlights":..., "images":[list],
            // "price":..., "price_reduced":..., "currency":..., etc.}
        productDict[firstProduct["name"]] = [firstProduct["url"],firstProduct["price"]]
        if (firstProduct["price"] != "null") {
            totalCost += firstProduct["price"];
        }     
    }
    return [ productDict, totalCost ]; 
}

async function main(input) {
    const [productDict, totalCost] = fetchProducts(input);
    console.log(productDict);
    console.log(totalCost);
}

main();
