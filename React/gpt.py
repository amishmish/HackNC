"""Integrating the AI"""

import getpass
import os
import requests
from langchain_openai import ChatOpenAI
import pandas as pd

os.environ["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"] = getpass.getpass()

llm = ChatOpenAI(model="gpt-4o-mini")

lowes_word = str()
project_descript = str()
cost_list = list()
total_cost_list = list()
total_cost = 0
material_list = list()
quantity_list = list()


def get_products(word): # gets product from Lowe's API based on word search
    global lowes_word
    link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+word+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    response = requests.get(link)
    lowes_word = word
    return response.json()["Results"][0]

def get_project_materials(project_description): #asks GPT for materials for project input
    global project_descript
    link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+lowes_word+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    response = llm.generate(f"List the materials needed to build a {project_description} using products from {link} and separate each item with only a comma.")
    project_descript = project_description
    return response.split("\n")

def get_project_quantity(project_description): #asks GPT for materials for project input
    link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+lowes_word+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    response = llm.generate(f"List the quantity of each material needed to build a {project_description} using products from {link} and separate each item with only a comma.")
    return response.split("\n")

def get_product_costs(): #materials comes from the gpt function, input material list??
    for idx in range(0, len(material_list)):
        global total_cost
        product = get_products(material_list[idx])
        product_cost = product['price']
        quantity = quantity_list[idx]
        cost_list.append(product_cost)
        total_cost_list.append(product_cost * quantity)
        total_cost += (product_cost * quantity)

def display_table(): #table with material, quantity, cost, total cost
    print("Project Materials and Costs")
    data = { "Material": material_list, "Quantity": quantity_list, "Cost per Item": cost_list, "Total Cost per Item": total_cost_list}
    df = pd.DataFrame(data)
    print(df)
    print(total_cost)

quantity_list = get_project_quantity(project_descript).split(",")
material_list = get_project_materials(project_descript).split(",")