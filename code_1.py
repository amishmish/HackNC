"""Making the code in our program"""

import getpass
import os
from langchain_openai import ChatOpenAI
import requests

os.environ["LANGCHAIN_TRACING_V2"] = "true"

llm = ChatOpenAI(model="gpt-4o-mini",api_key="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")

response = requests.get("https://data.unwrangle.com/api/getter/?platform="lowes_search"")

if response.status_code == 200:
        products = response.json().get('products', [])