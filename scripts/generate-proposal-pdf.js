import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";

// Get arguments from command line
// Usage: node scripts/generate-proposal-pdf.js "Nome do Cliente" "Nome da Marca"
const args = process.argv.slice(2);
const clientName = args[0] || "Cliente de Rifas";
const brandName = args[1] || "Plataforma de Resultados";

console.log(`Gerando PDF de proposta para:`);
console.log(`- Cliente: ${clientName}`);
console.log(`- Marca: ${brandName}`);
console.log(`- Preço Único: R$ 1.900,00 + R$ 119,00/mês`);

const doc = new jsPDF();

const colorGold = [212, 175, 55];     // HSL(40, 65%, 50%) -> RGB
const colorWhite = [240, 240, 240];
const colorMuted = [160, 160, 160];
const colorBg = [15, 15, 17];          // Deep dark blue-black
const colorCard = [24, 26, 32];        // Card background
const colorBorder = [40, 44, 52];      // Card border
const colorRed = [239, 68, 68];
const colorGreen = [16, 185, 129];

const addDarkPage = () => {
  doc.setFillColor(colorBg[0], colorBg[1], colorBg[2]);
  doc.rect(0, 0, 210, 297, "F");
  
  // Subtle border
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.setLineWidth(0.5);
  doc.rect(5, 5, 200, 287, "D");
};

// ==========================================
// PÁGINA 1: CAPA
// ==========================================
addDarkPage();

// KrM Corp Header
doc.setFont("helvetica", "bold");
doc.setFontSize(28);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("KrM Corp", 105, 70, { align: "center" });

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
doc.text("TECNOLOGIA E ESTRATÉGIA DIGITAL", 105, 78, { align: "center" });

// Gold Line
doc.setLineWidth(1);
doc.setDrawColor(colorGold[0], colorGold[1], colorGold[2]);
doc.line(75, 85, 135, 85);

// Title
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text("PROPOSTA DE DESENVOLVIMENTO WEB", 105, 125, { align: "center" });

doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text(brandName.toUpperCase(), 105, 140, { align: "center" });

// Target Client Box
doc.setFillColor(colorCard[0], colorCard[1], colorCard[2]);
doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
doc.roundedRect(35, 190, 140, 45, 3, 3, "FD");

doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("APRESENTADO A:", 105, 202, { align: "center" });

doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text(clientName, 105, 212, { align: "center" });

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
doc.text("KrM Corp • Todos os direitos reservados • 2026", 105, 225, { align: "center" });


// ==========================================
// PÁGINA 2: O DIAGNÓSTICO E A ESTRATÉGIA
// ==========================================
doc.addPage();
addDarkPage();

// Header
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("1. O DESAFIO: INSTABILIDADE DO INSTAGRAM", 20, 25);

doc.setFont("helvetica", "normal");
doc.setFontSize(9.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text([
  "Perfis criados no Instagram para divulgar resultados de rifas e sorteios sofrem bloqueios e banimentos",
  "constantes. Isso ocorre devido às rígidas diretrizes automatizadas da Meta sobre jogos de azar e sorteios.",
  "Para o organizador, isso representa uma grande dor de cabeça: perda de histórico, quebra de confiança",
  "dos compradores e necessidade constante de criar novas contas do zero.",
  "",
  "A solução definitiva é migrar esses resultados para um ambiente próprio e controlado."
], 20, 35);

// Instagram Box (Red)
doc.setFillColor(35, 15, 15);
doc.setDrawColor(120, 30, 30);
doc.roundedRect(20, 75, 80, 52, 2, 2, "FD");

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(colorRed[0], colorRed[1], colorRed[2]);
doc.text("Cenário com Instagram", 25, 84);

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text([
  "- Perfis derrubados sem aviso prévio",
  "- Perda de todo histórico de sorteios",
  "- Clientes confusos sem saber onde ver",
  "- Aparência amadora e insegurança",
  "- Dependência de regras de terceiros"
], 25, 93);

// KrM Platform Box (Green)
doc.setFillColor(15, 30, 20);
doc.setDrawColor(30, 120, 60);
doc.roundedRect(110, 75, 80, 52, 2, 2, "FD");

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(colorGreen[0], colorGreen[1], colorGreen[2]);
doc.text("Solução Plataforma KrM", 115, 84);

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text([
  "- Domínio próprio (imune a quedas)",
  "- Histórico permanente e organizado",
  "- 2 abas objetivas e diretas ao ponto",
  "- Link oficial fixo para passar credibilidade",
  "- Painel administrativo fácil no celular"
], 115, 93);

// Entregas Detalhadas
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("2. ESCOPO DA PLATAFORMA (2 ABAS)", 20, 148);

const drawEscopoItem = (title, description, y) => {
  doc.setFillColor(colorCard[0], colorCard[1], colorCard[2]);
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(20, y, 170, 16, 2, 2, "FD");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
  doc.text(title, 25, y + 10);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
  doc.text(description, 70, y + 10);
};

drawEscopoItem("Site Customizado", `Design com sua marca e domínio próprio: ${brandName}`, 158);
drawEscopoItem("Aba 1: Resultados", "Vídeos de Resultados dos Sorteios passados (links de exibição).", 178);
drawEscopoItem("Aba 2: Premiados", "Listagem e tabela de bilhetes sorteados, prêmios e ganhadores.", 198);
drawEscopoItem("Painel Admin", "Área para cadastro ágil de novos resultados (celular e desktop).", 218);
drawEscopoItem("Suporte & Manut.", "Suporte técnico contínuo e manutenção da infraestrutura inclusos.", 238);

doc.setFont("helvetica", "italic");
doc.setFontSize(8.5);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("* Observação: Toda a interface do site será 100% personalizada de acordo", 20, 262);
doc.text("  com a identidade visual (logotipo, cores e fontes) e preferências do cliente.", 20, 267);


// ==========================================
// PÁGINA 3: INVESTIMENTO E CONTRATAÇÃO
// ==========================================
doc.addPage();
addDarkPage();

doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("3. INVESTIMENTO E CONDIÇÕES", 20, 25);

// Box Plano Financeiro
doc.setFillColor(colorCard[0], colorCard[1], colorCard[2]);
doc.setDrawColor(colorGold[0], colorGold[1], colorGold[2]);
doc.roundedRect(20, 35, 170, 48, 2, 2, "FD");

const devPrice = "R$ 1.900,00";
const monthlyPrice = "R$ 119,00";
const detailsText = "Site Customizado com 2 Abas (Resultados e Ganhadores) + Painel Administrativo + Hospedagem & Suporte";

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text("CUSTO DE DESENVOLVIMENTO (Taxa Única):", 25, 46);

doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text(devPrice, 120, 47);

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text("MANUTENÇÃO, HOSPEDAGEM E SUPORTE:", 25, 59);

doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text(`${monthlyPrice} / mês`, 120, 60);

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
doc.text(detailsText, 25, 73);

// Forma de Pagamento e Prazo
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("CONDIÇÕES DE PAGAMENTO E PRAZO:", 20, 96);

doc.setFont("helvetica", "normal");
doc.setFontSize(9.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text([
  "• Pagamento: 50% de entrada para início e 50% na entrega e homologação do site.",
  "• Prazo de Entrega: De 7 a 10 dias úteis após envio do logotipo e informações básicas."
], 20, 105);

// Cláusulas de Manutenção
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("MANUTENÇÃO MENSAL INCLUI:", 20, 128);

doc.setFont("helvetica", "normal");
doc.setFontSize(9.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text([
  "• Hospedagem dedicada na nuvem de alta velocidade e estabilidade.",
  "• Registro e renovação anual do domínio próprio (.com.br) incluído.",
  "• Backups semanais automáticos de segurança de todos os resultados.",
  "• Suporte técnico prioritário da KrM Corp para dúvidas ou ajustes."
], 20, 137);

// Rodapé de Assinaturas
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("4. VALIDAÇÃO E ACEITE DIGITAL", 20, 180);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
const today = new Date();
const dateStr = `Montes Claros/MG, ${today.getDate().toString().padStart(2, '0')} de ${['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][today.getMonth()]} de ${today.getFullYear()}.`;
doc.text(dateStr, 20, 190);

// Aceite Digital Box
doc.setFillColor(colorCard[0], colorCard[1], colorCard[2]);
doc.setDrawColor(colorGold[0], colorGold[1], colorGold[2]);
doc.roundedRect(20, 205, 170, 24, 2, 2, "FD");

doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
doc.text("VALIDAÇÃO CONTRATUAL ELETRÔNICA", 25, 213);

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text(`Este documento comercial é formalizado e validado através do aceite digital do contratante,`, 25, 220);
doc.text(`encaminhado e registrado via WhatsApp para o contato oficial da KrM Corp (+55 38 98845-0377).`, 25, 224);

// Output
const filename = `Proposta_KrM_Rifas_${clientName.replace(/\s+/g, '_')}.pdf`;
const outputDir = path.resolve(process.cwd());
const outputPath = path.join(outputDir, filename);

// Save to disk
const pdfData = doc.output("arraybuffer");
fs.writeFileSync(outputPath, Buffer.from(pdfData));

console.log(`\n✓ PDF gerado com sucesso em:`);
console.log(`👉 ${outputPath}\n`);
