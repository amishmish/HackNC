// import getpass from 'getpass';
import axios from "axios";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from 'dotenv';

//require('dotenv').config()
dotenv.config();
console.log(`Hello ${process.env.OPENAI_API_KEY}`)

// process.env[OPENAI_API_KEY] = await getpass.getPass();

const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

//async function getProjectMaterials(userInput) { //asks GPT for materials for project input
    const response = await llm.generate(`List the materials and quantity of each needed to build a ${userInput} place each item on a new line in the format "material == quantity".`);
    return response.split("\n"); //returns a list of each new line in response
}

//async function getCorrectMaterialsList(materialsList) { //removes gpt filler paragraphs //call getProjectMaterials here
    let correctList = [];
    for (let item of materialsList) {
        if (item.include('==')) {
            correctList.push(item); 
        }
        }
    return correctList
    }

async function getProduct(materialsDict) { // gets product from Lowe's API based on word search
    let finalDict = {}
    let count = 0
    for (let material in materialsDict) {
        let link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search=' + word + '&api_key=8e2ed113c38dce504bd8557d66cb54719be94205';
        let response = await axios.get(link);
        let materialName = response.data.results[0]['name']
        let materialPrice = Number(response.data.results[0]['price']) //converts to float
        let materialTotalCost = materialPrice * materialsDict[material]
        console.log(materialName, materialPrice, materialTotalCost)
        finalDict[materialName] = [materialsDict[material], `${materialPrice}`, `${materialTotalCost}`]
        console.log(finalDict)
        count += 1
        if (count > 4) {
            break
        }
    }
    return finalDict
    
}

// async function getProjectQuantity(materials, project) { //call getCorrectMaterialList
    let returnDict = {};
    for (const item of materials) {
        const response = await llm.generate(`How much of ${item} do we need to make ${project}?`);
        returnDict[item] = response;
    }
    return returnDict;
}

// async function getProductCosts(quantityDict) { //materials comes from the gpt function, input material list??
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

//function displayTable(materials, quantity, costs, totalCosts) { //table with material, quantity, cost, total cost
    console.log("Project Materials and Costs");
    const data = { "Material": materials, "Quantity": quantity, "Cost per Item": costs, "Total Cost per Item": totalCosts };
    return data;
}

//async function main(input) {
    const materials = await getProjectMaterials(input);
    const quantities = await getProjectQuantity(materials, input);

    const stuff = await getProductCosts(quantities);
    const totalCost = stuff[0];
    const costs = stuff[1];
    const totalCosts = stuff[2];
    return displayTable(materials, Object.values(quantities), costs, totalCosts);
}

