"""Integrating the AI"""

import getpass
import os
import requests
from langchain_openai import ChatOpenAI

os.environ["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"] = getpass.getpass()

llm = ChatOpenAI(model="gpt-4o-mini")

def get_products(word):
    link = 'https://data.unwrangle.com/api/getter/?platform=lowes_search&search='+word+'&api_key=8e2ed113c38dce504bd8557d66cb54719be94205'
    response = requests.get(link)
    return response.json([results])

def get_project_materials(project_description):
    response = llm.generate(f"List the materials needed to build a {project_description} using products from Lowe's.")
    return response.split("/n")

def get_material_quantities(material, item):
    response = llm.generate(f"How much of the each of these materials (" + material + ") do we need to make a " + item)
    print(response)




    


