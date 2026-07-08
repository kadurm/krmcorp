import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Smartphone, 
  Search, 
  Award, 
  CheckCircle2, 
  Download, 
  Video, 
  FileText, 
  Layout, 
  ArrowRight, 
  Sparkles,
  Check,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jsPDF } from "jspdf";

const RifasPresentation = () => {
  const [step, setStep] = useState(0);
  const [clientName, setClientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"essencial" | "pro">("pro");
  const [activeTabPreview, setActiveTabPreview] = useState<"resultados" | "premiados">("resultados");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  // Parse URL query parameters for pre-personalization
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlClient = queryParams.get("cliente");
    const urlBrand = queryParams.get("marca");
    
    if (urlClient) setClientName(urlClient);
    if (urlBrand) setBrandName(urlBrand);
    
    if (urlClient && urlBrand) {
      setStep(1); // Skip step 0 if already configured via URL
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleDemoSearch = () => {
    if (!searchQuery) {
      setSearchResult(null);
      return;
    }
    const cleanQuery = searchQuery.trim();
    if (cleanQuery === "123456" || cleanQuery.toLowerCase().includes("carlos")) {
      setSearchResult("🎉 Parabéns! Você ganhou com o bilhete #123456 - Sorteio CG 160 (05/07/2026)");
    } else {
      setSearchResult("😔 Nenhum prêmio encontrado para este bilhete/número neste sorteio.");
    }
  };

  const generateContractPDF = () => {
    const doc = new jsPDF();
    
    const colorGold = [212, 175, 55] as [number, number, number];
    const colorWhite = [240, 240, 240] as [number, number, number];
    const colorMuted = [160, 160, 160] as [number, number, number];
    const colorBg = [15, 15, 15] as [number, number, number];
    const colorCard = [25, 25, 25] as [number, number, number];
    const colorBorder = [40, 40, 40] as [number, number, number];

    const addDarkPage = () => {
      doc.setFillColor(...colorBg);
      doc.rect(0, 0, 210, 297, "F");
    };

    // --- PÁGINA 1: Identificação, Diagnóstico e Escopo ---
    addDarkPage();

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...colorGold);
    doc.text("KrM Corp", 105, 20, { align: "center" });
    
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorWhite);
    doc.text("PROPOSTA DE DESENVOLVIMENTO DE PLATAFORMA DE RESULTADOS", 105, 30, { align: "center" });
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(...colorGold);
    doc.line(20, 35, 190, 35);
    
    // Partes
    doc.setFontSize(10);
    doc.setTextColor(...colorMuted);
    doc.text(`CONTRATANTE: ${clientName || "Parceiro"}`, 20, 45);
    doc.text(`PROJETO: Plataforma de Resultados - ${brandName || "Rifas Online"}`, 20, 50);
    doc.text("CONTRATADO: CARLOS EDUARDO RIBEIRO MENEZES (KrM Corp)", 20, 58);
    doc.text("CNPJ: 41.390.829/0001-25", 20, 63);
    
    // Diagnóstico
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text("1. O DESAFIO E A SOLUÇÃO", 20, 75);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colorWhite);
    doc.text("O Instagram tem derrubado perfis de resultados de sorteios de forma recorrente, causando", 20, 83);
    doc.text("perda de histórico, quebra de confiança do público e retrabalho constante.", 20, 87);
    doc.text("A solução proposta consiste no desenvolvimento de uma Plataforma Web Própria e Exclusiva,", 20, 92);
    doc.text("independente e imune a bloqueios, para visualização de resultados e bilhetes premiados.", 20, 96);
    
    // Escopo do Plano Escolhido
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text(`2. ESCOPO DO PROJETO - PLANO ${selectedPlan.toUpperCase()}`, 20, 108);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colorWhite);
    
    const drawItem = (title: string, desc: string, y: number) => {
      doc.setFillColor(...colorCard);
      doc.setDrawColor(...colorBorder);
      doc.roundedRect(20, y, 170, 12, 1, 1, "FD");
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colorGold);
      doc.text(title, 23, y + 8);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colorWhite);
      doc.text(desc, 65, y + 8);
    };

    let itemY = 115;
    drawItem("Site com Marca Própria", `Design moderno e personalizado como "${brandName || "Resultados"}"`, itemY);
    itemY += 14;
    drawItem("Aba de Vídeos de Resultados", "Grid para exibição prática de vídeos dos sorteios passados.", itemY);
    itemY += 14;
    drawItem("Aba de Bilhetes Premiados", "Tabela limpa de bilhetes sorteados, prêmios e ganhadores.", itemY);
    itemY += 14;
    drawItem("Painel Administrativo", "Área para cadastro ágil de novos resultados direto pelo celular.", itemY);
    itemY += 14;
    
    if (selectedPlan === "pro") {
      drawItem("Busca de Bilhete Premiado", "Módulo de consulta rápida por telefone ou número de bilhete.", itemY);
      itemY += 14;
      drawItem("Banners de Destaque", "Banners editáveis para promover novos sorteios e direcionar vendas.", itemY);
      itemY += 14;
    } else {
      drawItem("Infraestrutura Padrão", "Hospedagem estável com segurança SSL e alta performance.", itemY);
      itemY += 14;
    }

    // Cronograma
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...colorGold);
    doc.text("3. PRAZO DE ENTREGA", 20, itemY + 5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colorWhite);
    doc.text("A entrega da plataforma configurada e em funcionamento será realizada em:", 20, itemY + 12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text(selectedPlan === "pro" ? "Até 10 (dez) dias úteis" : "Até 7 (sete) dias úteis", 100, itemY + 12);
    doc.text(" a partir do envio das informações básicas (Logotipo e Nome).", 137, itemY + 12);

    // --- PÁGINA 2: Valores, Manutenção e Aceite ---
    doc.addPage();
    addDarkPage();
    
    let currentY = 20;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...colorGold);
    doc.text("4. VALORES E CONDIÇÕES COMERCIAIS", 20, currentY);
    currentY += 10;

    const setupBox = (title: string, value: string, desc: string, y: number) => {
      doc.setFillColor(...colorCard);
      doc.setDrawColor(...colorGold);
      doc.roundedRect(20, y, 170, 24, 2, 2, "FD");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...colorWhite);
      doc.text(title, 25, y + 8);
      
      doc.setFontSize(14);
      doc.setTextColor(...colorGold);
      doc.text(value, 25, y + 18);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...colorMuted);
      doc.text(desc, 90, y + 13);
    };

    const devPrice = selectedPlan === "pro" ? "R$ 1.900,00" : "R$ 1.300,00";
    const devDesc = selectedPlan === "pro" 
      ? "Desenvolvimento completo + Sistema de busca por bilhete + Painel admin"
      : "Desenvolvimento padrão (Resultados + Ganhadores) + Painel admin simples";
      
    setupBox("VALOR DE DESENVOLVIMENTO (Taxa Única)", devPrice, devDesc, currentY);
    currentY += 30;

    const monthlyPrice = selectedPlan === "pro" ? "R$ 119,00 /mês" : "R$ 89,00 /mês";
    const monthlyDesc = "Hospedagem dedicada na nuvem + Domínio próprio incluído + Backups + Suporte KrM Corp";
    setupBox("HOSPEDAGEM, MANUTENÇÃO & SUPORTE", monthlyPrice, monthlyDesc, currentY);
    currentY += 32;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colorGold);
    doc.text("CONDIÇÃO DE PAGAMENTO:", 20, currentY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colorWhite);
    doc.text("50% de entrada no início do projeto e 50% na entrega e homologação da plataforma.", 70, currentY);
    currentY += 12;

    // Cláusulas adicionais
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...colorGold);
    doc.text("5. REGRAS GERAIS E ATUALIZAÇÕES", 20, currentY);
    currentY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colorWhite);
    
    const rules = [
      "- O contratante é responsável por alimentar os sorteios pelo painel fornecido.",
      "- A mensalidade cobre infraestrutura, servidor de vídeos rápidos e renovação de domínio.",
      "- O site será construído utilizando tecnologia web moderna, otimizada para carregamento mobile.",
      "- Caso o contratante decida pausar o serviço, o site ficará temporariamente offline."
    ];

    rules.forEach(rule => {
      doc.text(rule, 20, currentY);
      currentY += 6;
    });

    currentY += 15;
    doc.setFontSize(9);
    doc.setTextColor(...colorMuted);
    const today = new Date();
    const dateStr = `Montes Claros/MG, ${today.getDate().toString().padStart(2, '0')} de ${['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][today.getMonth()]} de ${today.getFullYear()}.`;
    doc.text(dateStr, 20, currentY);
    
    currentY += 20;
    
    // Aceite Digital Box
    doc.setFillColor(...colorCard);
    doc.setDrawColor(...colorGold);
    doc.roundedRect(20, currentY, 170, 24, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...colorGold);
    doc.text("VALIDAÇÃO CONTRATUAL ELETRÔNICA", 25, currentY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...colorWhite);
    doc.text(`Este documento comercial é formalizado e validado através do aceite digital do contratante,`, 25, currentY + 15);
    doc.text(`encaminhado e registrado via WhatsApp para o contato oficial da KrM Corp (+55 38 98845-0377).`, 25, currentY + 19);
    
    doc.save(`Orcamento_KrM_Rifas_${clientName.replace(/\s+/g, '_') || "Resultados"}.pdf`);
    setPdfGenerated(true);
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-xl mx-auto text-center space-y-8 pt-4"
          >
            <div className="space-y-4">
              <div className="line-gold mx-auto mb-4" />
              <h1 className="font-display text-3xl md:text-5xl font-semibold mb-2 leading-tight">
                Plataforma de <span className="text-gradient-gold">Resultados</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                Crie uma proposta comercial interativa para seu cliente de rifas. Insira os dados abaixo para personalizar a apresentação com o visual exclusivo da KrM Corp.
              </p>
            </div>

            <div className="w-full bg-card/25 backdrop-blur-xl border border-white/5 p-6 sm:p-8 rounded-3xl text-left space-y-6 shadow-2xl">
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-primary font-medium">Nome do Cliente (Quem vai pagar)</label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: João Silva ou Loterias do Vale"
                  className="bg-background/40 border-white/10 focus:border-primary/50 text-sm py-5"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-primary font-medium">Nome da Marca / Site (Como vai se chamar)</label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Ex: Bahia Prêmios, Rifas do Zé"
                  className="bg-background/40 border-white/10 focus:border-primary/50 text-sm py-5"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={nextStep} 
                  variant="hero" 
                  size="lg" 
                  disabled={!clientName || !brandName}
                  className="px-8 flex gap-2 items-center text-sm font-semibold"
                >
                  Visualizar Proposta
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-4xl mx-auto space-y-8 pt-4"
          >
            <div className="text-center space-y-3">
              <p className="text-primary font-display tracking-[0.3em] uppercase text-[10px]">Diagnóstico e Oportunidade</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">O Fim da Dependência do <span className="text-gradient-gold">Instagram</span></h2>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
                Perfis do Instagram criados para resultados são banidos constantemente pelas diretrizes da plataforma. A KrM Corp desenvolveu uma solução definitiva para {clientName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* O Problema */}
              <div className="bg-destructive/5 border border-destructive/20 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-destructive/20">
                  <ShieldAlert className="w-16 h-16" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] tracking-widest text-destructive uppercase font-bold">O Cenário Atual</span>
                  <h3 className="text-lg font-semibold font-display">Instabilidade no Instagram</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">✕</span>
                    <p>Contas e perfis bloqueados de forma recorrente</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">✕</span>
                    <p>Perda total do histórico de sorteios já realizados</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">✕</span>
                    <p>Dificuldade dos clientes finais em validar se ganharam</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold">✕</span>
                    <p>Sensação de amadorismo que afasta novos compradores</p>
                  </li>
                </ul>
              </div>

              {/* A Solução */}
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden glow-gold">
                <div className="absolute top-4 right-4 text-primary/20">
                  <Sparkles className="w-16 h-16" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] tracking-widest text-primary uppercase font-bold">A Solução KrM</span>
                  <h3 className="text-lg font-semibold font-display">Plataforma Independente</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <p className="text-foreground"><strong className="text-primary font-semibold">100% imune a bloqueios:</strong> O domínio próprio é seu, ninguém derruba.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <p className="text-foreground"><strong className="text-primary font-semibold">Duas abas objetivas:</strong> Exatamente o solicitado pelo seu cliente.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <p className="text-foreground"><strong className="text-primary font-semibold">Total transparência:</strong> Histórico de sorteios públicos e confiáveis.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <p className="text-foreground"><strong className="text-primary font-semibold">Credibilidade profissional:</strong> Valoriza o negócio de rifas.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full flex justify-between pt-4">
              <Button onClick={prevStep} variant="ghost" className="text-xs">
                Voltar
              </Button>
              <Button onClick={nextStep} variant="hero" size="lg" className="px-8 font-semibold text-sm">
                Ver Demonstração do Site
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-5xl mx-auto space-y-8 pt-4 w-full"
          >
            <div className="text-center space-y-2">
              <p className="text-primary font-display tracking-[0.3em] uppercase text-[10px]">Demonstração Interativa</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">Interface Simples e Prática</h2>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
                Veja uma simulação de como ficará o site {brandName} com as 2 abas funcionando.
              </p>
            </div>

            {/* Controle de Dispositivo e Abas */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full max-w-3xl">
              {/* Toggles de Dispositivo */}
              <div className="flex bg-muted/60 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setPreviewDevice("mobile")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${previewDevice === "mobile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Celular
                </button>
                <button 
                  onClick={() => setPreviewDevice("desktop")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${previewDevice === "desktop" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"}`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  Desktop
                </button>
              </div>

              {/* Toggles de Abas */}
              <div className="flex bg-muted/60 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setActiveTabPreview("resultados")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTabPreview === "resultados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"}`}
                >
                  <Video className="w-3.5 h-3.5" />
                  1ª Aba: Resultados
                </button>
                <button 
                  onClick={() => setActiveTabPreview("premiados")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTabPreview === "premiados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"}`}
                >
                  <Award className="w-3.5 h-3.5" />
                  2ª Aba: Bilhetes Premiados
                </button>
              </div>
            </div>

            {/* Simulação do Site */}
            <div className={`transition-all duration-300 w-full flex justify-center`}>
              <div className={`bg-[#0b0c10] border border-white/10 rounded-[30px] shadow-2xl relative overflow-hidden transition-all duration-300 ${
                previewDevice === "mobile" 
                  ? "w-full max-w-[340px] h-[520px] border-8 border-neutral-800" 
                  : "w-full max-w-3xl h-[420px]"
              }`}>
                {/* Header do Site Simulado */}
                <div className="bg-[#12141c] border-b border-white/5 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-display font-bold text-sm tracking-tight text-white">{brandName || "Rifas Corp"}</span>
                  </div>
                  <div className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-semibold">
                    Resultados Oficiais
                  </div>
                </div>

                {/* Abas Internas do Site Simulado */}
                <div className="flex border-b border-white/5 bg-[#0f1118]">
                  <button 
                    onClick={() => setActiveTabPreview("resultados")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-all ${
                      activeTabPreview === "resultados" 
                        ? "text-primary border-b-2 border-primary bg-primary/5" 
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    Resultados (Vídeos)
                  </button>
                  <button 
                    onClick={() => setActiveTabPreview("premiados")}
                    className={`flex-1 py-2 text-center text-xs font-medium transition-all ${
                      activeTabPreview === "premiados" 
                        ? "text-primary border-b-2 border-primary bg-primary/5" 
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    Bilhetes Premiados
                  </button>
                </div>

                {/* Conteúdo do Site Simulado */}
                <div className="p-4 overflow-y-auto h-[calc(100%-88px)] space-y-4 text-left">
                  {activeTabPreview === "resultados" ? (
                    <div className="space-y-3">
                      {/* Vídeo 1 */}
                      <div className="bg-[#151821] rounded-xl border border-white/5 p-3 flex gap-3 items-center">
                        <div className="w-16 h-12 bg-neutral-800 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden shrink-0">
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white uppercase">Assistir</span>
                          </div>
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-semibold text-white truncate">Sorteio CG 160 Fan Okm</h4>
                          <p className="text-[9px] text-muted-foreground mt-0.5">Sorteado em: 05/07/2026</p>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full mt-1 inline-block font-medium">Concluído</span>
                        </div>
                      </div>

                      {/* Vídeo 2 */}
                      <div className="bg-[#151821] rounded-xl border border-white/5 p-3 flex gap-3 items-center">
                        <div className="w-16 h-12 bg-neutral-800 rounded-lg flex items-center justify-center relative shrink-0">
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-semibold text-white truncate">Sorteio R$ 10.000 no Pix</h4>
                          <p className="text-[9px] text-muted-foreground mt-0.5">Sorteado em: 28/06/2026</p>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full mt-1 inline-block font-medium">Concluído</span>
                        </div>
                      </div>

                      {/* Vídeo 3 */}
                      <div className="bg-[#151821] rounded-xl border border-white/5 p-3 flex gap-3 items-center">
                        <div className="w-16 h-12 bg-neutral-800 rounded-lg flex items-center justify-center relative shrink-0">
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-semibold text-white truncate">Sorteio iPhone 15 Pro Max</h4>
                          <p className="text-[9px] text-muted-foreground mt-0.5">Sorteado em: 15/06/2026</p>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full mt-1 inline-block font-medium">Concluído</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Busca Exclusiva Plano Pro */}
                      <div className="bg-[#151821] rounded-xl border border-primary/20 p-3 space-y-2">
                        <div className="text-[9px] uppercase tracking-wider text-primary font-bold flex justify-between">
                          <span>Módulo de Busca Premiada</span>
                          <span className="text-white/60">Recurso do Plano Pro</span>
                        </div>
                        <div className="flex gap-2">
                          <Input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Digite seu bilhete (Ex: 123456)" 
                            className="bg-black/40 border-white/5 text-[10px] h-7 px-2"
                          />
                          <Button onClick={handleDemoSearch} className="h-7 text-[10px] px-3 bg-primary text-black hover:bg-primary/80">
                            Buscar
                          </Button>
                        </div>
                        {searchResult && (
                          <div className={`text-[9px] font-medium p-1.5 rounded ${
                            searchResult.startsWith("🎉") ? "bg-emerald-500/10 text-emerald-400" : "bg-destructive/10 text-destructive-foreground"
                          }`}>
                            {searchResult}
                          </div>
                        )}
                      </div>

                      {/* Lista de Premiados */}
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">Lista de Ganhadores Recentes</span>
                        
                        <div className="bg-[#12141c] rounded-lg border border-white/5 p-2.5 flex justify-between items-center text-[10px]">
                          <div>
                            <div className="font-semibold text-white">Marcos Silva</div>
                            <div className="text-muted-foreground text-[8px]">Bilhete: #123456 • Moto CG 160 Fan</div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-primary font-bold">Premiado!</span>
                            <div className="text-muted-foreground text-[8px]">05/07/2026</div>
                          </div>
                        </div>

                        <div className="bg-[#12141c] rounded-lg border border-white/5 p-2.5 flex justify-between items-center text-[10px]">
                          <div>
                            <div className="font-semibold text-white">Renata Souza</div>
                            <div className="text-muted-foreground text-[8px]">Bilhete: #859403 • R$ 10.000 no Pix</div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-primary font-bold">Premiado!</span>
                            <div className="text-muted-foreground text-[8px]">28/06/2026</div>
                          </div>
                        </div>

                        <div className="bg-[#12141c] rounded-lg border border-white/5 p-2.5 flex justify-between items-center text-[10px]">
                          <div>
                            <div className="font-semibold text-white">Carlos Eduardo</div>
                            <div className="text-muted-foreground text-[8px]">Bilhete: #000123 • iPhone 15 Pro Max</div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-primary font-bold">Premiado!</span>
                            <div className="text-muted-foreground text-[8px]">15/06/2026</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Painel Admin Info */}
            <div className="bg-[#151821]/50 border border-white/5 rounded-3xl p-6 max-w-3xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm">Atualize Pelo Celular</h4>
                <p className="text-xs text-muted-foreground font-light">Você acessa uma área administrativa simples, digita os dados do ganhador, salva e pronto. Atualizado em tempo real.</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Video className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm">Vídeos Leves e Rápidos</h4>
                <p className="text-xs text-muted-foreground font-light">Suporte a links de vídeo externos ou player direto. Os vídeos carregam rápido no celular do seu cliente sem travar.</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Search className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm">Busca Otimizada (Pro)</h4>
                <p className="text-xs text-muted-foreground font-light">Evita que o cliente mande mensagem perguntando quem ganhou. Ele mesmo pesquisa e vê o resultado em 2 segundos.</p>
              </div>
            </div>

            <div className="w-full flex justify-between pt-4">
              <Button onClick={prevStep} variant="ghost" className="text-xs text-muted-foreground hover:text-white">
                Voltar
              </Button>
              <Button onClick={nextStep} variant="hero" size="lg" className="px-8 font-semibold text-sm">
                Conhecer os Planos e Valores
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-4xl mx-auto space-y-8 pt-4 w-full"
          >
            <div className="text-center space-y-3">
              <p className="text-primary font-display tracking-[0.3em] uppercase text-[10px]">Investimento Sem Segredos</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">Tabela de Planos e <span className="text-gradient-gold">Diferenciais</span></h2>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto font-light">
                Escolha a opção ideal para a plataforma {brandName}. Ambos os planos possuem design premium com a identidade de sua marca.
              </p>
            </div>

            {/* Planos Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl pt-4">
              {/* Plano Essencial */}
              <div 
                onClick={() => setSelectedPlan("essencial")}
                className={`bg-card/20 border rounded-3xl p-6 sm:p-8 space-y-6 text-left cursor-pointer transition-all duration-300 relative ${
                  selectedPlan === "essencial" 
                    ? "border-primary/60 bg-[#161821]/80 ring-2 ring-primary/20 scale-[1.02]" 
                    : "border-white/5 hover:border-white/20 opacity-70 hover:opacity-100"
                }`}
              >
                {selectedPlan === "essencial" && (
                  <div className="absolute top-4 right-4 bg-primary/10 border border-primary/30 text-primary text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                    Selecionado
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display">Plano Start</h3>
                  <p className="text-xs text-muted-foreground">O essencial para manter os resultados seguros e acessíveis sem bloqueios.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-light">Valor de Desenvolvimento:</div>
                  <div className="text-3xl font-bold text-white font-display">R$ 1.300,00</div>
                  <div className="text-xs text-primary font-semibold">Hospedagem & Suporte: R$ 89,00 /mês</div>
                </div>

                <div className="line-gold" />

                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Site customizado no seu domínio próprio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Aba 1: Vídeos de Resultados dos Sorteios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Aba 2: Listagem de Ganhadores e Prêmios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Painel Administrativo para celular e desktop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Suporte e Manutenção da KrM Corp</span>
                  </li>
                </ul>
              </div>

              {/* Plano Pro */}
              <div 
                onClick={() => setSelectedPlan("pro")}
                className={`bg-[#161821]/30 border rounded-3xl p-6 sm:p-8 space-y-6 text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  selectedPlan === "pro" 
                    ? "border-primary bg-[#161821]/80 ring-2 ring-primary/30 scale-[1.02] glow-gold" 
                    : "border-white/5 hover:border-white/20 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="absolute top-4 right-4 bg-primary text-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                  Mais Recomendado
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display text-primary flex items-center gap-1.5">
                    Plano Pro
                  </h3>
                  <p className="text-xs text-muted-foreground">A experiência completa de busca interativa, mais profissional e voltada a fechar vendas.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-light">Valor de Desenvolvimento:</div>
                  <div className="text-3xl font-bold text-white font-display">R$ 1.900,00</div>
                  <div className="text-xs text-primary font-semibold">Hospedagem & Suporte: R$ 119,00 /mês</div>
                </div>

                <div className="line-gold" />

                <ul className="space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-white">Tudo do Plano Start</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-white"><strong>Busca Inteligente:</strong> Pesquisa por bilhete ou telefone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span><strong>Banners de Destaque:</strong> Para direcionar clientes a novas compras</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span><strong>Servidor Dedicado:</strong> Resposta ultra rápida e segura</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Timeline do Desenvolvimento */}
            <div className="bg-[#12141c]/40 border border-white/5 rounded-2xl p-6 max-w-3xl w-full space-y-4 text-left">
              <span className="text-[10px] tracking-widest text-primary uppercase font-bold">Processo de Desenvolvimento</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">1. Contratação</div>
                  <p className="text-[10px] text-muted-foreground leading-normal font-light">Definição do plano, nome do site e pagamento da entrada (50%).</p>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">2. Configuração</div>
                  <p className="text-[10px] text-muted-foreground leading-normal font-light">Registro de domínio e setup inicial do servidor e banco de dados.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">3. Criação</div>
                  <p className="text-[10px] text-muted-foreground leading-normal font-light">Design visual, implementação das abas e área de administração.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">4. Publicação</div>
                  <p className="text-[10px] text-muted-foreground leading-normal font-light">Testes finais, treinamento de uso e site no ar (prazo de 7 a 10 dias).</p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between pt-4">
              <Button onClick={prevStep} variant="ghost" className="text-xs text-muted-foreground hover:text-white">
                Voltar
              </Button>
              <Button onClick={nextStep} variant="hero" size="lg" className="px-8 font-semibold text-sm">
                Gerar Contrato em PDF
              </Button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8 min-h-[55vh] pt-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 glow-gold"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </motion.div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold">
                Orçamento <span className="text-gradient-gold">Finalizado</span>
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm font-light">
                A proposta personalizada para o projeto de <strong>{brandName} ({clientName})</strong> está estruturada e pronta.
              </p>
            </div>

            <div className="bg-[#12141c] border border-white/5 rounded-2xl p-5 w-full max-w-md text-left space-y-4 shadow-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Cliente:</span>
                <span className="font-semibold text-white">{clientName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Projeto:</span>
                <span className="font-semibold text-white">{brandName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Plano Selecionado:</span>
                <span className="font-semibold text-primary uppercase">{selectedPlan}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Custo de Desenvolvimento:</span>
                <span className="font-bold text-white text-sm">{selectedPlan === "pro" ? "R$ 1.900,00" : "R$ 1.300,00"}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Mensalidade:</span>
                <span className="font-bold text-primary">{selectedPlan === "pro" ? "R$ 119,00/mês" : "R$ 89,00/mês"}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 justify-center w-full max-w-md mt-4">
              <a 
                href={`https://wa.me/5538988450377?text=Ol%C3%A1%2C%20Carlos%20Eduardo.%20Gostei%20do%20or%C3%A7amento%20da%20Plataforma%20de%20Resultados%20para%20o%20projeto%20${encodeURIComponent(brandName)}%20(${encodeURIComponent(clientName)}).%20Gostaria%20de%20fechar%20no%20Plano%20${encodeURIComponent(selectedPlan.toUpperCase())}.%20Como%20damos%20o%20start%3F`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button size="lg" className="w-full py-7 text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-[0_0_20px_rgba(37,211,102,0.3)] flex gap-2 items-center justify-center font-bold">
                  Aceitar Proposta & Iniciar Projeto
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>

              <Button onClick={generateContractPDF} variant="hero-outline" size="sm" className="w-full py-4 flex gap-2 items-center justify-center text-xs font-semibold border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white">
                <Download className="w-3.5 h-3.5" />
                Baixar Cópia da Proposta em PDF
              </Button>
            </div>
            
            <div className="w-full flex justify-start pt-4">
              <Button onClick={prevStep} variant="ghost" className="text-xs text-muted-foreground hover:text-white">
                Voltar
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden text-foreground">
      {/* Decorative background glow elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-30" />
      
      <header className="w-full p-6 flex justify-between items-center z-10 relative max-w-6xl mx-auto">
        <a href="/" className="font-display text-2xl tracking-tighter group flex items-center">
          <span className="text-gradient-gold font-bold">KrM</span>
          <span className="text-muted-foreground/40 font-light ml-1">Corp</span>
        </a>
        <div className="text-xs text-muted-foreground bg-white/5 border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
          <FileText className="w-3.5 h-3.5 text-primary" />
          Orçamento Customizado
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative w-full">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer minimalista de progresso */}
      <footer className="w-full p-6 flex justify-center z-10 relative">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i} 
              disabled={i > step && (!clientName || !brandName)}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-primary/40' : 'w-4 bg-white/10'
              }`} 
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default RifasPresentation;
