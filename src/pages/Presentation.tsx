import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Image as ImageIcon, Video, Calendar, Layout, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Presentation = () => {
  const [step, setStep] = useState(0);
  const [bottleneck, setBottleneck] = useState("");

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
            className="flex flex-col items-center max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="line-gold mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl font-semibold">
              Olá, <span className="text-gradient-gold">Lessio</span>.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              O comportamento de compra no setor de materiais de construção mudou, e a atenção do seu público hoje está no digital. Preparamos este ambiente exclusivo para estruturarmos juntos o crescimento da <span className="text-primary font-medium">Isa Materiais de Construções</span> nos próximos 6 meses.
            </p>
            <div className="w-full bg-card/30 backdrop-blur-md border border-white/5 p-8 rounded-2xl text-left space-y-6">
              <p className="text-primary font-medium text-lg">
                Para que nosso planejamento seja o mais afiado possível, qual é hoje o principal gargalo que você observa nas vendas da loja física?
              </p>
              <Textarea
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                placeholder="Ex: Falta de orçamentos diários, dificuldade em atrair clientes novos..."
                className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50 text-base"
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
            className="flex flex-col items-center max-w-4xl mx-auto space-y-10"
          >
            <div className="text-center space-y-4">
              <p className="text-primary font-display tracking-widest uppercase text-xs">Fase 1: Tração (Mês 1 e 2)</p>
              <h2 className="font-display text-3xl font-semibold">Atração e <span className="text-gradient-gold">Volume</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                { icon: Target, title: "Meta Ads", desc: "Gestão Avançada" },
                { icon: ImageIcon, title: "10 Criativos", desc: "Estáticos Alta Conversão" },
                { icon: Video, title: "2 Vídeos", desc: "Edição Profissional" },
                { icon: Calendar, title: "Reuniões", desc: "Alinhamento Semanal" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 flex flex-col items-center text-center hover:border-primary/30 transition-all"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-card/30 border border-white/5 p-8 rounded-2xl max-w-2xl text-center space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nossa primeira fase é dedicada à Tração. Nos meses 1 e 2, o foco será aumentar exponencialmente a visibilidade da sua empresa e dominar a atenção do seu público local através da gestão avançada de Meta Ads, suportada por 12 peças criativas e alinhamento semanal.
              </p>
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <p className="text-primary font-medium text-sm">Investimento: R$ 1.500,00 mensais</p>
              </div>
              <p className="text-primary font-medium text-lg px-4">
                Essa estrutura inicial foi desenhada exatamente para garantir o aumento imediato de orçamentos diários no seu WhatsApp. Faz sentido iniciarmos a parceria atacando esse gargalo?
              </p>
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
            className="flex flex-col items-center max-w-4xl mx-auto space-y-10"
          >
            <div className="text-center space-y-4">
              <p className="text-primary font-display tracking-widest uppercase text-xs">Fase 2: Escala (Mês 3 a 6)</p>
              <h2 className="font-display text-3xl font-semibold">Centralização e <span className="text-gradient-gold">Conversão</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full items-stretch">
              {[
                { icon: Target, title: "Meta Ads" },
                { icon: ImageIcon, title: "10 Criativos" },
                { icon: Video, title: "2 Vídeos" },
                { icon: Calendar, title: "Reuniões" },
              ].map((item, i) => (
                <div key={i} className="bg-card/20 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70">
                  <item.icon className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <h3 className="font-medium text-xs">{item.title}</h3>
                </div>
              ))}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="col-span-2 md:col-span-1 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden glow-gold"
              >
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                <Layout className="w-8 h-8 text-primary mb-3 relative z-10" strokeWidth={1.5} />
                <h3 className="font-semibold text-sm mb-1 relative z-10">Landing Page</h3>
                <p className="text-[10px] text-primary/80 uppercase tracking-widest relative z-10">Alta Conversão</p>
              </motion.div>
            </div>

            <div className="bg-card/30 border border-white/5 p-8 rounded-2xl max-w-2xl text-center space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Com a base validada, entramos na fase de Escala a partir do 3º mês. Aqui, implementamos uma Landing Page focada em conversão, centralizando a atenção do cliente e qualificando o lead.
              </p>
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <p className="text-primary font-medium text-sm">Investimento: R$ 2.000,00 mensais</p>
              </div>
              <p className="text-primary font-medium text-lg px-4">
                Você concorda que ter um ativo digital rodando 24 horas por dia, exclusivo para a Isa Materiais, é o diferencial que falta contra a concorrência?
              </p>
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
            <div className="w-full relative py-8 px-4">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary -translate-y-1/2 rounded-full" />
              
              <div className="relative flex justify-between items-center w-full">
                {[1, 2, 3, 4, 5, 6].map((month) => (
                  <div key={month} className="flex flex-col items-center gap-3">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: month * 0.1 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        month <= 2 ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(212,175,55,0.5)]'
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
              <p className="text-muted-foreground text-lg leading-relaxed">
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

            <p className="text-muted-foreground text-lg leading-relaxed">
              A estratégia está mapeada e o roteiro para escalar a <span className="text-primary font-medium">Isa Materiais de Construções</span> está claro. Com o plano de ação validado, podemos confirmar o início do projeto agora mesmo para iniciarmos a construção desse ecossistema e liberarmos o cronograma de integração?
            </p>

            <a 
              href="https://wa.me/5538988450377?text=Ol%C3%A1%2C%20estou%20pronto%20para%20iniciar%20o%20projeto%20da%20Isa%20Materiais!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto mt-8"
            >
              <Button variant="hero" size="lg" className="px-12 py-8 text-lg w-full">
                Confirmar e Iniciar Projeto
              </Button>
            </a>
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
