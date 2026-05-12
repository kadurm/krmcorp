import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/assets/hero-bg.jpg');
const outputFile = path.join(__dirname, '../src/assets/hero-bg.webp');

async function convertToWebp() {
  try {
    if (!fs.existsSync(inputFile)) {
      console.error(`Erro: Arquivo de entrada não encontrado em ${inputFile}`);
      process.exit(1);
    }

    console.log(`Convertendo ${inputFile} para WebP...`);
    
    await sharp(inputFile)
      .webp({ quality: 80 })
      .toFile(outputFile);

    console.log(`Sucesso! Imagem salva em: ${outputFile}`);
  } catch (error) {
    console.error('Erro durante a conversão:', error);
    process.exit(1);
  }
}

convertToWebp();
