"""Getting An API"""


import requests

# Define the endpoint and parameters
endpoint = "https://your-api-url.com/api/getter/"
params = {
    "platform": "lowes_detail",
    "url": "https://www.lowes.com/pd/Example-Product/1234567"  # Replace with the actual product URL
}

# Make the GET request
response = requests.get(endpoint, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    product_data = response.json()
    print(product_data)
else:
    print(f"Failed to retrieve data: {response.status_code}")
