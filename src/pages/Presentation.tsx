import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Image as ImageIcon, Video, Calendar, Layout, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";

const MetaIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8.5 9.5c-1.5 0-3 1.25-3 2.5s1.5 2.5 3 2.5 2.5-1.25 3.5-2.5 2-2.5 3.5-2.5 3 1.25 3 2.5-1.5 2.5-3 2.5-2.5-1.25-3.5-2.5-2-2.5-3.5-2.5z" />
  </svg>
);

const Presentation = () => {
  const [step, setStep] = useState(0);
  const [bottleneck, setBottleneck] = useState("");
  const [pdfGenerated, setPdfGenerated] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const generateContractPDF = () => {
    const doc = new jsPDF();
    
    // Fundo Escuro (Dark Mode)
    doc.setFillColor(15, 15, 15); // Cor de fundo semelhante ao bg-background
    doc.rect(0, 0, 210, 297, "F");

    // Cores
    const colorGold = [212, 175, 55] as [number, number, number];
    const colorWhite = [240, 240, 240] as [number, number, number];
    const colorMuted = [160, 160, 160] as [number, number, number];

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...colorGold);
    doc.text("KrM Corp", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorWhite);
    doc.text("Proposta Comercial & Contrato de Prestação de Serviços", 105, 30, { align: "center" });
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(...colorGold);
    doc.line(20, 35, 190, 35);
    
    // Dados do Cliente
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text("Cliente:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorWhite);
    doc.text("Isa Materiais de Construções (A/C Lessio)", 40, 50);
    
    // Diagnóstico
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text("1. Diagnóstico do Cenário Atual", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorMuted);
    const splitBottleneck = doc.splitTextToSize(bottleneck || "Não informado na plataforma.", 170);
    doc.text(splitBottleneck, 20, 80);
    
    const yAfterBottleneck = 80 + (splitBottleneck.length * 7);
    
    // Escopo do Projeto
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text("2. Escopo do Projeto (Ciclo de 6 Meses)", 20, yAfterBottleneck + 10);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorWhite);
    doc.text("FASE 1: Tração (Mês 1 e 2)", 20, yAfterBottleneck + 20);
    doc.setTextColor(...colorMuted);
    doc.text("- Gestão Avançada de Meta Ads (Instagram & Facebook)", 25, yAfterBottleneck + 30);
    doc.text("- Produção de 10 Criativos Estáticos e 2 Vídeos Profissionais", 25, yAfterBottleneck + 37);
    doc.text("- Alinhamento Estratégico Semanal", 25, yAfterBottleneck + 44);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text("Honorários Fase 1: R$ 1.500,00 mensais", 25, yAfterBottleneck + 54);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorWhite);
    doc.text("FASE 2: Escala (Mês 3 ao 6)", 20, yAfterBottleneck + 74);
    doc.setTextColor(...colorMuted);
    doc.text("- Todos os serviços da Fase 1", 25, yAfterBottleneck + 84);
    doc.text("- Desenvolvimento e Manutenção de Landing Page de Alta Conversão", 25, yAfterBottleneck + 91);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colorGold);
    doc.text("Honorários Fase 2: R$ 2.000,00 mensais", 25, yAfterBottleneck + 101);
    
    // Verba de Mídia
    doc.setTextColor(...colorGold);
    doc.text("3. Verba de Mídia Obrigatória", 20, yAfterBottleneck + 121);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colorMuted);
    const mediaText = "O cliente compromete-se a investir um valor mínimo de R$ 30,00 diários em mídia paga. Este valor é repassado diretamente às plataformas (Meta Ads) e não compõe os honorários da KrM Corp.";
    const splitMedia = doc.splitTextToSize(mediaText, 170);
    doc.text(splitMedia, 20, yAfterBottleneck + 131);
    
    // Assinaturas
    const yAssinatura = 260;
    doc.setLineWidth(0.5);
    doc.setDrawColor(...colorGold);
    doc.line(20, yAssinatura, 90, yAssinatura);
    doc.setTextColor(...colorWhite);
    doc.text("KrM Corp", 45, yAssinatura + 10, { align: "center" });
    
    doc.line(110, yAssinatura, 190, yAssinatura);
    doc.text("Isa Materiais de Construções", 150, yAssinatura + 10, { align: "center" });
    
    doc.save("Contrato_Isa_Materiais.pdf");
    setPdfGenerated(true);
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
            className="flex flex-col items-center max-w-xl mx-auto text-center space-y-12 pt-8 sm:pt-0"
          >
            <div className="space-y-4">
              <div className="line-gold mx-auto mb-6" />
              <h1 className="font-display text-4xl md:text-5xl font-semibold mb-2">
                Olá, <span className="text-gradient-gold">Lessio</span>.
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-[1.8] font-light">
                O comportamento de compra no setor de materiais de construção mudou, e a atenção do seu público hoje está no digital. Preparamos este ambiente exclusivo para estruturarmos juntos o crescimento da <span className="text-primary">Isa Materiais de Construções</span> nos próximos 6 meses.
              </p>
            </div>

            <div className="w-full bg-card/20 backdrop-blur-xl border border-white/5 p-6 sm:p-10 rounded-3xl text-left space-y-8 shadow-2xl">
              <p className="text-primary font-medium text-base sm:text-lg leading-relaxed">
                Para que nosso planejamento seja o mais afiado possível, qual é hoje o principal gargalo que você observa nas vendas da loja física?
              </p>
              <Textarea
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                placeholder="Ex: Falta de orçamentos diários, dificuldade em atrair clientes novos..."
                className="min-h-[140px] bg-background/40 border-white/10 focus:border-primary/50 text-sm sm:text-base p-4"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={nextStep} 
                  variant="hero" 
                  size="lg" 
                  disabled={bottleneck.length < 5}
                  className="px-8"
                >
                  Avançar
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
            className="flex flex-col items-center max-w-4xl mx-auto space-y-12 pt-8 sm:pt-0"
          >
            <div className="text-center space-y-4">
              <p className="text-primary font-display tracking-[0.3em] uppercase text-[10px]">Fase 1: Tração (Mês 1 e 2)</p>
              <h2 className="font-display text-3xl font-semibold">Atração e <span className="text-gradient-gold">Volume</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full px-2 sm:px-0">
              {[
                { icon: MetaIcon, title: "Meta Ads", desc: "Instagram & Facebook" },
                { icon: ImageIcon, title: "10 Criativos", desc: "Estáticos Alta Conversão" },
                { icon: Video, title: "2 Vídeos", desc: "Edição Profissional" },
                { icon: Calendar, title: "Reuniões", desc: "Alinhamento Semanal" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center hover:border-primary/30 transition-all"
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" strokeWidth={1.5} />
                  <h3 className="font-semibold text-xs sm:text-sm mb-1">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-card/20 border border-white/5 p-6 sm:p-10 rounded-3xl max-w-2xl text-center space-y-10">
              <p className="text-muted-foreground text-sm sm:text-base leading-[1.8] font-light">
                Nossa primeira fase é dedicada à Tração. Nos meses 1 e 2, o foco será aumentar exponencialmente a visibilidade da sua empresa e dominar a atenção do seu público local através da gestão avançada de Meta Ads, suportada por 12 peças criativas e alinhamento semanal.
              </p>

              <div className="bg-background/40 border border-white/5 rounded-2xl p-6 text-left space-y-5 my-8">
                <h4 className="text-primary font-medium text-[10px] tracking-[0.3em] uppercase">Estratégia de Mídia (Mín. R$30/dia)</h4>
                <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground/80">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p><strong className="text-foreground font-medium">1 Campanha de Seguidores:</strong> Para aumentar a base e qualificar o público da região (R$10/dia).</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p><strong className="text-foreground font-medium">1 Campanha de Alcance:</strong> Para dominar a presença local e estar sempre visível (R$10/dia).</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p><strong className="text-foreground font-medium">1 Campanha de Mensagens:</strong> Focada na geração ativa de orçamentos e receita no WhatsApp (R$10/dia).</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="inline-block px-5 py-3 bg-primary/10 border border-primary/20 rounded-full">
                  <p className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">Honorários KrM: R$ 1.500,00 /mês</p>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">† Verba de mídia (ads) paga diretamente às plataformas</p>
                <p className="text-primary font-medium text-base sm:text-lg px-4 leading-relaxed">
                  Essa estrutura inicial foi desenhada exatamente para garantir o aumento imediato de orçamentos diários no seu WhatsApp. Faz sentido iniciarmos a parceria atacando esse gargalo?
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button onClick={nextStep} variant="hero" size="lg" className="w-full sm:w-auto">
                  Faz sentido, é o que preciso
                </Button>
                <Button onClick={nextStep} variant="hero-outline" size="lg" className="w-full sm:w-auto">
                  Gostaria de escalar ainda mais rápido
                </Button>
              </div>
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
            className="flex flex-col items-center max-w-4xl mx-auto space-y-12 pt-8 sm:pt-0"
          >
            <div className="text-center space-y-4">
              <p className="text-primary font-display tracking-[0.3em] uppercase text-[10px]">Fase 2: Escala (Mês 3 a 6)</p>
              <h2 className="font-display text-3xl font-semibold">Centralização e <span className="text-gradient-gold">Conversão</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 w-full items-stretch px-2 sm:px-0">
              {[
                { icon: MetaIcon, title: "Meta Ads" },
                { icon: ImageIcon, title: "10 Criativos" },
                { icon: Video, title: "2 Vídeos" },
                { icon: Calendar, title: "Reuniões" },
              ].map((item, i) => (
                <div key={i} className="bg-card/20 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center opacity-70">
                  <item.icon className="w-5 h-5 text-primary mb-2" strokeWidth={1.5} />
                  <h3 className="font-medium text-[10px]">{item.title}</h3>
                </div>
              ))}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="col-span-2 md:col-span-1 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden glow-gold"
              >
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                <Layout className="w-8 h-8 text-primary mb-2 relative z-10" strokeWidth={1.5} />
                <h3 className="font-semibold text-xs mb-1 relative z-10">Landing Page</h3>
                <p className="text-[8px] text-primary/80 uppercase tracking-widest relative z-10">Alta Conversão</p>
              </motion.div>
            </div>

            <div className="bg-card/20 border border-white/5 p-6 sm:p-10 rounded-3xl max-w-2xl text-center space-y-10">
              <p className="text-muted-foreground text-sm sm:text-base leading-[1.8] font-light">
                Com a base validada, entramos na fase de Escala a partir do 3º mês. Aqui, implementamos uma Landing Page focada em conversão, centralizando a atenção do cliente e qualificando o lead.
              </p>
              <div className="space-y-6">
                <div className="inline-block px-5 py-3 bg-primary/10 border border-primary/20 rounded-full">
                  <p className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">Honorários KrM: R$ 2.000,00 /mês</p>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">† Verba de mídia (ads) paga diretamente às plataformas</p>
                <p className="text-primary font-medium text-base sm:text-lg px-4 leading-relaxed">
                  Você concorda que ter um ativo digital rodando 24 horas por dia, exclusivo para a Isa Materiais, é o diferencial que falta contra a concorrência?
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <Button onClick={nextStep} variant="hero" size="lg" className="px-10">
                  Concordo, é o próximo passo
                </Button>
              </div>
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
            className="flex flex-col items-center max-w-3xl mx-auto space-y-12 text-center"
          >
            <div className="space-y-4">
              <div className="line-gold mx-auto mb-4" />
              <h2 className="font-display text-3xl font-semibold">Alinhamento de <span className="text-gradient-gold">Prazo</span></h2>
            </div>

            {/* Timeline Visual */}
            <div className="w-full relative py-12 px-4">
              <div className="absolute top-[60px] left-0 right-0 h-0.5 bg-white/5 rounded-full" />
              <div className="absolute top-[60px] left-0 w-full h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary rounded-full" />
              
              <div className="relative flex justify-between items-start w-full">
                {[1, 2, 3, 4, 5, 6].map((month) => (
                  <div key={month} className="flex flex-col items-center gap-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: month * 0.1 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                        month <= 2 ? 'bg-background border-2 border-primary/50 text-primary' : 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                      }`}
                    >
                      {month}
                    </motion.div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium hidden sm:block">
                      Mês {month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between w-full mt-6 text-xs text-primary/70 uppercase tracking-widest font-semibold px-2">
                <span>Tração</span>
                <span>Escala e Maturação</span>
              </div>
            </div>

            <div className="space-y-8 bg-card/30 p-8 rounded-2xl border border-white/5">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Para que os algoritmos trabalhem a favor do seu caixa e o desenvolvimento web atinja seu potencial máximo, nossa parceria é firmada em um ciclo de <span className="text-primary font-medium">6 meses</span>. Esse tempo é vital para transformar dados brutos em lucro previsível.
              </p>
              <p className="text-primary font-medium text-lg px-4">
                Podemos avançar com esse compromisso de médio prazo para consolidar seus resultados?
              </p>
              <Button onClick={nextStep} variant="hero" size="lg" className="px-12 mt-4">
                Podemos avançar
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
            className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-10 min-h-[50vh]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 glow-gold"
            >
              <CheckCircle2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </motion.div>

            <h2 className="font-display text-4xl font-semibold">
              Estratégia <span className="text-gradient-gold">Validada</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              A estratégia está mapeada e o roteiro para escalar a <span className="text-primary font-medium">Isa Materiais de Construções</span> está claro. Com o plano de ação validado, podemos confirmar o início do projeto agora mesmo para iniciarmos a construção desse ecossistema e liberarmos o cronograma de integração?
            </p>

            {!pdfGenerated ? (
              <Button onClick={generateContractPDF} variant="hero" size="lg" className="px-12 py-8 text-lg w-full sm:w-auto mt-8 flex gap-3">
                <Download className="w-5 h-5" />
                Gerar Contrato em PDF
              </Button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center mt-8 space-y-4 w-full"
              >
                <p className="text-sm text-primary font-medium">Contrato gerado com sucesso!</p>
                <a 
                  href="https://wa.me/5538988450377?text=Ol%C3%A1%2C%20baixei%20o%20contrato%20da%20Isa%20Materiais%20e%20estou%20de%20acordo%20com%20a%20proposta.%20Segue%20o%20documento%20assinado%20em%20anexo." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="px-12 py-8 text-lg w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                    Enviar Aceite no WhatsApp
                  </Button>
                </a>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Elementos de background subtis parecidos com a home */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <header className="w-full p-6 flex justify-center z-10 relative">
        <a href="/" className="font-display text-2xl tracking-tighter group">
          <span className="text-gradient-gold font-bold">KrM</span>
          <span className="text-muted-foreground/40 font-light ml-1">Corp</span>
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 relative">
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
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-primary/50' : 'w-4 bg-white/10'
              }`} 
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Presentation;
