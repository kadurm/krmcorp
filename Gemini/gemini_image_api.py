"""
Script para geração de imagens usando a API do Gemini (Google)
"""

import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Carrega variáveis do arquivo .env
load_dotenv()

# Configuração da API Key
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("API_KEY não encontrada. Configure no arquivo .env")

def initialize_client():
    """Inicializa o cliente da API Gemini"""
    client = genai.Client(api_key=API_KEY)
    return client

def generate_image(prompt: str, output_file: str = "generated_image.png"):
    """
    Gera uma imagem a partir de um prompt de texto

    Args:
        prompt: Descrição da imagem que você quer gerar
        output_file: Nome do arquivo para salvar a imagem

    Returns:
        None (salva a imagem no disco)
    """
    client = initialize_client()

    print(f"Gerando imagem para: '{prompt}'...")

    # Usa o modelo Nano Banana (gratuito)
    response = client.models.generate_images(
        model="gemini-2.5-flash-image",
        prompt=prompt,
        config=types.GenerateImagesConfig(
            aspect_ratio="1:1"
        )
    )

    # Salva a imagem gerada
    image_data = response.images[0].image
    image_data.save(output_file)

    print(f"Imagem salva como: {output_file}")
    return output_file

def generate_image_with_options(
    prompt: str,
    negative_prompt: str = None,
    aspect_ratio: str = "1:1",
    output_file: str = "generated_image.png"
):
    """
    Gera uma imagem com opções personalizadas

    Args:
        prompt: Descrição da imagem
        negative_prompt: O que NÃO deve aparecer na imagem
        aspect_ratio: Proporção da imagem (1:1, 16:9, 9:16, 4:3, 3:4)
        output_file: Nome do arquivo para salvar

    Returns:
        None (salva a imagem no disco)
    """
    client = initialize_client()

    config = {
        "aspect_ratio": aspect_ratio,
    }

    if negative_prompt:
        config["negative_prompt"] = negative_prompt

    print(f"Gerando imagem com configurações personalizadas...")
    print(f"  Prompt: {prompt}")
    print(f"  Aspect Ratio: {aspect_ratio}")
    if negative_prompt:
        print(f"  Negative Prompt: {negative_prompt}")

    response = client.models.generate_images(
        model="gemini-2.5-flash-image",
        prompt=prompt,
        config=types.GenerateImagesConfig(**config)
    )

    image_data = response.images[0].image
    image_data.save(output_file)

    print(f"Imagem salva como: {output_file}")
    return output_file

if __name__ == "__main__":
    # Exemplo de uso
    print("=" * 50)
    print("Gemini Image Generation API")
    print("=" * 50)

    # Teste básico
    prompt = "Um gato futurista em uma cidade cyberpunk, estilo neon"
    generate_image(prompt, "gato_cyberpunk.png")

    # Teste com opções
    generate_image_with_options(
        prompt="Uma paisagem de montanhas com lago reflexivo ao amanhecer",
        negative_prompt="pessoas, carros, construções",
        aspect_ratio="16:9",
        output_file="paisagem.png"
    )
