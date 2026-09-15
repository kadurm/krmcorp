import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const rootDir = process.cwd();
const logoPath = path.join(rootDir, "public", "LogoKrMCorp.png");
const logoBase64 = fs.existsSync(logoPath)
  ? `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`
  : "";

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

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>KrM Corp - Relatório Explicativo: Redução de Leads e Elevação de Custos no Período Eleitoral</title>
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
      background-color: #080b11;
      color: #e6edf3;
      line-height: 1.48;
      font-size: 12px;
    }

    .page {
      width: 210mm;
      height: 297mm;
      position: relative;
      background: radial-gradient(circle at 85% 15%, #161e2f 0%, #090c13 55%, #05070a 100%);
      padding: 16mm 18mm;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Moldura clássica KrM */
    .page-border-frame {
      position: absolute;
      top: 8mm;
      left: 8mm;
      right: 8mm;
      bottom: 8mm;
      border: 1px solid rgba(212, 163, 75, 0.22);
      pointer-events: none;
      z-index: 1;
    }
    .page-border-corner {
      position: absolute;
      width: 14px;
      height: 14px;
      border-color: #d4a34b;
      border-style: solid;
      pointer-events: none;
      z-index: 2;
    }
    .corner-tl { top: 7mm; left: 7mm; border-width: 2.5px 0 0 2.5px; }
    .corner-tr { top: 7mm; right: 7mm; border-width: 2.5px 2.5px 0 0; }
    .corner-bl { bottom: 7mm; left: 7mm; border-width: 0 0 2.5px 2.5px; }
    .corner-br { bottom: 7mm; right: 7mm; border-width: 0 2.5px 2.5px 0; }

    .gold-gradient-text {
      background: linear-gradient(135deg, #fff3cf 0%, #d4a34b 50%, #9c7322 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Headers e Rodapés */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(212, 163, 75, 0.28);
      padding-bottom: 8px;
      margin-bottom: 12px;
      z-index: 2;
    }
    .header-logo-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header-logo-wrap img {
      height: 28px;
      object-fit: contain;
    }
    .brand-header-text {
      font-family: 'Cinzel', serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .brand-header-text span {
      color: #d4a34b;
    }
    .header-meta {
      text-align: right;
      font-size: 8.5px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .header-meta span {
      color: #d4a34b;
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
      background: rgba(212, 163, 75, 0.12);
      border: 1px solid rgba(212, 163, 75, 0.4);
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
      background: rgba(18, 24, 38, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .card-highlight {
      background: linear-gradient(135deg, rgba(26, 35, 54, 0.8) 0%, rgba(16, 21, 33, 0.9) 100%);
      border: 1px solid rgba(212, 163, 75, 0.3);
      position: relative;
    }
    .card-highlight::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 3.5px;
      height: 100%;
      background: #d4a34b;
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
      gap: 14px;
    }
    .cover-logo-img {
      height: 60px;
      object-fit: contain;
      filter: drop-shadow(0 0 12px rgba(212, 163, 75, 0.35));
    }
    .cover-brand-titles {
      display: flex;
      flex-direction: column;
    }
    .cover-brand-name {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 3px;
      color: #ffffff;
      line-height: 1.1;
    }
    .cover-brand-name span {
      color: #d4a34b;
    }
    .cover-brand-sub {
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #94a3b8;
      margin-top: 3px;
    }
    .cover-badge {
      background: rgba(212, 163, 75, 0.1);
      border: 1px solid rgba(212, 163, 75, 0.35);
      padding: 8px 16px;
      border-radius: 4px;
      text-align: right;
    }
    .cover-badge .badge-title {
      font-size: 9.5px;
      font-weight: 700;
      color: #d4a34b;
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
      color: #d4a34b;
      text-transform: uppercase;
      margin-bottom: 14px;
      border-bottom: 1px solid rgba(212, 163, 75, 0.4);
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
      background: rgba(22, 29, 44, 0.85);
      border: 1px solid rgba(212, 163, 75, 0.3);
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
      border-top: 1px solid rgba(212, 163, 75, 0.25);
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
      background: rgba(15, 21, 33, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 6px;
      padding: 9px;
      text-align: center;
    }
    .metric-box.danger {
      border-color: rgba(239, 68, 68, 0.35);
      background: rgba(239, 68, 68, 0.06);
    }
    .metric-box.gold {
      border-color: rgba(212, 163, 75, 0.35);
      background: rgba(212, 163, 75, 0.06);
    }
    .metric-val {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    .metric-val.red { color: #f87171; }
    .metric-val.gold { color: #d4a34b; }
    .metric-val.green { color: #34d399; }
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
      background: rgba(26, 35, 54, 0.9);
      color: #d4a34b;
      text-transform: uppercase;
      font-size: 8px;
      letter-spacing: 1px;
      padding: 7px 9px;
      text-align: left;
      border-bottom: 1px solid rgba(212, 163, 75, 0.3);
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
      background: #d4a34b;
      color: #0b0f19;
      font-weight: bold;
      font-size: 9.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .player-card {
      background: rgba(20, 27, 43, 0.85);
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
      border: 2px solid #d4a34b;
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
      background: rgba(212, 163, 75, 0.08);
      border: 1px dashed rgba(212, 163, 75, 0.4);
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
  <!-- PÁGINA 1: CAPA EXECUTIVA -->
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
          <img class="cover-logo-img" src="${logoBase64}" alt="KrM Corp">
          <div class="cover-brand-titles">
            <div class="cover-brand-name">KrM <span>CORP</span></div>
            <div class="cover-brand-sub">Tecnologia, Dados & Ecossistemas Digitais</div>
          </div>
        </div>
        <div class="cover-badge">
          <div class="badge-title">Guia Explicativo ao Cliente</div>
          <div class="badge-sub">Transparência & Gestão de Performance</div>
        </div>
      </div>

      <div class="cover-center">
        <div class="cover-tagline">Relatório Especial ao Parceiro • Q3/Q4 2026</div>
        <h1 class="cover-main-title">
          POR QUE OS <span class="gold-gradient-text">LEADS REDUZIRAM</span><br>
          NAS ÚLTIMAS SEMANAS?
        </h1>
        <p class="cover-description">
          Um documento claro, transparente e didático explicando como o <strong>Período Eleitoral</strong> inflaciona o custo dos anúncios digitais no Brasil, por que isso é um fenômeno <strong>temporário de mercado</strong> e quais medidas a KrM Corp já colocou em prática para proteger seu investimento.
        </p>

        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <div class="stat-pill">
            <span class="num">+62,3%</span>
            <span class="label">Subida no Custo por Resultado<br>Registrada nas Redes no Período</span>
          </div>
          <div class="stat-pill" style="border-color: rgba(52, 211, 153, 0.4);">
            <span class="num" style="color: #34d399;">100%</span>
            <span class="label">Fenômeno Externo & Passageiro<br>Normalização Pós-Eleição</span>
          </div>
        </div>
      </div>

      <div class="cover-bottom">
        <div class="meta-col">
          <div class="label">Emitido por</div>
          <div class="value">KrM Corp • Gestão de Tráfego & Ecossistemas</div>
        </div>
        <div class="meta-col">
          <div class="label">Objetivo do Relatório</div>
          <div class="value">Esclarecimento Didático sobre Leads e Custos no Período Eleitoral</div>
        </div>
        <div class="meta-col" style="text-align: right;">
          <div class="label">Vigência</div>
          <div class="value" style="color: #d4a34b;">Setembro a Outubro de 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 2: O QUE ESTÁ ACONTECENDO? (A ANALOGIA DO LEILÃO) -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        <img src="${logoBase64}" alt="KrM Corp">
        <span class="brand-header-text">KrM <span>CORP</span></span>
      </div>
      <div class="header-meta">Explicação ao Cliente • <span>01: O Cenário Geral</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">A Realidade do Mercado</div>
      <h2 class="section-title">"Se o investimento é o mesmo, por que chegam menos contatos?"</h2>
      <p class="section-subtitle">
        A primeira resposta que você precisa ter com total clareza: <strong>não houve falha no seu produto, nem erro de configuração nas suas campanhas.</strong>
      </p>

      <div class="didactic-box">
        <div class="didactic-title">💡 A Analogia Simples da "Sala de Leilão e do Espaço Físico":</div>
        <div class="didactic-text">
          Imagine que o Instagram e o Facebook são como uma avenida movimentada com um número limitado de outdoors. As pessoas continuam passando por ali o mesmo tempo de sempre. De repente, chegam <strong>dezenas de candidatos políticos com milhões de reais em verba pública</strong> e dizem ao dono dos outdoors: <em>"Não importa o preço, eu pago o dobro do que qualquer empresa pagar para colocar minha foto aqui agora."</em><br>
          O que acontece com o preço do outdoor para as empresas comuns? <strong>Ele sobe imediatamente para todos.</strong>
        </div>
      </div>

      <div class="card card-highlight">
        <div style="font-size: 11px; font-weight: 700; color: #d4a34b; margin-bottom: 3px;">
          Por que a concorrência política é desleal com o comércio e serviços?
        </div>
        <div style="font-size: 10px; color: #cbd5e1; line-height: 1.45;">
          Empresas privadas anunciam buscando ter <strong>lucro</strong>. Elas calculam cada centavo. Já as campanhas políticas <strong>não buscam lucro</strong>: o objetivo delas é unicamente queimar o Fundo Eleitoral antes do dia da votação para conseguir votos a qualquer custo. Elas aceitam pagar qualquer lance no leilão.
        </div>
      </div>

      <h3 style="font-size: 11.5px; color: #d4a34b; text-transform: uppercase; letter-spacing: 1px; margin: 8px 0 6px;">
        Exemplos Reais do Volume Diário Despejado nas Redes:
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
          <strong style="color: #f1f5f9;">O que esses dados mostram:</strong> Apenas estes quatro exemplos somam mais de <strong style="color: #ef4444;">R$ 214 mil por DIA</strong> sendo injetados nas telas das pessoas. Quando somamos milhares de vereadores, deputados e prefeitos no país todo, o leilão é inundado de dinheiro, empurrando o custo de visualização para cima em todas as cidades.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 02 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 3: A MATEMÁTICA SIMPLES QUE EXPLICA A QUEDA -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        <img src="${logoBase64}" alt="KrM Corp">
        <span class="brand-header-text">KrM <span>CORP</span></span>
      </div>
      <div class="header-meta">Explicação ao Cliente • <span>02: A Matemática Simples</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Entendendo a Mecânica</div>
      <h2 class="section-title">Como o Leilão Político Vira Menos Mensagens no WhatsApp?</h2>
      <p class="section-subtitle">
        Veja o passo a passo de como o encarecimento do espaço publicitário se reflete diretamente no dia a dia da sua empresa.
      </p>

      <div class="grid-3" style="margin-bottom: 10px;">
        <div class="metric-box danger">
          <div class="metric-val red">Passo 1</div>
          <div class="metric-label">O Espaço Encarece</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 3px;">Custa mais caro para o anúncio simplesmente aparecer na tela do celular.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">Passo 2</div>
          <div class="metric-label">Menos Pessoas Alcançadas</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 3px;">Com o mesmo valor diário, seu anúncio é visto por menos clientes potenciais.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">Passo 3</div>
          <div class="metric-label">Menor Volume de Leads</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 3px;">Menos pessoas vendo seu anúncio resulta em menos contatos gerados na semana.</div>
        </div>
      </div>

      <div class="card card-highlight">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 10.5px; font-weight: 700; color: #d4a34b; text-transform: uppercase;">
            Comparativo Didático: Um Exemplo Prático com R$ 100 por dia
          </span>
          <span style="font-size: 8px; background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 2px 6px; border-radius: 3px; font-weight: 600;">
            O Efeito da Disputa Eleitoral
          </span>
        </div>

        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th>Situação</th>
              <th>Investimento</th>
              <th>Quantas Pessoas Viram</th>
              <th>Custo por Contato</th>
              <th>Total de Contatos / Leads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Mês Normal (Sem Eleições)</strong></td>
              <td>R$ 100,00 / dia</td>
              <td>~ 6.000 pessoas</td>
              <td>R$ 10,00</td>
              <td><strong style="color: #34d399;">10 contatos / dia</strong></td>
            </tr>
            <tr>
              <td><strong>Período Eleitoral (Leilão Inflacionado)</strong></td>
              <td>R$ 100,00 / dia</td>
              <td>~ 3.600 pessoas (-40%)</td>
              <td>R$ 16,50 (+65%)</td>
              <td><strong style="color: #f87171;">6 contatos / dia</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="didactic-box" style="margin-top: 8px;">
        <div class="didactic-title">📱 Outro Fator: A "Atenção Dividida" do Usuário nas Redes</div>
        <div class="didactic-text">
          Durante as eleições, o feed das pessoas fica inundado de polêmicas, notícias e debates inflamados. O usuário passa o dedo mais rápido e presta menos atenção em anúncios comerciais em geral. Isso faz com que a taxa de cliques de todas as empresas diminua temporariamente no Brasil.
        </div>
      </div>

      <h3 style="font-size: 11.5px; color: #f8fafc; margin: 8px 0 4px;">O que NUNCA Deve Ser Feito Nesse Momento:</h3>

      <div class="bullet-point">
        <div class="step-badge">✕</div>
        <div>
          <strong style="color: #f87171;">Pausar todos os anúncios:</strong> Quando você pausa, o algoritmo do Facebook/Instagram "esquece" a inteligência acumulada sobre quem são seus clientes ideais. Quando você reativar, terá que pagar o dobro para reensinar a plataforma.
        </div>
      </div>

      <div class="bullet-point">
        <div class="step-badge">✕</div>
        <div>
          <strong style="color: #f87171;">Dobrar o investimento no desespero:</strong> Tentar manter o mesmo volume injetando mais dinheiro às cegas apenas alimenta o leilão caro e encarece sua venda final sem necessidade.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 03 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 4: O QUE A KRM CORP ESTÁ FAZENDO -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        <img src="${logoBase64}" alt="KrM Corp">
        <span class="brand-header-text">KrM <span>CORP</span></span>
      </div>
      <div class="header-meta">Explicação ao Cliente • <span>03: Nossa Atuação</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Ações Práticas de Proteção</div>
      <h2 class="section-title">O que a KrM Corp está fazendo para proteger seu caixa?</h2>
      <p class="section-subtitle">
        Não ficamos de braços cruzados esperando a eleição passar. Implementamos 4 manobras técnicas para extrair o máximo resultado possível do seu orçamento.
      </p>

      <div class="grid-2" style="gap: 10px; margin-bottom: 10px;">
        
        <!-- Ação 1 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">01</div>
            <strong style="font-size: 11px; color: #d4a34b;">Travas de Segurança no Orçamento</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Configuramos limites máximos de custo por lance. Isso impede que a inteligência da Meta gaste seu dinheiro em dias ou horários de pico onde os políticos estão disputando o leilão a preços absurdos.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Proteção direta para seu dinheiro não ser desperdiçado no pico do leilão.
          </div>
        </div>

        <!-- Ação 2 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">02</div>
            <strong style="font-size: 11px; color: #d4a34b;">Criativos que Fogem do Padrão Político</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Anúncios muito formais ou tipo "santinho" são ignorados porque parecem política. Estamos priorizando formatos mais humanos, conversacionais e diretos que chamam a atenção imediatamente.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Seus anúncios se destacam visualmente no meio do barulho eleitoral.
          </div>
        </div>

        <!-- Ação 3 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">03</div>
            <strong style="font-size: 11px; color: #d4a34b;">Reforço em Tráfego de Busca (Google)</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Políticos gastam dinheiro aparecendo de surpresa no feed das redes. Eles <strong>não compram</strong> a pesquisa no Google por termos como <em>"comprar [seu produto]"</em> ou <em>"contratar [seu serviço]"</em>. Redirecionamos esforços onde a intenção do cliente é 100% comercial.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Clientes que já estão procurando pelo que você vende continuam chegando.
          </div>
        </div>

        <!-- Ação 4 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="step-badge">04</div>
            <strong style="font-size: 11px; color: #d4a34b;">Ativação de Contatos Anteriores (WhatsApp)</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            O canal mais barato hoje é quem já falou com sua empresa nos últimos meses. Incentivamos réguas de recontato via WhatsApp e e-mail marketing, onde o custo de comunicação é praticamente zero.
          </p>
          <div style="margin-top: 4px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Geração de vendas imediatas sem depender de pagar caro por novos cliques.
          </div>
        </div>

      </div>

      <div class="card card-highlight" style="margin-bottom: 0;">
        <div style="font-size: 10.5px; font-weight: 700; color: #d4a34b; text-transform: uppercase; margin-bottom: 4px;">
          Nossa Postura como seu Parceiro de Ecossistema:
        </div>
        <div style="font-size: 10px; color: #f1f5f9; line-height: 1.45;">
          "Transparência é a base do nosso trabalho. Não inventamos desculpas técnicas vazias quando o mercado oscila. Apresentamos os dados reais, explicamos a causa exata e aplicamos as estratégias certas para que o seu negócio passe por esse período com estabilidade e pronto para acelerar forte quando o leilão normalizar."
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 04 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 5: COMO SUA EQUIPE PODE AJUDAR HOJE -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        <img src="${logoBase64}" alt="KrM Corp">
        <span class="brand-header-text">KrM <span>CORP</span></span>
      </div>
      <div class="header-meta">Explicação ao Cliente • <span>04: Ações em Conjunto</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Orientações Práticas</div>
      <h2 class="section-title">Como a sua equipe comercial pode nos ajudar agora?</h2>
      <p class="section-subtitle">
        Enquanto nossa equipe cuida da parte técnica dos anúncios, três atitudes simples do seu time de atendimento farão toda a diferença nas suas vendas deste mês.
      </p>

      <div class="card" style="margin-bottom: 10px;">
        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th style="width: 25%;">Ação da Sua Equipe</th>
              <th style="width: 50%;">Por que isso é decisivo agora?</th>
              <th style="width: 25%;">Impacto Esperado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Atendimento Ultra Rápido (&lt; 5 min)</strong></td>
              <td>Como o volume de leads é menor e mais caro, cada pessoa que manda mensagem tem que ser atendida na hora. Responder em até 5 minutos triplica a chance de fechar.</td>
              <td><span style="color: #34d399; font-weight: 700;">Aumento de Conversão</span></td>
            </tr>
            <tr>
              <td><strong>2. Recontato da Base Antiga</strong></td>
              <td>Abra o WhatsApp da empresa e mande mensagem para orçamentos que esfriaram nos últimos 60 dias oferecendo uma condição especial para fechar hoje.</td>
              <td><span style="color: #34d399; font-weight: 700;">Vendas Sem Custo</span></td>
            </tr>
            <tr>
              <td><strong>3. Pacotes com Mais Valor</strong></td>
              <td>Ao invés de oferecer apenas o produto/serviço básico, crie combos ou planos com ticket mais alto para compensar o aumento pontual do custo do lead.</td>
              <td><span style="color: #34d399; font-weight: 700;">Maior Faturamento</span></td>
            </tr>
            <tr>
              <td><strong>4. Manter a Calma e a Consistência</strong></td>
              <td>Lembre-se que as eleições têm data certa para acabar. As empresas que mantêm a estrutura ativa colhem um salto enorme de vendas assim que o leilão esvazia.</td>
              <td><span style="color: #d4a34b; font-weight: 700;">Segurança de Mercado</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card card-highlight" style="margin-bottom: 10px; padding: 12px 14px;">
        <div style="font-size: 12px; font-weight: 700; color: #f8fafc; margin-bottom: 4px;">
          KrM Corp: Ao Seu Lado em Todos os Ciclos de Mercado
        </div>
        <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.45; margin-bottom: 8px;">
          Sob a liderança de <strong>Carlos Eduardo Ribeiro Menezes</strong>, a <strong>KrM Corp</strong> cuida de todo o seu ecossistema digital: sites de alta performance, CRMs, integrações de WhatsApp e inteligência de tráfego pago. Nosso compromisso não é apenas colocar anúncios no ar, mas garantir a sustentabilidade e a rentabilidade do seu negócio em qualquer cenário.
        </p>
        <div style="display: flex; gap: 14px; font-size: 8.5px; color: #d4a34b; font-weight: 600; flex-wrap: wrap;">
          <div>◆ Monitoramento Diário de Custos</div>
          <div>◆ Blindagem Contra Leilões Inflacionados</div>
          <div>◆ Ecossistemas e CRMs Sob Medida</div>
          <div>◆ Parceria Estratégica Transparente</div>
        </div>
      </div>

      <div style="background: rgba(15, 21, 33, 0.9); border: 1px solid rgba(212, 163, 75, 0.35); border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 10.5px; font-weight: 700; color: #f8fafc;">Tem alguma dúvida sobre suas campanhas?</div>
          <div style="font-size: 8.5px; color: #94a3b8;">Estamos à disposição para alinhar qualquer ajuste com você e seu time.</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10px; font-weight: 700; color: #d4a34b;">KrM Corp • Montes Claros / MG</div>
          <div style="font-size: 8.5px; color: #64748b;">WhatsApp Direto: +55 (38) 98845-0377</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 05 de 05</div>
    </div>
  </div>

</body>
</html>
`;

async function generatePDF() {
  console.log("Gerando PDF com linguagem explicativa e didática para o cliente...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetDir = path.join(rootDir, "Documentos", "Elevação do CPR");
  const outputPathFolder = path.join(targetDir, "Relatorio_Estrategico_Elevacao_CPR_KrMCorp.pdf");
  const outputPathRoot = path.join(rootDir, "Relatorio_Estrategico_Elevacao_CPR_KrMCorp.pdf");

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

  console.log(`PDF didático gerado com sucesso em:\n- ${outputPathFolder}\n- ${outputPathRoot}`);
  await browser.close();
}

generatePDF().catch(err => {
  console.error("Erro ao gerar PDF:", err);
  process.exit(1);
});
