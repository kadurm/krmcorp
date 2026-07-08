import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";

// Get arguments from command line
// Usage: node scripts/generate-proposal-pdf.js "Nome do Cliente" "Nome da Marca" "pro|essencial"
const args = process.argv.slice(2);
const clientName = args[0] || "Cliente de Rifas";
const brandName = args[1] || "Plataforma de Resultados";
const planType = (args[2] || "pro").toLowerCase() === "essencial" ? "essencial" : "pro";

console.log(`Gerando PDF de proposta para:`);
console.log(`- Cliente: ${clientName}`);
console.log(`- Marca: ${brandName}`);
console.log(`- Plano: ${planType.toUpperCase()}`);

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

drawEscopoItem("1ª Aba: Resultados", "Exibição limpa de vídeos de sorteios passados (links diretos).", 158);
drawEscopoItem("2ª Aba: Premiados", "Tabela dinâmica listando ganhador, prêmio e número do bilhete.", 178);
drawEscopoItem("Painel Admin", "Área restrita e segura para cadastrar sorteios pelo celular.", 198);

if (planType === "pro") {
  drawEscopoItem("Busca Premiada", "Campo para o usuário buscar seu bilhete e ver se foi sorteado.", 218);
} else {
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text("* Solução simples, extremamente rápida e focada em resultados objetivos.", 20, 222);
}


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

const devPrice = planType === "pro" ? "R$ 1.900,00" : "R$ 1.300,00";
const monthlyPrice = planType === "pro" ? "R$ 119,00" : "R$ 89,00";
const detailsText = planType === "pro" 
  ? "Plano Pro (Inclui Busca Inteligente e Banners)"
  : "Plano Start (Design Padrão com as 2 abas e Painel Administrativo básico)";

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
  `• Prazo de Entrega: ${planType === "pro" ? "Até 10 (dez) dias úteis" : "Até 7 (sete) dias úteis"} após envio do logotipo e informações básicas.`
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
doc.text("4. DE ACORDO E ASSINATURA", 20, 180);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
const today = new Date();
const dateStr = `Montes Claros/MG, ${today.getDate().toString().padStart(2, '0')} de ${['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][today.getMonth()]} de ${today.getFullYear()}.`;
doc.text(dateStr, 20, 190);

doc.setLineWidth(0.5);
doc.setDrawColor(colorGold[0], colorGold[1], colorGold[2]);

// Contratante Line
doc.line(20, 225, 90, 225);
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text("O CONTRATANTE", 55, 231, { align: "center" });
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
doc.text(clientName, 55, 237, { align: "center" });

// Contratado Line
doc.line(110, 225, 190, 225);
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(colorWhite[0], colorWhite[1], colorWhite[2]);
doc.text("CONTRATADO", 150, 231, { align: "center" });
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
doc.text("KrM Corp (Carlos E. R. Menezes)", 150, 237, { align: "center" });

// Output
const filename = `Proposta_KrM_Rifas_${clientName.replace(/\s+/g, '_')}.pdf`;
const outputDir = path.resolve(process.cwd());
const outputPath = path.join(outputDir, filename);

// Save to disk
const pdfData = doc.output("arraybuffer");
fs.writeFileSync(outputPath, Buffer.from(pdfData));

console.log(`\n✓ PDF gerado com sucesso em:`);
console.log(`👉 ${outputPath}\n`);
