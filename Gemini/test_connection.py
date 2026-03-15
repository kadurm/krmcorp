"""
Script para testar a conexão com a API do Gemini
"""

import os
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("❌ Erro: GEMINI_API_KEY não encontrada no arquivo .env")
    print("   Verifique se o arquivo .env existe e contém a chave.")
    exit(1)

print("✅ API Key carregada com sucesso!")
print(f"   Chave: {API_KEY[:10]}...{API_KEY[-5:]}")

# Testa a conexão
try:
    from google import genai

    client = genai.Client(api_key=API_KEY)

    # Testa listando modelos disponíveis
    print("\n📡 Testando conexão com a API...")

    models = client.models.list()

    print("✅ Conexão estabelecida com sucesso!")
    print(f"\n📦 Modelos disponíveis ({len(models)} encontrados):")

    for model in models:
        print(f"   - {model.name}")

    # Verifica se o modelo de geração de imagens está disponível
    image_model = "gemini-2.0-flash-exp-image-generation"
    print(f"\n🔍 Verificando modelo de imagens...")

    try:
        model_info = client.models.get(model=image_model)
        print(f"✅ Modelo '{image_model}' disponível!")
        print(f"   Display name: {model_info.display_name}")
    except Exception as e:
        print(f"⚠️ Modelo '{image_model}' não encontrado ou sem acesso")
        print(f"   Erro: {e}")

    print("\n" + "=" * 50)
    print("🎉 Conexão verificada com sucesso!")
    print("=" * 50)

except ImportError:
    print("❌ Erro: Biblioteca 'google-genai' não instalada")
    print("   Execute: pip install google-genai")
    exit(1)

except Exception as e:
    print(f"❌ Erro ao conectar: {e}")
    print("\nPossíveis causas:")
    print("   - API Key inválida ou expirada")
    print("   - Sem conexão com internet")
    print("   - Problemas com o serviço do Google")
    exit(1)
