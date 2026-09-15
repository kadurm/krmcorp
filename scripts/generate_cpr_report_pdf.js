import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const rootDir = process.cwd();

// Carregar imagens das evidências para base64
const docsDir = path.join(rootDir, "Documentos", "Elevação do CPR");
const getImageBase64 = (filename) => {
  const filePath = path.join(docsDir, filename);
  if (fs.existsSync(filePath)) {
    return `data:image/jpeg;base64,${fs.readFileSync(filePath).toString("base64")}`;
  }
  return "";
};

const imgFlavio = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.25.jpeg");
const imgLula = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.24 (2).jpeg");
const imgCury = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.24 (1).jpeg");
const imgRenan = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.25 (1).jpeg");

// Ícone vetorial estilizado da Solution (Escudo Boutique com detalhe em ouro lapidado)
const solutionShieldSvg = `
<svg width="46" height="46" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24 4L7 11V23C7 33.5 14.3 43.1 24 46C33.7 43.1 41 33.5 41 23V11L24 4Z" fill="url(#solutionGrad)" stroke="#d4af37" stroke-width="2" stroke-linejoin="round"/>
  <path d="M24 10L12 15.5V23C12 30.5 17.1 37.5 24 39.8C30.9 37.5 36 30.5 36 23V15.5L24 10Z" fill="#121319" stroke="#f59e0b" stroke-width="1.2"/>
  <path d="M20 24L23 27L29 20" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="solutionGrad" x1="7" y1="4" x2="41" y2="46" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1f2330"/>
      <stop offset="0.5" stop-color="#141722"/>
      <stop offset="1" stop-color="#0b0d13"/>
    </linearGradient>
  </defs>
</svg>
`;

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Solution - Relatório Interno: Redução de Leads e Elevação de Custos no Período Eleitoral</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background-color: #090a0f;
      color: #e2e8f0;
      line-height: 1.48;
      font-size: 12px;
    }

    .page {
      width: 210mm;
      height: 297mm;
      position: relative;
      background: radial-gradient(circle at 85% 15%, #151824 0%, #0c0e15 55%, #07080c 100%);
      padding: 16mm 18mm;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Moldura elegante Solution Boutique */
    .page-border-frame {
      position: absolute;
      top: 8mm;
      left: 8mm;
      right: 8mm;
      bottom: 8mm;
      border: 1px solid rgba(212, 175, 55, 0.22);
      pointer-events: none;
      z-index: 1;
    }
    .page-border-corner {
      position: absolute;
      width: 14px;
      height: 14px;
      border-color: #d4af37;
      border-style: solid;
      pointer-events: none;
      z-index: 2;
    }
    .corner-tl { top: 7mm; left: 7mm; border-width: 2.5px 0 0 2.5px; }
    .corner-tr { top: 7mm; right: 7mm; border-width: 2.5px 2.5px 0 0; }
    .corner-bl { bottom: 7mm; left: 7mm; border-width: 0 0 2.5px 2.5px; }
    .corner-br { bottom: 7mm; right: 7mm; border-width: 0 2.5px 2.5px 0; }

    .gold-gradient-text {
      background: linear-gradient(135deg, #fff7d6 0%, #d4af37 50%, #9c7820 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Headers e Rodapés Solution */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
      padding-bottom: 8px;
      margin-bottom: 12px;
      z-index: 2;
    }
    .header-logo-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-header-text {
      font-family: 'Cinzel', serif;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 3px;
      color: #ffffff;
    }
    .brand-header-text span {
      color: #d4af37;
    }
    .brand-header-tag {
      font-size: 8px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #94a3b8;
      border-left: 1px solid rgba(212, 175, 55, 0.4);
      padding-left: 8px;
      margin-left: 4px;
    }
    .header-meta {
      text-align: right;
      font-size: 8.5px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .header-meta span {
      color: #d4af37;
      font-weight: 700;
    }

    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 8px;
      font-size: 8.5px;
      color: #64748b;
      z-index: 2;
    }
    .page-footer .brand-signature {
      color: #94a3b8;
      font-weight: 600;
    }

    .page-content {
      flex: 1;
      z-index: 2;
      display: flex;
      flex-direction: column;
    }

    /* Tipografia */
    h1, h2, h3 {
      font-family: 'Playfair Display', Georgia, serif;
    }
    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #e5c07b;
      margin-bottom: 6px;
      align-self: flex-start;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 4px;
      line-height: 1.25;
    }
    .section-subtitle {
      font-size: 10.5px;
      color: #94a3b8;
      margin-bottom: 12px;
      line-height: 1.45;
    }

    /* Cards */
    .card {
      background: rgba(18, 21, 31, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .card-highlight {
      background: linear-gradient(135deg, rgba(26, 30, 44, 0.85) 0%, rgba(16, 19, 28, 0.95) 100%);
      border: 1px solid rgba(212, 175, 55, 0.35);
      position: relative;
    }
    .card-highlight::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 3.5px;
      height: 100%;
      background: #d4af37;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    /* Grids */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    /* Capa */
    .cover-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 8mm 4mm 4mm;
      z-index: 2;
    }
    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cover-brand-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .cover-brand-titles {
      display: flex;
      flex-direction: column;
    }
    .cover-brand-name {
      font-family: 'Cinzel', serif;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 4px;
      color: #ffffff;
      line-height: 1.1;
    }
    .cover-brand-name span {
      color: #d4af37;
    }
    .cover-brand-sub {
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #94a3b8;
      margin-top: 3px;
    }
    .cover-badge {
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.35);
      padding: 8px 16px;
      border-radius: 4px;
      text-align: right;
    }
    .cover-badge .badge-title {
      font-size: 9.5px;
      font-weight: 700;
      color: #d4af37;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .cover-badge .badge-sub {
      font-size: 8px;
      color: #94a3b8;
    }

    .cover-center {
      margin-top: auto;
      margin-bottom: auto;
      padding: 16px 0;
    }
    .cover-tagline {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 4px;
      color: #d4af37;
      text-transform: uppercase;
      margin-bottom: 14px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.4);
      padding-bottom: 4px;
    }
    .cover-main-title {
      font-size: 34px;
      line-height: 1.18;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .cover-description {
      font-size: 13px;
      line-height: 1.6;
      color: #cbd5e1;
      max-width: 530px;
      margin-bottom: 22px;
    }

    .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(22, 27, 40, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.3);
      padding: 10px 18px;
      border-radius: 8px;
    }
    .stat-pill .num {
      font-size: 24px;
      font-weight: 800;
      color: #ef4444;
      font-family: 'Inter', sans-serif;
    }
    .stat-pill .label {
      font-size: 9.5px;
      line-height: 1.35;
      color: #e2e8f0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cover-bottom {
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .meta-col .label {
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748b;
      margin-bottom: 2px;
    }
    .meta-col .value {
      font-size: 10px;
      font-weight: 600;
      color: #cbd5e1;
    }

    /* Metric Boxes */
    .metric-box {
      background: rgba(15, 18, 27, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 6px;
      padding: 9px;
      text-align: center;
    }
    .metric-box.danger {
      border-color: rgba(239, 68, 68, 0.35);
      background: rgba(239, 68, 68, 0.06);
    }
    .metric-val {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    .metric-val.red { color: #f87171; }
    .metric-label {
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
    }

    /* Tabela */
    .exec-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 9.5px;
    }
    .exec-table th {
      background: rgba(24, 29, 43, 0.9);
      color: #d4af37;
      text-transform: uppercase;
      font-size: 8px;
      letter-spacing: 1px;
      padding: 7px 9px;
      text-align: left;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    .exec-table td {
      padding: 6px 9px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
    }
    .exec-table tr:nth-child(even) td {
      background: rgba(255, 255, 255, 0.015);
    }

    .bullet-point {
      display: flex;
      gap: 8px;
      margin-bottom: 7px;
      font-size: 10.5px;
      line-height: 1.42;
      color: #cbd5e1;
    }
    .step-badge {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #d4af37;
      color: #090a0f;
      font-weight: bold;
      font-size: 9.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .player-card {
      background: rgba(20, 24, 36, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }
    .player-avatar-wrap {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #d4af37;
      margin-bottom: 5px;
      background: #111;
    }
    .player-avatar-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .player-name {
      font-size: 9.5px;
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 2px;
    }
    .player-base {
      font-size: 7.5px;
      color: #94a3b8;
      margin-bottom: 5px;
    }
    .player-investment {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
      font-weight: 700;
      font-size: 9px;
      padding: 2px 4px;
      border-radius: 4px;
      width: 100%;
    }

    .didactic-box {
      background: rgba(212, 175, 55, 0.08);
      border: 1px dashed rgba(212, 175, 55, 0.4);
      border-radius: 6px;
      padding: 10px 12px;
      margin: 8px 0;
    }
    .didactic-title {
      font-size: 11px;
      font-weight: 700;
      color: #e5c07b;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .didactic-text {
      font-size: 10px;
      color: #cbd5e1;
      line-height: 1.45;
    }
  </style>
</head>
<body>

  <!-- ============================================================== -->
  <!-- PÁGINA 1: CAPA EXECUTIVA (SOLUTION) -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="cover-body">
      <div class="cover-top">
        <div class="cover-brand-wrap">
          ${solutionShieldSvg}
          <div class="cover-brand-titles">
            <div class="cover-brand-name">SOLUTION <span>PLACE</span></div>
            <div class="cover-brand-sub">Blindagem Boutique • Excelência & Segurança</div>
          </div>
        </div>
        <div class="cover-badge">
          <div class="badge-title">Comunicado Interno Solution</div>
          <div class="badge-sub">Inteligência de Tráfego & Performance</div>
        </div>
      </div>

      <div class="cover-center">
        <div class="cover-tagline">Alinhamento Interno Especial • Q3/Q4 2026</div>
        <h1 class="cover-main-title">
          POR QUE OS <span class="gold-gradient-text">LEADS REDUZIRAM</span><br>
          NAS ÚLTIMAS SEMANAS?
        </h1>
        <p class="cover-description">
          Um esclarecimento direto e transparente da nossa equipe interna de tráfego explicando como o <strong>Período Eleitoral</strong> inflaciona o leilão de anúncios no Brasil, por que isso é um fenômeno <strong>100% externo e temporário</strong>, e as medidas técnicas que a Solution já aplicou para proteger o investimento e o caixa da nossa operação.
        </p>

        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <div class="stat-pill">
            <span class="num">+62,3%</span>
            <span class="label">Subida no Custo por Resultado<br>Registrada nas Redes no Período</span>
          </div>
          <div class="stat-pill" style="border-color: rgba(52, 211, 153, 0.4);">
            <span class="num" style="color: #34d399;">100%</span>
            <span class="label">Cenário Cíclico & Passageiro<br>Normalização Pós-Eleição</span>
          </div>
        </div>
      </div>

      <div class="cover-bottom">
        <div class="meta-col">
          <div class="label">Emissor Interno</div>
          <div class="value">Equipe de Tráfego & Inteligência • Solution</div>
        </div>
        <div class="meta-col">
          <div class="label">Destinatários</div>
          <div class="value">Diretoria, Gerência Comercial & Consultores Solution</div>
        </div>
        <div class="meta-col" style="text-align: right;">
          <div class="label">Vigência</div>
          <div class="value" style="color: #d4af37;">Período Eleitoral 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 2: O CENÁRIO REAL & A DISPUTA PELA ATENÇÃO -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        ${solutionShieldSvg}
        <span class="brand-header-text">SOLUTION <span>PLACE</span></span>
        <span class="brand-header-tag">Blindagem Boutique</span>
      </div>
      <div class="header-meta">Alinhamento Interno • <span>01: O Cenário Geral</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Diagnóstico Interno da Operação</div>
      <h2 class="section-title">"Se nosso produto é impecável, por que chegam menos mensagens?"</h2>
      <p class="section-subtitle">
        Como membro interno da equipe, quero começar tranquilizando todos: <strong>não há falha no posicionamento da Solution, nem erro técnico nas nossas contas de anúncio.</strong>
      </p>

      <div class="didactic-box">
        <div class="didactic-title">💡 A Analogia dos Outdoors na Avenida:</div>
        <div class="didactic-text">
          Imagine que o Instagram e o Facebook são como uma avenida nobre por onde passam motoristas e potenciais compradores de veículos premium. A quantidade de pessoas passando ali por dia é fixa. De repente, chegam <strong>campanhas políticas com milhões de reais em verba pública</strong> e dizem ao dono dos outdoors: <em>"Eu cubro qualquer valor que qualquer empresa pagar para estampar meu candidato aqui agora."</em><br>
          O que acontece com o preço do espaço para todas as empresas privadas? <strong>O valor dispara imediatamente.</strong>
        </div>
      </div>

      <div class="card card-highlight">
        <div style="font-size: 11px; font-weight: 700; color: #d4af37; margin-bottom: 3px;">
          Por que a concorrência política distorce o leilão contra nós?
        </div>
        <div style="font-size: 10px; color: #cbd5e1; line-height: 1.45;">
          Nós, na Solution, anunciamos com responsabilidade comercial buscando retorno e sustentabilidade. Já os comitês políticos <strong>não buscam lucro</strong>: o único objetivo deles é queimar o Fundo Eleitoral antes do dia da eleição para conquistar votos. Eles aceitam pagar qualquer lance no leilão da Meta, expulsando ou encarecendo os anúncios de quem busca vendas reais.
        </div>
      </div>

      <h3 style="font-size: 11.5px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin: 8px 0 6px;">
        Evidências Auditadas do Volume Despejado no Leilão:
      </h3>

      <!-- 4 Cards com fotos e valores -->
      <div class="grid-4" style="margin-bottom: 8px;">
        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgFlavio}" alt="Flávio Bolsonaro">
          </div>
          <div class="player-name">PL / Flávio B.</div>
          <div class="player-base">11,4M seguidores</div>
          <div class="player-investment">~ R$ 142,7 mil / dia</div>
        </div>

        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgLula}" alt="Lula">
          </div>
          <div class="player-name">Campanha Lula</div>
          <div class="player-base">14,9M seguidores</div>
          <div class="player-investment">~ R$ 61,5 mil / dia</div>
        </div>

        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgCury}" alt="Augusto Cury">
          </div>
          <div class="player-name">Augusto Cury</div>
          <div class="player-base">10,7M seguidores</div>
          <div class="player-investment" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24;">~ R$ 6,4 mil / dia</div>
        </div>

        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgRenan}" alt="Renan Santos">
          </div>
          <div class="player-name">Renan Santos</div>
          <div class="player-base">2,5M seguidores</div>
          <div class="player-investment" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24;">~ R$ 3,7 mil / dia</div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 0;">
        <div style="font-size: 10px; color: #94a3b8; line-height: 1.4;">
          <strong style="color: #f1f5f9;">O impacto direto no nosso público:</strong> Somente esses 4 exemplos somam mais de <strong style="color: #ef4444;">R$ 214 mil por DIA</strong> disputando as telas de celulares. Como os candidatos segmentam pessoas de maior renda e influência, o leilão sobre a nossa audiência qualificada sofre um impacto desproporcional.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">Solution Place • Blindagem Boutique & Segurança</div>
      <div>Página 02 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 3: A MATEMÁTICA SIMPLES DA QUEDA DE LEADS -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        ${solutionShieldSvg}
        <span class="brand-header-text">SOLUTION <span>PLACE</span></span>
        <span class="brand-header-tag">Blindagem Boutique</span>
      </div>
      <div class="header-meta">Alinhamento Interno • <span>02: A Matemática dos Dados</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Entendendo a Dinâmica</div>
      <h2 class="section-title">Como o Leilão Político Vira Menos Mensagens no WhatsApp da Solution?</h2>
      <p class="section-subtitle">
        Veja a mecânica exata de como a inflação do leilão impacta o volume final de contatos recebidos pelos nossos consultores.
      </p>

      <div class="grid-3" style="margin-bottom: 10px;">
        <div class="metric-box danger">
          <div class="metric-val red">Passo 1</div>
          <div class="metric-label">O Espaço Encarece</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 3px;">Custa mais caro para o anúncio da Solution simplesmente aparecer na tela.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">Passo 2</div>
          <div class="metric-label">Menos Pessoas Alcançadas</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 3px;">Com o mesmo orçamento, nosso anúncio é visto por um número menor de proprietários.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">Passo 3</div>
          <div class="metric-label">Menor Volume de Leads</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 3px;">Menos visualizações na semana resultam diretamente em menos cotações iniciadas.</div>
        </div>
      </div>

      <div class="card card-highlight">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 10.5px; font-weight: 700; color: #d4af37; text-transform: uppercase;">
            Simulação Interna: Comparativo Didático de Desempenho
          </span>
          <span style="font-size: 8px; background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 2px 6px; border-radius: 3px; font-weight: 600;">
            Impacto do Período Eleitoral
          </span>
        </div>

        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th>Cenário Operacional</th>
              <th>Investimento Diário</th>
              <th>Alcance de Pessoas</th>
              <th>Custo por Lead (CPL)</th>
              <th>Contatos Gerados / Dia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Período Regular (Sem Eleições)</strong></td>
              <td>R$ 150,00 / dia</td>
              <td>~ 8.500 pessoas</td>
              <td>R$ 25,00</td>
              <td><strong style="color: #34d399;">6 a 7 cotações / dia</strong></td>
            </tr>
            <tr>
              <td><strong>Período Eleitoral (Leilão Inflacionado)</strong></td>
              <td>R$ 150,00 / dia</td>
              <td>~ 5.100 pessoas (-40%)</td>
              <td>R$ 41,00 (+64%)</td>
              <td><strong style="color: #f87171;">3 a 4 cotações / dia</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="didactic-box" style="margin-top: 8px;">
        <div class="didactic-title">📱 Atenção Dividida do Cliente Premium</div>
        <div class="didactic-text">
          O cliente de blindagem boutique também é bombardeado por notícias políticas e debates. Ele desliza o feed mais rapidamente e responde com menor frequência a estímulos comerciais. Isso derruba a taxa de cliques momentaneamente em todo o mercado.
        </div>
      </div>

      <h3 style="font-size: 11.5px; color: #f8fafc; margin: 8px 0 4px;">O que a Nossa Equipe NÃO Irá Fazer:</h3>

      <div class="bullet-point">
        <div class="step-badge">✕</div>
        <div>
          <strong style="color: #f87171;">Jamais pausar as campanhas da Solution:</strong> Interromper os anúncios destrói o histórico de inteligência do pixel. Quando a eleição terminar, teríamos que recomeçar do zero pagando taxas de aprendizado altíssimas.
        </div>
      </div>

      <div class="bullet-point">
        <div class="step-badge">✕</div>
        <div>
          <strong style="color: #f87171;">Não queimar verba extra no desespero:</strong> Aumentar orçamento de forma desordenada apenas jogaria dinheiro na mão da Meta a custos inflacionados.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">Solution Place • Blindagem Boutique & Segurança</div>
      <div>Página 03 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 4: O QUE NÓS DA SOLUTION ESTAMOS EXECUTANDO -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        ${solutionShieldSvg}
        <span class="brand-header-text">SOLUTION <span>PLACE</span></span>
        <span class="brand-header-tag">Blindagem Boutique</span>
      </div>
      <div class="header-meta">Alinhamento Interno • <span>03: Nossa Atuação Técnica</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Manobras de Blindagem Operacional</div>
      <h2 class="section-title">O que nós da equipe de tráfego já implementamos?</h2>
      <p class="section-subtitle">
        Estamos agindo proativamente com 4 medidas técnicas para manter a eficiência da Solution mesmo com o leilão pressionado.
      </p>

      <div class="grid-2" style="gap: 10px; margin-bottom: 10px;">
        
        <!-- Ação 1 -->
        <div class="card" style="border-left: 3px solid #d4af37;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">01</div>
            <strong style="font-size: 11px; color: #d4af37;">Travas de Segurança de Lance (Bid Cap)</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Limitamos o valor máximo que a Meta pode cobrar por resultado. Se em determinado dia os candidatos inundarem a rede com lances astronômicos, o algoritmo freia a compra e não queima nosso orçamento a preços abusivos.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Blindagem direta do caixa da Solution contra leilões superfaturados.
          </div>
        </div>

        <!-- Ação 2 -->
        <div class="card" style="border-left: 3px solid #d4af37;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">02</div>
            <strong style="font-size: 11px; color: #d4af37;">Criativos Boutique Anti-Ruído</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Criativos que parecem panfleto ou anúncio genérico são ignorados porque o cérebro do usuário confunde com política. Estamos usando detalhes artesanais da blindagem, vidros balísticos de alta transparência e carros de luxo reais em oficina boutique.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Rompe a poluição visual e resgata o CTR com público qualificado.
          </div>
        </div>

        <!-- Ação 3 -->
        <div class="card" style="border-left: 3px solid #d4af37;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">03</div>
            <strong style="font-size: 11px; color: #d4af37;">Reforço no Google Search (Intenção Pura)</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Políticos não disputam termos de pesquisa no Google como <em>"blindagem de veículos RJ"</em> ou <em>"blindar Defender / Porsche"</em>. Mantemos presença máxima no Google onde o cliente pesquisa ativamente para comprar.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Captação de cotações com alta urgência e prontidão de fechamento.
          </div>
        </div>

        <!-- Ação 4 -->
        <div class="card" style="border-left: 3px solid #d4af37;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">04</div>
            <strong style="font-size: 11px; color: #d4af37;">Higienização e Exclusão Cirúrgica</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Excluímos das campanhas quem já comprou, quem já é cliente e quem não possui perfil econômico para blindagem boutique, direcionando cada centavo com precisão cirúrgica.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Redução de desperdício e foco total em leads qualificados.
          </div>
        </div>

      </div>

      <div class="card card-highlight" style="margin-bottom: 0;">
        <div style="font-size: 10.5px; font-weight: 700; color: #d4af37; text-transform: uppercase; margin-bottom: 4px;">
          Nossa Filosofia Interna Solution:
        </div>
        <div style="font-size: 10px; color: #f1f5f9; line-height: 1.45;">
          "Como equipe interna, nosso compromisso é com a verdade dos dados e a proteção do resultado da Solution. O mercado oscila por fatores externos, mas nossa disciplina técnica e padrão boutique permanecem inabaláveis. Estamos no controle da operação."
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">Solution Place • Blindagem Boutique & Segurança</div>
      <div>Página 04 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 5: PLANO DE AÇÃO EM CONJUNTO COM O COMERCIAL -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        ${solutionShieldSvg}
        <span class="brand-header-text">SOLUTION <span>PLACE</span></span>
        <span class="brand-header-tag">Blindagem Boutique</span>
      </div>
      <div class="header-meta">Alinhamento Interno • <span>04: Ações em Conjunto</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Orientações aos Consultores Solution</div>
      <h2 class="section-title">Como a equipe de atendimento nos ajuda a vencer este mês?</h2>
      <p class="section-subtitle">
        Enquanto blindamos as contas de anúncio, o papel dos nossos consultores de atendimento é crucial para transformar cada contato em venda.
      </p>

      <div class="card" style="margin-bottom: 10px;">
        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th style="width: 28%;">Protocolo Comercial</th>
              <th style="width: 48%;">Diretriz de Atendimento Boutique</th>
              <th style="width: 24%;">Impacto Direto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. SLA de Resposta (&lt; 5 a 10 min)</strong></td>
              <td>Como o lead custa 60% a mais hoje, responder imediatamente no WhatsApp é inegociável. Iniciar o protocolo boutique logo no primeiro minuto.</td>
              <td><span style="color: #34d399; font-weight: 700;">Máxima Conversão</span></td>
            </tr>
            <tr>
              <td><strong>2. Resgate de Cotações Anteriores</strong></td>
              <td>Recontatar proativamente orçamentos enviados nos últimos 60 dias que não fecharam. Esse é o canal mais rentável no momento.</td>
              <td><span style="color: #34d399; font-weight: 700;">Vendas Sem Custo</span></td>
            </tr>
            <tr>
              <td><strong>3. Rigor na Etiquetagem</strong></td>
              <td>Classificar perfeitamente cada contato (Sem Etiqueta, Novo Cliente, Pago) para alimentar a inteligência do nosso CRM e do algoritmo.</td>
              <td><span style="color: #d4af37; font-weight: 700;">Inteligência de Dados</span></td>
            </tr>
            <tr>
              <td><strong>4. Convite para Visita Boutique</strong></td>
              <td>Oferecer agendamento de visita ao showroom da Solution para conhecer a oficina e os materiais. A experiência presencial fecha a venda.</td>
              <td><span style="color: #34d399; font-weight: 700;">Fechamento de Alto Padrão</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card card-highlight" style="margin-bottom: 10px; padding: 12px 14px;">
        <div style="font-size: 12px; font-weight: 700; color: #f8fafc; margin-bottom: 4px;">
          Resumo Final & Perspectiva Positiva
        </div>
        <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.45; margin-bottom: 8px;">
          As eleições têm data final marcada. As empresas concorrentes que entram em desespero, pausam anúncios ou queimam margem sofrem as consequências. A <strong>Solution</strong> continuará operando com serenidade, excelência técnica e foco no cliente de alto luxo. Assim que o leilão político se encerrar, nossas campanhas estarão otimizadas para colher um salto massivo de resultados.
        </p>
        <div style="display: flex; gap: 14px; font-size: 8.5px; color: #d4af37; font-weight: 600; flex-wrap: wrap;">
          <div>◆ Monitoramento Diário dos Indicadores</div>
          <div>◆ Proteção de Custo por Resultado</div>
          <div>◆ Atendimento Boutique de Excelência</div>
          <div>◆ Parceria Interna Alinhada</div>
        </div>
      </div>

      <div style="background: rgba(15, 18, 27, 0.9); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 10.5px; font-weight: 700; color: #f8fafc;">Equipe de Tráfego & Inteligência de Performance</div>
          <div style="font-size: 8.5px; color: #94a3b8;">Solution Place · Blindagem Automotiva Boutique</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10px; font-weight: 700; color: #d4af37;">Rio de Janeiro / Brasil</div>
          <div style="font-size: 8.5px; color: #64748b;">Canal Interno de Performance</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">Solution Place • Blindagem Boutique & Segurança</div>
      <div>Página 05 de 05</div>
    </div>
  </div>

</body>
</html>
`;

async function generatePDF() {
  console.log("Gerando PDF com a identidade visual da Solution e narrativa interna...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetDir = path.join(rootDir, "Documentos", "Elevação do CPR");
  const outputPathFolder = path.join(targetDir, "Relatorio_Estrategico_Elevacao_CPR_Solution.pdf");
  const outputPathRoot = path.join(rootDir, "Relatorio_Estrategico_Elevacao_CPR_Solution.pdf");

  await page.pdf({
    path: outputPathFolder,
    format: "A4",
    printBackground: true,
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    },
    preferCSSPageSize: true
  });

  fs.copyFileSync(outputPathFolder, outputPathRoot);

  console.log(`PDF da Solution gerado com sucesso em:\n- ${outputPathFolder}\n- ${outputPathRoot}`);
  await browser.close();
}

generatePDF().catch(err => {
  console.error("Erro ao gerar PDF:", err);
  process.exit(1);
});
