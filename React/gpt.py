"""Integrating the AI"""

import getpass
import os
import requests
from langchain_openai import ChatOpenAI

os.environ["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"] = getpass.getpass()

llm = ChatOpenAI(model="gpt-4o-mini")

def get_product(word): # gets product from Lowe's API based on word search
    """Returns first product in results of searching for <word> in Lowe's API"""
    link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+word+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    response = requests.get(link)
    return response.json()["Results"][0]

def get_project_materials(project_description): #asks GPT for materials for project input
    """Returns list of all materials needed for <project description> based on GPT's response"""
    link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+project_description+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    response = llm.generate(f"List the materials needed to build a {project_description} using products from {link} and place each item on a new line.")
    return response.split("\n")

def get_project_quantity(materials, project): #asks GPT for materials for project input
    """Returns list of quantities of each material needed for <project description> based on GPT's response"""
    returndict = {}
    for item in materials:
        response = llm.generate(f"How much of "+item+" do we need to make "+ project + "?")
        returndict[item] = response

    return returndict

def get_product_costs(quantity_dict): #materials comes from the gpt function, input material list??
    """Updates each item's cost and builds a list for all of them"""
    total_cost = 0
    total_cost_list = []
    cost_list = []
    materials = quantity_dict.keys()
    quantities = quantity_dict.values()

    for idx in range(0, len(materials)):
        product = get_product(materials[idx]) #assign product var to matching Lowe's product based on material
        product_cost = product['price'] #find price
        quantity = int(quantities[idx])
        cost_list.append(product_cost)
        total_cost_list.append(product_cost * quantity)
        total_cost += (product_cost * quantity)
    
    stuff = [total_cost, cost_list, total_cost_list]
    return stuff

def display_table(materials, quantity, costs, total_costs): #table with material, quantity, cost, total cost
    print("Project Materials and Costs")
    data = { "Material": materials, "Quantity": quantity, "Cost per Item": costs, "Total Cost per Item": total_costs}
    return data


def main(input):
    materials = get_project_materials(input)
    quantities = get_project_quantity(materials, input)

    stuff = get_product_costs(quantities)
    totalCost = stuff[0]
    costs = stuff[1]
    totalCosts = stuff[2]
    
