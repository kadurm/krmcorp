"""
Teste simples para gerar imagem com a API do Gemini
"""

import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

# Teste 1: Nano Banana (gratuito)
print("Teste 1: Nano Banana (gemini-2.5-flash-image)")
try:
    response = client.models.generate_images(
        model="models/gemini-2.5-flash-image",
        prompt="A cute cat",
        config=types.GenerateImagesConfig(aspect_ratio="1:1")
    )
    response.images[0].image.save("test1.png")
    print("SUCCESSO! Imagem salva em test1.png")
except Exception as e:
    print(f"ERRO: {e}")

print()

# Teste 2: Imagen 4 Fast
print("Teste 2: Imagen 4 Fast (imagen-4.0-fast-generate-001)")
try:
    response = client.models.generate_images(
        model="models/imagen-4.0-fast-generate-001",
        prompt="A cute cat",
        config=types.GenerateImagesConfig(aspect_ratio="1:1")
    )
    response.images[0].image.save("test2.png")
    print("SUCCESSO! Imagem salva em test2.png")
except Exception as e:
    print(f"ERRO: {e}")

print()

# Teste 3: Nano Banana 2
print("Teste 3: Nano Banana 2 (gemini-3.1-flash-image-preview)")
try:
    response = client.models.generate_images(
        model="models/gemini-3.1-flash-image-preview",
        prompt="A cute cat",
        config=types.GenerateImagesConfig(aspect_ratio="1:1")
    )
    response.images[0].image.save("test3.png")
    print("SUCCESSO! Imagem salva em test3.png")
except Exception as e:
    print(f"ERRO: {e}")
