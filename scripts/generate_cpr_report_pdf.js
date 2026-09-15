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
const imgMetaStats = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.49.jpeg");

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>KrM Corp - Relatório Estratégico: Elevação do CPR no Período Eleitoral</title>
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
      line-height: 1.45;
      font-size: 12.5px;
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

    /* Borda sutil de luxo */
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

    /* Headers e Rodapés de Páginas Internas */
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

    /* Títulos e Tipografia */
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
      line-height: 1.4;
    }

    /* Cards e Containers */
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
      width: 3px;
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

    /* CAPA (Page 1) */
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
      padding: 18px 0;
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
      font-size: 36px;
      line-height: 1.15;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .cover-description {
      font-size: 13.5px;
      line-height: 1.6;
      color: #94a3b8;
      max-width: 530px;
      margin-bottom: 24px;
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
      font-size: 26px;
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
      padding-top: 16px;
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
      font-size: 10.5px;
      font-weight: 600;
      color: #cbd5e1;
    }

    /* Metric Boxes */
    .metric-box {
      background: rgba(15, 21, 33, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 6px;
      padding: 10px;
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
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    .metric-val.red { color: #f87171; }
    .metric-val.gold { color: #d4a34b; }
    .metric-val.green { color: #34d399; }
    .metric-label {
      font-size: 8.5px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
    }

    /* Tabela */
    .exec-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 10px;
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
      line-height: 1.4;
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
      overflow: hidden;
    }
    .player-avatar-wrap {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #d4a34b;
      margin-bottom: 6px;
      background: #111;
    }
    .player-avatar-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .player-name {
      font-size: 10px;
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 2px;
    }
    .player-base {
      font-size: 8px;
      color: #94a3b8;
      margin-bottom: 5px;
    }
    .player-investment {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
      font-weight: 700;
      font-size: 9.5px;
      padding: 2px 6px;
      border-radius: 4px;
      width: 100%;
    }
  </style>
</head>
<body>

  <!-- ============================================================== -->
  <!-- PÁGINA 1: CAPA EXECUTIVA DE LUXO -->
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
          <div class="badge-title">KrM Intelligence Briefing</div>
          <div class="badge-sub">Estratégia, Dados & Gestão de Risco Digital</div>
        </div>
      </div>

      <div class="cover-center">
        <div class="cover-tagline">Relatório Estratégico Especial • Q3/Q4 2026</div>
        <h1 class="cover-main-title">
          A ELEVAÇÃO DO <span class="gold-gradient-text">CPR</span><br>
          NO PERÍODO ELEITORAL
        </h1>
        <p class="cover-description">
          A anatomia da inflação do leilão em tráfego pago (Meta Ads & Google), a drenagem massiva do inventário publicitário por campanhas partidárias e o plano tático da KrM Corp para blindar a rentabilidade da sua operação.
        </p>

        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <div class="stat-pill">
            <span class="num">+62,3%</span>
            <span class="label">Pico Médio de Elevação<br>no Custo por Resultado (CPR)</span>
          </div>
          <div class="stat-pill" style="border-color: rgba(212, 163, 75, 0.4);">
            <span class="num" style="color: #d4a34b;">R$ 214k+</span>
            <span class="label">Injeção Diária Amostrada<br>Apenas em 4 Players Políticos</span>
          </div>
        </div>
      </div>

      <div class="cover-bottom">
        <div class="meta-col">
          <div class="label">Organização Emissora</div>
          <div class="value">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
        </div>
        <div class="meta-col">
          <div class="label">Tema de Análise</div>
          <div class="value">Leilão Meta/Google • Inflação de CPM • Blindagem de ROI</div>
        </div>
        <div class="meta-col" style="text-align: right;">
          <div class="label">Classificação & Data</div>
          <div class="value" style="color: #d4a34b;">Documento Estratégico • Setembro 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 2: O DIAGNÓSTICO & A DISPUTA PELA ATENÇÃO -->
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
      <div class="header-meta">KrM Intelligence • <span>Seção 01: O Diagnóstico</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Análise de Cenário Macroeconômico</div>
      <h2 class="section-title">Por que seu tráfego começou a performar menos?</h2>
      <p class="section-subtitle">
        Uma queda repentina de conversão não é anomalia isolada do seu criativo — é o resultado da maior distorção periódica do mercado de anúncios digitais.
      </p>

      <div class="card card-highlight">
        <div style="font-size: 11.5px; font-weight: 700; color: #d4a34b; margin-bottom: 4px;">
          "Sentiu uma queda nos resultados do seu Tráfego Pago nas últimas semanas? Calma. Não foi só você."
        </div>
        <div style="font-size: 10.5px; color: #cbd5e1; line-height: 1.45;">
          O período eleitoral altera radicalmente a dinâmica dos algoritmos de anúncios. As redes sociais operam com um <strong>inventário finito de atenção</strong>: o tempo que as pessoas passam rolando o feed não dobra milagrosamente. Contudo, o volume de capital competindo por cada segundo desse mesmo feed dispara exponencialmente.
        </div>
      </div>

      <h3 style="font-size: 12px; color: #d4a34b; text-transform: uppercase; letter-spacing: 1px; margin: 8px 0 8px;">
        Evidências Reais dos Arquivos: Casos de Disputa por Atenção
      </h3>

      <!-- Grid com 4 personagens analisados dos arquivos -->
      <div class="grid-4" style="margin-bottom: 12px;">
        <!-- Card 1: PL / Flávio Bolsonaro -->
        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgFlavio}" alt="Flávio Bolsonaro">
          </div>
          <div class="player-name">PL / Flávio B.</div>
          <div class="player-base">11,4M seguidores</div>
          <div class="player-investment">R$ 142,7 mil/dia</div>
        </div>

        <!-- Card 2: Lula -->
        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgLula}" alt="Lula">
          </div>
          <div class="player-name">Campanha Lula</div>
          <div class="player-base">14,9M seguidores</div>
          <div class="player-investment">R$ 61,5 mil/dia</div>
        </div>

        <!-- Card 3: Augusto Cury -->
        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgCury}" alt="Augusto Cury">
          </div>
          <div class="player-name">Augusto Cury</div>
          <div class="player-base">10,7M seguidores</div>
          <div class="player-investment" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24;">R$ 6,4 mil/dia</div>
        </div>

        <!-- Card 4: Renan Santos -->
        <div class="player-card">
          <div class="player-avatar-wrap">
            <img src="${imgRenan}" alt="Renan Santos">
          </div>
          <div class="player-name">Renan Santos</div>
          <div class="player-base">2,5M seguidores</div>
          <div class="player-investment" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24;">R$ 3,7 mil/dia</div>
        </div>
      </div>

      <table class="exec-table">
        <thead>
          <tr>
            <th>Origem do Recurso</th>
            <th>Objetivo do Anunciante</th>
            <th>Comportamento no Leilão</th>
            <th>Impacto nos Negócios Privados</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Fundo Partidário / Eleições</strong></td>
            <td>Alcance em massa a qualquer custo (votos)</td>
            <td>Não visa lucro imediato; paga qualquer lance para vencer</td>
            <td>Expulsa anúncios de menor porte do topo do feed</td>
          </tr>
          <tr>
            <td><strong>Grandes Players de Mídia</strong></td>
            <td>Captura de engajamento e debate público</td>
            <td>Segmentações massivas em públicos genéricos (Brasil inteiro)</td>
            <td>Inflaciona o CPM geral em todos os dados demográficos</td>
          </tr>
          <tr>
            <td><strong>Pequena / Média Empresa</strong></td>
            <td>Geração de leads com ROI positivo (sobrevivência)</td>
            <td>Orçamento limitado e sensível a cada real gasto</td>
            <td>Vê o Custo Por Resultado subir vertiginosamente</td>
          </tr>
        </tbody>
      </table>

      <div class="grid-2" style="margin-top: 8px;">
        <div class="card" style="margin-bottom: 0;">
          <div style="font-size: 10.5px; font-weight: 700; color: #e5c07b; margin-bottom: 3px;">A Assimetria de Objetivos</div>
          <p style="font-size: 9.5px; color: #94a3b8; line-height: 1.4;">
            Campanhas políticas não têm meta de ROAS (retorno sobre investimento em publicidade). Seu objetivo é queimar a verba antes do dia da eleição. Isso distorce completamente o equilíbrio natural do leilão da Meta e Google.
          </p>
        </div>
        <div class="card" style="margin-bottom: 0;">
          <div style="font-size: 10.5px; font-weight: 700; color: #e5c07b; margin-bottom: 3px;">A Fadiga Mental do Consumidor</div>
          <p style="font-size: 9.5px; color: #94a3b8; line-height: 1.4;">
            Ao ser saturado por propagandas eleitorais agressivas, o usuário desliza o feed mais rápido e rejeita peças patrocinadas, derrubando a taxa de conversão (CTR) e aumentando o custo de engajamento de marcas comerciais.
          </p>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 02 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 3: O IMPACTO FINANCEIRO NAS OPERAÇÕES TRADICIONAIS -->
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
      <div class="header-meta">KrM Intelligence • <span>Seção 02: O Efeito Cascata</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Métricas & Evidências Meta Ads</div>
      <h2 class="section-title">O Efeito Cascata: Do CPM ao Caixa da Empresa</h2>
      <p class="section-subtitle">
        A correlação matemática entre o leilão saturado e o aumento crítico do CPR registrado nos gerenciadores.
      </p>

      <div class="grid-3" style="margin-bottom: 12px;">
        <div class="metric-box danger">
          <div class="metric-val red">↑ CPM</div>
          <div class="metric-label">Custo por Mil Impressões</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 4px;">Paga-se muito mais para simplesmente exibir seu anúncio na tela.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">+62,3%</div>
          <div class="metric-label">Elevação do CPR / CPL</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 4px;">Pico comprovado nos prints analisados do Gerenciador de Anúncios Meta.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">↓ Volume</div>
          <div class="metric-label">Menor Geração de Contatos</div>
          <div style="font-size: 8.5px; color: #cbd5e1; margin-top: 4px;">Com o mesmo orçamento, a empresa recebe quase 40% menos oportunidades.</div>
        </div>
      </div>

      <div class="card card-highlight">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 10.5px; font-weight: 700; color: #d4a34b; text-transform: uppercase; letter-spacing: 1px;">
            Simulação de Impacto Financeiro Real (Orçamento Médio de R$ 10.000 / mês)
          </span>
          <span style="font-size: 8.5px; background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 2px 6px; border-radius: 3px; font-weight: 600;">
            Cenário Inflacionado
          </span>
        </div>

        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th>Métrica Operacional</th>
              <th>Período Normal (Baseline)</th>
              <th>Período Eleitoral (Inflacionado)</th>
              <th>Impacto no Negócio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CPM Médio (Meta Ads)</td>
              <td>R$ 18,00</td>
              <td>R$ 29,50</td>
              <td style="color: #f87171; font-weight: 600;">+ 63,8% no custo de exibição</td>
            </tr>
            <tr>
              <td>CPL (Custo por Lead / Mensagem)</td>
              <td>R$ 12,50</td>
              <td>R$ 20,30</td>
              <td style="color: #f87171; font-weight: 600;">+ 62,4% por oportunidade</td>
            </tr>
            <tr>
              <td>Volume Total de Leads Recebidos</td>
              <td>800 leads</td>
              <td>492 leads</td>
              <td style="color: #f87171; font-weight: 600;">- 308 oportunidades (-38,5%)</td>
            </tr>
            <tr>
              <td>CAC Efetivo (Conversão a 5%)</td>
              <td>R$ 250,00</td>
              <td>R$ 406,50</td>
              <td style="color: #f87171; font-weight: 600;">+ 62,6% por cliente fechado</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-size: 12px; color: #f8fafc; margin: 10px 0 6px;">Os 3 Erros Fatais das Empresas Diante Desse Cenário:</h3>

      <div class="bullet-point">
        <div class="step-badge">1</div>
        <div>
          <strong style="color: #f87171;">Pausar todas as campanhas em pânico:</strong> Interromper os anúncios destrói o histórico de aprendizado do Pixel e CAPI da Meta. Quando as eleições terminarem, você terá que reiniciar a fase de aprendizado a um custo triplicado.
        </div>
      </div>

      <div class="bullet-point">
        <div class="step-badge">2</div>
        <div>
          <strong style="color: #f87171;">Injetar mais dinheiro desordenado para forçar o volume:</strong> Aumentar o budget em campanhas que já estão sofrendo no leilão inflacionado apenas queima a reserva financeira da empresa para enriquecer a plataforma de anúncios.
        </div>
      </div>

      <div class="bullet-point">
        <div class="step-badge">3</div>
        <div>
          <strong style="color: #f87171;">Monocultura de Canal (Depender 100% de tráfego frio):</strong> Empresas que não possuem CRM ativo, réguas de automação e listas de clientes sofrem risco existencial toda vez que o leilão das redes sociais oscila.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 03 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 4: O PLAYBOOK KRMCORP DE RESPOSTA ESTRATÉGICA -->
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
      <div class="header-meta">KrM Intelligence • <span>Seção 03: Blindagem de ROI</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Playbook KrM Corp</div>
      <h2 class="section-title">As 4 Alavancas de Sobrevivência & Lucratividade</h2>
      <p class="section-subtitle">
        Enquanto a concorrência reclama da alta do CPR, a KrM Corp implementa a arquitetura de ecossistema para transformar a crise em consolidação de mercado.
      </p>

      <div class="grid-2" style="gap: 10px; margin-bottom: 10px;">
        
        <!-- Alavanca 1 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <div class="step-badge">01</div>
            <strong style="font-size: 11px; color: #d4a34b;">Ativação da Base Proprietária (CRM)</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            O ativo mais barato no período eleitoral é quem já conhece sua empresa. Implementamos réguas de automação via WhatsApp Business API, resgate de orçamentos parados e fluxos de e-mail marketing personalizados.
          </p>
          <div style="margin-top: 5px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Custo por mensagem de WhatsApp é centavos contra R$ 20+ por lead frio no leilão.
          </div>
        </div>

        <!-- Alavanca 2 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <div class="step-badge">02</div>
            <strong style="font-size: 11px; color: #d4a34b;">Criativos Anti-Ruído Político</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Criativos convencionais parecem "horário eleitoral" e são ignorados em fração de segundo. Adotamos criativos nativos humanizados (vídeos em primeira pessoa, provas visuais incontestáveis e histórias reais) que rompem o padrão saturado.
          </p>
          <div style="margin-top: 5px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Recuperação imediata da atenção e elevação de CTR acima da média de mercado.
          </div>
        </div>

        <!-- Alavanca 3 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <div class="step-badge">03</div>
            <strong style="font-size: 11px; color: #d4a34b;">Migração para Tráfego de Intenção</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Campanhas políticas compram feed de interrupção. Elas não disputam termos de busca de fundo de funil no <strong>Google Search</strong> ou Google Meu Negócio. Transferimos parte do orçamento para capturar quem já está procurando pelo seu serviço.
          </p>
          <div style="margin-top: 5px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Captação de clientes prontos para contratar, sem concorrência com partidos.
          </div>
        </div>

        <!-- Alavanca 4 -->
        <div class="card" style="border-left: 3px solid #d4a34b;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <div class="step-badge">04</div>
            <strong style="font-size: 11px; color: #d4a34b;">Engenharia de Oferta & Aumento de LTV</strong>
          </div>
          <p style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4;">
            Se o custo de aquisição (CAC) aumentou 60%, a resposta matemática imediata é vender mais para o mesmo cliente: estruturação de planos anuais, combos com valor agregado e pacotes premium com margem mais gorda.
          </p>
          <div style="margin-top: 5px; font-size: 8.5px; color: #34d399; font-weight: 600;">
            ✓ Preservação total do lucro líquido da empresa mesmo com menos volume bruto de leads.
          </div>
        </div>

      </div>

      <div class="card card-highlight" style="margin-bottom: 0;">
        <div style="font-size: 10.5px; font-weight: 700; color: #d4a34b; text-transform: uppercase; margin-bottom: 5px;">
          O Princípio Fundamental da KrM Corp:
        </div>
        <div style="font-size: 10.5px; color: #f1f5f9; line-height: 1.45;">
          <strong>"Não tente ganhar uma disputa de leilão contra verbas públicas bilionárias no feed aberto.</strong> A estratégia vencedora da KrM Corp é mudar o campo de jogo: blindar o relacionamento com quem já é seu, afunilar os anúncios para públicos de altíssima conversão e construir ativos próprios que nenhum algoritmo de rede social pode tomar de você."
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">KrM Corp • Inteligência de Tráfego & Ecossistemas</div>
      <div>Página 04 de 05</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 5: PLANO DE AÇÃO TÁTICO & CONCLUSÃO EXECUTIVA -->
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
      <div class="header-meta">KrM Intelligence • <span>Seção 04: Plano de Ação</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Execução Prática</div>
      <h2 class="section-title">Checklist Operacional & Plano Tático</h2>
      <p class="section-subtitle">
        Medidas que devem ser executadas a partir de agora na gestão de tráfego e no departamento de vendas.
      </p>

      <div class="card" style="margin-bottom: 10px;">
        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th style="width: 28%;">Frente Operacional</th>
              <th style="width: 48%;">Ação Técnica Recomendada</th>
              <th style="width: 24%;">Prioridade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Gestão de Lances Meta</strong></td>
              <td>Configurar limites de custo (Cost Cap) para frear compras impulsivas do algoritmo em dias de pico político.</td>
              <td><span style="color: #ef4444; font-weight: 700;">Alta • Imediato</span></td>
            </tr>
            <tr>
              <td><strong>2. Higienização de Públicos</strong></td>
              <td>Negativar compradores e contatos já convertidos para não desperdiçar verba repetindo anúncios caros para a mesma pessoa.</td>
              <td><span style="color: #ef4444; font-weight: 700;">Alta • Imediato</span></td>
            </tr>
            <tr>
              <td><strong>3. Disparos no WhatsApp</strong></td>
              <td>Ativar régua conversacional de resgate com leads que entraram nos últimos 60 dias e não fecharam negócio.</td>
              <td><span style="color: #f59e0b; font-weight: 700;">Média • Semanal</span></td>
            </tr>
            <tr>
              <td><strong>4. Reforço no Google Search</strong></td>
              <td>Manter 100% de cobertura nos termos de busca institucionais e palavras de serviço de alta intenção comercial.</td>
              <td><span style="color: #f59e0b; font-weight: 700;">Média • Contínuo</span></td>
            </tr>
            <tr>
              <td><strong>5. Velocidade Comercial</strong></td>
              <td>Tempo de primeiro contato com o lead em menos de 5 minutos. Cada lead recebido hoje custou 60% a mais.</td>
              <td><span style="color: #ef4444; font-weight: 700;">Crítica • Diário</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card card-highlight" style="margin-bottom: 10px; padding: 12px 14px;">
        <div style="font-size: 12.5px; font-weight: 700; color: #f8fafc; margin-bottom: 5px;">
          Sobre a KrM Corp
        </div>
        <p style="font-size: 10px; color: #cbd5e1; line-height: 1.45; margin-bottom: 8px;">
          Fundada e liderada por <strong>Carlos Eduardo Ribeiro Menezes</strong>, a <strong>KrM Corp</strong> é uma integradora de soluções digitais de ponta. Desenvolvemos ecossistemas sob medida, CRMs proprietários, infraestruturas em nuvem e estratégias avançadas de inteligência de dados e tráfego pago para proteger e alavancar negócios corporativos.
        </p>
        <div style="display: flex; gap: 16px; font-size: 9px; color: #d4a34b; font-weight: 600; flex-wrap: wrap;">
          <div>◆ Arquitetura de Ecossistemas</div>
          <div>◆ Inteligência de Tráfego & Dados</div>
          <div>◆ CRMs & Automações Avançadas</div>
          <div>◆ Blindagem & Retenção de Lucro</div>
        </div>
      </div>

      <div style="background: rgba(15, 21, 33, 0.9); border: 1px solid rgba(212, 163, 75, 0.35); border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 11px; font-weight: 700; color: #f8fafc;">Precisa auditar sua operação e blindar seus resultados?</div>
          <div style="font-size: 9px; color: #94a3b8;">Entre em contato com o time de engenharia e crescimento da KrM Corp.</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10.5px; font-weight: 700; color: #d4a34b;">KrM Corp • Montes Claros / Brasil</div>
          <div style="font-size: 9px; color: #64748b;">WhatsApp Oficial: +55 (38) 98845-0377</div>
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
  console.log("Iniciando geração do PDF executivo KrM Corp...");
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

  console.log(`PDF gerado com sucesso em:\n- ${outputPathFolder}\n- ${outputPathRoot}`);
  await browser.close();
}

generatePDF().catch(err => {
  console.error("Erro ao gerar PDF:", err);
  process.exit(1);
});
