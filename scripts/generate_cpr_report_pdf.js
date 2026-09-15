import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const rootDir = process.cwd();

// Localizar a pasta de documentos
const docsDir = fs.existsSync(path.join(rootDir, "Documentos", "Elevação do CPR - Solution"))
  ? path.join(rootDir, "Documentos", "Elevação do CPR - Solution")
  : path.join(rootDir, "Documentos", "Elevação do CPR");

const getImageBase64 = (filename) => {
  const filePath = path.join(docsDir, filename);
  if (fs.existsSync(filePath)) {
    return `data:image/jpeg;base64,${fs.readFileSync(filePath).toString("base64")}`;
  }
  return "";
};

const logoSolutionBase64 = getImageBase64("LogoSolution.jpeg");
const imgFlavio = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.25.jpeg");
const imgLula = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.24 (2).jpeg");
const imgCury = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.24 (1).jpeg");
const imgRenan = getImageBase64("WhatsApp Image 2026-09-15 at 11.50.25 (1).jpeg");

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Solution Place - Relatório Informativo: Elevação do CPR e Impacto do Período Eleitoral</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
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
      background-color: #08090d;
      color: #e2e8f0;
      line-height: 1.5;
      font-size: 12.5px;
    }

    .page {
      width: 210mm;
      height: 297mm;
      position: relative;
      background: radial-gradient(circle at 85% 15%, #181b28 0%, #0c0e16 55%, #07080c 100%);
      padding: 16mm 18mm;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Moldura técnica Solution Place */
    .page-border-frame {
      position: absolute;
      top: 8mm;
      left: 8mm;
      right: 8mm;
      bottom: 8mm;
      border: 1px solid rgba(185, 28, 28, 0.28);
      pointer-events: none;
      z-index: 1;
    }
    .page-border-corner {
      position: absolute;
      width: 14px;
      height: 14px;
      border-color: #b91c1c;
      border-style: solid;
      pointer-events: none;
      z-index: 2;
    }
    .corner-tl { top: 7mm; left: 7mm; border-width: 2.5px 0 0 2.5px; }
    .corner-tr { top: 7mm; right: 7mm; border-width: 2.5px 2.5px 0 0; }
    .corner-bl { bottom: 7mm; left: 7mm; border-width: 0 0 2.5px 2.5px; }
    .corner-br { bottom: 7mm; right: 7mm; border-width: 0 2.5px 2.5px 0; }

    .brand-red-text {
      background: linear-gradient(135deg, #ffffff 0%, #fca5a5 45%, #dc2626 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Headers e Rodapés Solution Place */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(185, 28, 28, 0.35);
      padding-bottom: 8px;
      margin-bottom: 14px;
      z-index: 2;
    }
    .header-logo-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-logo-img {
      height: 32px;
      width: 32px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid rgba(185, 28, 28, 0.5);
      background: #ffffff;
      box-shadow: 0 0 10px rgba(185, 28, 28, 0.25);
    }
    .brand-header-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .brand-header-text span {
      color: #ef4444;
      font-weight: 900;
    }
    .brand-header-tag {
      font-size: 8.5px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #94a3b8;
      border-left: 1px solid rgba(185, 28, 28, 0.4);
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
      color: #ef4444;
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
      font-family: 'Montserrat', 'Inter', sans-serif;
    }
    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(185, 28, 28, 0.14);
      border: 1px solid rgba(220, 38, 38, 0.4);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #fca5a5;
      margin-bottom: 6px;
      align-self: flex-start;
    }
    .section-title {
      font-size: 19px;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 4px;
      line-height: 1.25;
      letter-spacing: -0.3px;
    }
    .section-subtitle {
      font-size: 11px;
      color: #94a3b8;
      margin-bottom: 14px;
      line-height: 1.45;
    }

    /* Cards */
    .card {
      background: rgba(18, 21, 31, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 12px 14px;
      margin-bottom: 12px;
    }
    .card-highlight {
      background: linear-gradient(135deg, rgba(28, 32, 46, 0.85) 0%, rgba(18, 20, 30, 0.95) 100%);
      border: 1px solid rgba(185, 28, 28, 0.4);
      position: relative;
    }
    .card-highlight::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 3.5px;
      height: 100%;
      background: #dc2626;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    /* Grids */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
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

    /* Capa Solution */
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
      gap: 16px;
    }
    .cover-logo-badge {
      padding: 4px;
      background: #ffffff;
      border-radius: 8px;
      border: 1.5px solid #b91c1c;
      box-shadow: 0 0 20px rgba(185, 28, 28, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cover-logo-img {
      height: 54px;
      width: 54px;
      object-fit: cover;
      border-radius: 4px;
    }
    .cover-brand-titles {
      display: flex;
      flex-direction: column;
    }
    .cover-brand-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #ffffff;
      line-height: 1.1;
    }
    .cover-brand-name span {
      color: #ef4444;
    }
    .cover-brand-sub {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #cbd5e1;
      margin-top: 3px;
      font-weight: 600;
    }
    .cover-badge {
      background: rgba(185, 28, 28, 0.12);
      border: 1px solid rgba(220, 38, 38, 0.4);
      padding: 8px 16px;
      border-radius: 4px;
      text-align: right;
    }
    .cover-badge .badge-title {
      font-size: 9.5px;
      font-weight: 800;
      color: #ef4444;
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
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 3.5px;
      color: #ef4444;
      text-transform: uppercase;
      margin-bottom: 14px;
      border-bottom: 1px solid rgba(185, 28, 28, 0.45);
      padding-bottom: 4px;
    }
    .cover-main-title {
      font-size: 34px;
      line-height: 1.18;
      font-weight: 900;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }

    .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(22, 27, 40, 0.85);
      border: 1px solid rgba(185, 28, 28, 0.35);
      padding: 10px 18px;
      border-radius: 8px;
    }
    .stat-pill .num {
      font-size: 24px;
      font-weight: 900;
      color: #ef4444;
      font-family: 'Montserrat', sans-serif;
    }
    .stat-pill .label {
      font-size: 9.5px;
      line-height: 1.35;
      color: #e2e8f0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cover-bottom {
      border-top: 1px solid rgba(185, 28, 28, 0.3);
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
      background: rgba(16, 19, 29, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 6px;
      padding: 10px;
      text-align: center;
    }
    .metric-box.danger {
      border-color: rgba(239, 68, 68, 0.35);
      background: rgba(239, 68, 68, 0.06);
    }
    .metric-val {
      font-size: 19px;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    .metric-val.red { color: #f87171; }
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
      margin: 8px 0;
      font-size: 10px;
    }
    .exec-table th {
      background: rgba(28, 33, 48, 0.95);
      color: #fca5a5;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 1px;
      padding: 8px 10px;
      text-align: left;
      border-bottom: 1px solid rgba(185, 28, 28, 0.4);
    }
    .exec-table td {
      padding: 8px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
    }
    .exec-table tr:nth-child(even) td {
      background: rgba(255, 255, 255, 0.015);
    }

    .player-card {
      background: rgba(20, 24, 36, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }
    .player-avatar-wrap {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #ef4444;
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
      margin-bottom: 6px;
    }
    .player-investment {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
      font-weight: 700;
      font-size: 9.5px;
      padding: 3px 6px;
      border-radius: 4px;
      width: 100%;
    }

    .didactic-box {
      background: rgba(185, 28, 28, 0.08);
      border: 1px dashed rgba(220, 38, 38, 0.4);
      border-radius: 6px;
      padding: 12px 14px;
      margin: 10px 0;
    }
    .didactic-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #fca5a5;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .didactic-text {
      font-size: 10.5px;
      color: #cbd5e1;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <!-- ============================================================== -->
  <!-- PÁGINA 1: CAPA INFORMATIVA -->
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
          <div class="cover-logo-badge">
            <img class="cover-logo-img" src="${logoSolutionBase64}" alt="Solution Place">
          </div>
          <div class="cover-brand-titles">
            <div class="cover-brand-name">SOLUTION<span>PLACE</span></div>
            <div class="cover-brand-sub">BLINDAGEM</div>
          </div>
        </div>
        <div class="cover-badge">
          <div class="badge-title">Comunicado Informativo</div>
          <div class="badge-sub">Dinâmica de Mercado & Tráfego Pago</div>
        </div>
      </div>

      <div class="cover-center">
        <div class="cover-tagline">Relatório Informativo • Período Eleitoral 2026</div>
        <h1 class="cover-main-title">
          POR QUE OS <span class="brand-red-text">LEADS REDUZIRAM</span><br>
          NAS ÚLTIMAS SEMANAS?
        </h1>

        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-top: 24px;">
          <div class="stat-pill">
            <span class="num">+62,3%</span>
            <span class="label">Subida Média no Custo por Resultado (CPR)<br>Registrada nas Plataformas de Anúncio</span>
          </div>
          <div class="stat-pill" style="border-color: rgba(52, 211, 153, 0.4);">
            <span class="num" style="color: #34d399;">100%</span>
            <span class="label">Oscilação de Mercado Cíclica<br>Vinculada ao Calendário Eleitoral</span>
          </div>
        </div>
      </div>

      <div class="cover-bottom">
        <div class="meta-col">
          <div class="label">Emissor</div>
          <div class="value">Equipe Interna de Tráfego • Solution Place</div>
        </div>
        <div class="meta-col">
          <div class="label">Objetivo do Documento</div>
          <div class="value">Esclarecimento Informativo sobre Métricas e Leilão Digital</div>
        </div>
        <div class="meta-col" style="text-align: right;">
          <div class="label">Vigência</div>
          <div class="value" style="color: #ef4444;">Período Eleitoral 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 2: O FENÔMENO DO LEILÃO & A DISPUTA PELA ATENÇÃO -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        <img class="header-logo-img" src="${logoSolutionBase64}" alt="Solution Place">
        <span class="brand-header-text">SOLUTION<span>PLACE</span></span>
        <span class="brand-header-tag">Blindagem</span>
      </div>
      <div class="header-meta">Documento Informativo • <span>01: O Cenário Geral</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Análise do Leilão de Anúncios</div>
      <h2 class="section-title">"Se os conteúdos estão alinhados, por que chegam menos mensagens?"</h2>
      <p class="section-subtitle">
        A redução de volume observada nas últimas semanas não decorre de falha criativa ou desconfiguração técnica, mas sim de uma alteração conjuntural na mecânica de leilão das redes sociais.
      </p>

      <div class="didactic-box">
        <div class="didactic-title">💡 A Mecânica de Leilão e o Espaço Limitado de Exibição:</div>
        <div class="didactic-text">
          As plataformas de anúncios (Meta Ads, Instagram e Facebook) operam com um <strong>inventário de atenção finito</strong>: o número de usuários ativos e o tempo médio que cada pessoa passa navegando não se multiplicam repentinamente. No entanto, no período eleitoral, entram na disputa centenas de campanhas políticas injetando quantias massivas de recursos públicos e privados, comprando visualizações a qualquer preço para expor candidatos.<br>
          Como a quantidade de espaços publicitários na tela é fixa e a demanda por compras cresce de forma abrupta, o custo básico para exibir qualquer anúncio sobe automaticamente para todos os participantes do leilão.
        </div>
      </div>

      <div class="card card-highlight">
        <div style="font-size: 11.5px; font-weight: 700; color: #fca5a5; margin-bottom: 4px;">
          A Assimetria Econômica entre Anunciantes Comerciais e Campanhas Eleitorais:
        </div>
        <div style="font-size: 10.5px; color: #cbd5e1; line-height: 1.5;">
          Enquanto empresas privadas investem com base em retorno financeiro, lucratividade e custo viável por aquisição, as campanhas políticas <strong>não operam com métricas de lucro</strong>. O objetivo das candidaturas é esgotar a verba do Fundo Eleitoral antes do dia da votação para alcançar o maior número possível de eleitores. Essa injeção de capital sem restrição de retorno financeiro distorce temporariamente a régua de preços do mercado digital.
        </div>
      </div>

      <h3 style="font-size: 12px; color: #fca5a5; text-transform: uppercase; letter-spacing: 1px; margin: 12px 0 8px;">
        Dados Auditados: Amostragem de Investimentos Diários em Anúncios
      </h3>

      <!-- 4 Cards com fotos e valores reais dos arquivos -->
      <div class="grid-4" style="margin-bottom: 12px;">
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
        <div style="font-size: 10.5px; color: #94a3b8; line-height: 1.5;">
          <strong style="color: #f1f5f9;">O impacto direto no leilão geral:</strong> Somente esses 4 exemplos somam mais de <strong style="color: #ef4444;">R$ 214 mil por DIA</strong> disputando as telas de celulares. Como as campanhas políticas compram alcance massivo e aberto para toda a população da região, elas disputam a atenção de praticamente todos os usuários ativos nas redes ao mesmo tempo, congestionando o inventário geral e encarecendo a exibição de qualquer anúncio comercial.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">Solution Place • Blindagem</div>
      <div>Página 02 de 03</div>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- PÁGINA 3: IMPACTOS TÉCNICOS NAS MÉTRICAS & QUADRO COMPARATIVO -->
  <!-- ============================================================== -->
  <div class="page">
    <div class="page-border-frame"></div>
    <div class="page-border-corner corner-tl"></div>
    <div class="page-border-corner corner-tr"></div>
    <div class="page-border-corner corner-bl"></div>
    <div class="page-border-corner corner-br"></div>

    <div class="page-header">
      <div class="header-logo-wrap">
        <img class="header-logo-img" src="${logoSolutionBase64}" alt="Solution Place">
        <span class="brand-header-text">SOLUTION<span>PLACE</span></span>
        <span class="brand-header-tag">Blindagem</span>
      </div>
      <div class="header-meta">Documento Informativo • <span>02: Impacto nas Métricas</span></div>
    </div>

    <div class="page-content">
      <div class="section-tag">Métricas de Performance</div>
      <h2 class="section-title">O Efeito Cascata: Do CPM à Redução de Mensagens</h2>
      <p class="section-subtitle">
        Compreenda a correlação técnica entre o encarecimento do leilão e a oscilação no volume de contatos recebidos.
      </p>

      <div class="grid-3" style="margin-bottom: 12px;">
        <div class="metric-box danger">
          <div class="metric-val red">↑ CPM</div>
          <div class="metric-label">Custo por Mil Impressões</div>
          <div style="font-size: 9px; color: #cbd5e1; margin-top: 4px;">Paga-se mais para que o anúncio seja exibido na timeline dos usuários.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">+62,3%</div>
          <div class="metric-label">Elevação do CPR / CPL</div>
          <div style="font-size: 9px; color: #cbd5e1; margin-top: 4px;">Pico registrado no Gerenciador de Anúncios no período eleitoral.</div>
        </div>
        <div class="metric-box danger">
          <div class="metric-val red">↓ Volume</div>
          <div class="metric-label">Menos Pessoas Alcançadas</div>
          <div style="font-size: 9px; color: #cbd5e1; margin-top: 4px;">Com o mesmo orçamento diário, a campanha compra menos visualizações.</div>
        </div>
      </div>

      <div class="card card-highlight">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; color: #fca5a5; text-transform: uppercase;">
            Quadro Comparativo Informativo: Dinâmica de Entrega
          </span>
          <span style="font-size: 8.5px; background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 2px 6px; border-radius: 3px; font-weight: 600;">
            Efeito Sazonal
          </span>
        </div>

        <table class="exec-table" style="margin: 0;">
          <thead>
            <tr>
              <th>Variável Analisada</th>
              <th>Período Regular (Sem Eleições)</th>
              <th>Período Eleitoral (Leilão Inflacionado)</th>
              <th>Comportamento Observado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Disputa por Impressões</strong></td>
              <td>Concorrência regular entre marcas comerciais</td>
              <td>Invasão de verbas partidárias de alta escala</td>
              <td style="color: #f87171;">Hiperconcorrência no mesmo inventário</td>
            </tr>
            <tr>
              <td><strong>Custo por Resultado (CPR)</strong></td>
              <td>Estável dentro da média histórica da conta</td>
              <td>Elevação documentada de até +62,3%</td>
              <td style="color: #f87171;">Encarecimento direto de cada contato gerado</td>
            </tr>
            <tr>
              <td><strong>Alcance com a Mesma Verba</strong></td>
              <td>100% da capacidade habitual de entrega</td>
              <td>Redução de 35% a 45% nas impressões totais</td>
              <td style="color: #f87171;">O mesmo valor alcança menos usuários</td>
            </tr>
            <tr>
              <td><strong>Dispersão de Atenção</strong></td>
              <td>Consumo regular de conteúdo pelos usuários</td>
              <td>Feed saturado de debates e propagandas políticas</td>
              <td style="color: #f87171;">Queda reflexa na taxa de interação espontânea</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="didactic-box" style="margin-top: 10px;">
        <div class="didactic-title">📊 A Dispersão da Atenção do Usuário nas Redes:</div>
        <div class="didactic-text">
          Além do aumento no valor dos lances, há o fator comportamental: com o feed repleto de propagandas eleitorais, notícias de debates e posicionamentos políticos, o usuário tende a rolar a tela com maior rapidez e menor atenção aos conteúdos comerciais em geral. Essa sobrecarga reduz a taxa de clique e de início de conversas em praticamente todos os segmentos de mercado no Brasil durante a corrida eleitoral.
        </div>
      </div>

      <div class="card" style="margin-bottom: 0; margin-top: 4px; padding: 12px 14px;">
        <div style="font-size: 11px; font-weight: 700; color: #f1f5f9; margin-bottom: 4px;">
          Síntese Informativa:
        </div>
        <p style="font-size: 10px; color: #94a3b8; line-height: 1.5; margin: 0;">
          A elevação do Custo Por Resultado (CPR) e a consequente diminuição temporária no volume de contatos são decorrências diretas de um ciclo de mercado externo e periódico. Assim que o período eleitoral se encerra e o fluxo de verba das campanhas políticas deixa de sobrecarregar as plataformas, a dinâmica de leilão retoma seus padrões naturais de equilíbrio e custo.
        </p>
      </div>
    </div>

    <div class="page-footer">
      <div class="brand-signature">Solution Place • Blindagem</div>
      <div>Página 03 de 03</div>
    </div>
  </div>

</body>
</html>
`;

async function generatePDF() {
  console.log("Gerando PDF estritamente informativo (sem soluções) para a Solution Place...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetDir = docsDir;
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

  console.log(`PDF informativo Solution gerado com sucesso em:\n- ${outputPathFolder}\n- ${outputPathRoot}`);
  await browser.close();
}

generatePDF().catch(err => {
  console.error("Erro ao gerar PDF:", err);
  process.exit(1);
});
