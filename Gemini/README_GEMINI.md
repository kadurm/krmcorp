# Como Configurar e Usar a API do Gemini para Imagens

## Passo 1: Obter sua API Key do Google

1. Acesse: https://aistudio.google.com/apikey
2. Faça login com sua conta Google
3. Clique em **"Create API Key"**
4. Copie a chave gerada

## Passo 2: Instalar as dependências

No terminal, na pasta do projeto, execute:

```bash
pip install google-genai
```

Ou se usar pip3:

```bash
pip3 install google-genai
```

## Passo 3: Configurar a API Key

### Opção A - Variável de Ambiente (Recomendado)

No Windows (PowerShell):
```powershell
$env:GEMINI_API_KEY="sua-chave-aqui"
```

No Windows (CMD):
```cmd
set GEMINI_API_KEY=sua-chave-aqui
```

Para tornar permanente, adicione nas variáveis de ambiente do Windows.

### Opção B - Editar o código

Abra o arquivo `gemini_image_api.py` e substitua:
```python
API_KEY = os.getenv("GEMINI_API_KEY", "SUA_CHAVE_AQUI")
```
Coloque sua chave entre as aspas onde diz `SUA_CHAVE_AQUI`.

## Passo 4: Executar o script

```bash
python gemini_image_api.py
```

## Personalizando

Edite o arquivo `.py` e mude:

- **prompt**: A descrição da imagem que quer gerar
- **aspect_ratio**: `1:1` (quadrado), `16:9` (widescreen), `9:16` (stories), `4:3`, `3:4`
- **negative_prompt**: Coisas que você NÃO quer na imagem
- **output_file**: Nome do arquivo para salvar

## Exemplo de uso em outro script

```python
from gemini_image_api import generate_image_with_options

# Gera uma imagem personalizada
generate_image_with_options(
    prompt="Castelo medieval nas nuvens, fantasia, detalhado",
    negative_prompt="pessoas, texto, marca d'agua",
    aspect_ratio="16:9",
    output_file="castelo.png"
)
```

## Limites e Considerações

- A API gratuita tem limites de requisições por minuto
- Imagens são geradas em boa qualidade mas podem variar
- Requer conexão com internet
- O modelo usado é `gemini-2.0-flash-exp-image-generation`
