"""Integrating the AI"""

import getpass
import os
import requests
from langchain_openai import ChatOpenAI

os.environ["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"] = getpass.getpass()

llm = ChatOpenAI(model="gpt-4o-mini")

endpoint = "https://www.lowes.com/?cm_mmc=src-_-c-_-brd-_-mdv-_-ggl-_-CRP_SRC_Brand_BC_Traffic_MULTI-_-lowes-_-0-_-0-_-0&gad_source=1&gclid=Cj0KCQjwm5e5BhCWARIsANwm06gI8TCRohw0qsAnwR0v7-cNJgJKV-n35ZuKd1a-qybzymSdo1PluO4aArKsEALw_wcB&gclsrc=aw.ds"

def fetch_products_in_store():
    params = {"platform": "lowes_website_inventory"}
    response = request.get(endpoint, params = params)
    if response.status_code == 200:
        return response.json()["products"]
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return None
def get_project_materials(project_description):
    response = llm.generate(f"List the materials needed to build a {project_description} using products from Lowe's.")
    return response 
def match_materials_with_product(materials, products):
    match_product = []
    


