"""
Script para listar modelos de imagem disponíveis
"""

import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

print("Buscando modelos de geracao de imagens...\n")

models = client.models.list()

image_models = []
for model in models:
    name = model.name.replace("models/", "")
    if "image" in name.lower() or "imagen" in name.lower() or "flash" in name.lower():
        image_models.append({
            "name": name,
            "display_name": getattr(model, 'display_name', 'N/A')
        })

print("=" * 60)
print("Modelos relacionados a imagem:")
print("=" * 60)

for m in image_models:
    print(f"  - {m['name']}")
    print(f"    Display: {m['display_name']}")
    print()
