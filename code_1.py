"""Making the code in our program"""

import getpass
import os
from langchain_openai import ChatOpenAI
import requests

os.environ["LANGCHAIN_TRACING_V2"] = "true"
# os.environ[' OPENAI_API_KEY']= getpass.getpass("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: ")
# os.environ["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"] = getpass.getpass()
# os.environ["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"] = getpass.getpass()
# print('kEY')
# print(os.environ[' OPENAI_API_KEY'])
llm = ChatOpenAI(model="gpt-4o-mini",api_key="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")

response = requests.get("https://data.unwrangle.com/api/getter/")


