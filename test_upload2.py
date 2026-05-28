import requests

url = "https://api.cloudinary.com/v1_1/dv1ole3bn/image/upload"
data = {
    "upload_preset": "gayatri-project"
}
files = {
    "file": ("test.png", b"fakeimagebytes", "image/png")
}

response = requests.post(url, data=data, files=files)
print("Status Code:", response.status_code)
print("Response:", response.json())
