import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Printer, 
  HelpCircle, 
  UserCheck, 
  DollarSign, 
  Inbox, 
  Eye, 
  BookOpen, 
  FileText, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  Info,
  ShieldCheck,
  Car
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Interface para os scripts de mensagens
interface ScriptTemplate {
  title: string;
  badge: string;
  label: string;
  colorClass: string;
  borderClass: string;
  icon: any;
  criteria: string;
  action: string;
  message: string;
}

export default function Onboarding() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [simulatorStep, setSimulatorStep] = useState<string>("init");

  // Scripts de Mensagens Padrão - Alinhados com a Solution Place (Blindadora Premium RJ)
  const scripts: ScriptTemplate[] = [
    {
      title: "1. Lead Recém-Chegado",
      badge: "Entrada de Lead",
      label: "Sem Etiqueta / Sem Rótulo",
      colorClass: "from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/20",
      borderClass: "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
      icon: Inbox,
      criteria: "O cliente de alto padrão entrou em contato via WhatsApp solicitando cotação de blindagem para um carro específico ou perguntando sobre veículos blindados em estoque.",
      action: "NÃO aplicar nenhuma etiqueta. Iniciar imediatamente o protocolo de recepção de altíssimo padrão, coletando dados críticos (modelo, ano e urgência da cotação).",
      message: "Olá! Seja muito bem-vindo(a) à Solution Place, referência em blindagem de alta performance para veículos premium no Rio de Janeiro. \n\nMe chamo [Seu Nome] e será uma honra conduzir o seu atendimento personalizado. Para que eu possa entender melhor a sua necessidade de segurança e apresentar o projeto ideal para a sua proteção, poderia me informar o seu nome e qual o modelo e o ano do veículo que deseja blindar?"
    },
    {
      title: "2. Lead Qualificado",
      badge: "Direcionado ao Comercial",
      label: "Adicionar à Lista / Etiqueta: Novo cliente",
      colorClass: "from-amber-500/20 to-yellow-500/5 text-primary border-primary/20",
      borderClass: "border-primary/30 shadow-[0_0_15px_rgba(217,119,6,0.1)]",
      icon: UserCheck,
      criteria: "O cliente forneceu as informações do veículo (ex: Porsche Cayenne, Volvo XC90, SW4, Hilux), demonstrou real interesse na blindagem Nível III-A e aceitou receber uma proposta comercial técnica ou agendar uma visita à fábrica.",
      action: "Adicionar o contato à Lista de Transmissão comercial ('Leads Qualificados') e aplicar a etiqueta 'Novo cliente' (cor amarela/dourada). Encaminhar a cotação estruturada para o consultor de contas premium.",
      message: "Excelente, [Nome do Cliente]! O [Modelo do Veículo] é um veículo espetacular e merece o máximo padrão de engenharia de segurança e acabamento acústico que oferecemos aqui na Solution Place. \n\nAcabei de direcionar a ficha técnica do seu projeto para o nosso consultor especialista. Ele entrará em contato em breve para apresentar a sua cotação formalizada Nível III-A e tirar qualquer dúvida sobre a nossa tecnologia de proteção certificada. \n\nAdicionei seu contato à nossa lista exclusiva de novos clientes prioritários para garantir que você receba um atendimento com a máxima agilidade!"
    },
    {
      title: "3. Lead Convertido (Fechou Contrato)",
      badge: "Venda Concluída",
      label: "Etiqueta: Pago",
      colorClass: "from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/20",
      borderClass: "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      icon: DollarSign,
      criteria: "O cliente de alto padrão aprovou o orçamento da blindagem, assinou o contrato de prestação de serviços e enviou o comprovante de pagamento de sinal, Pix ou entrada de faturamento.",
      action: "MUDAR a etiqueta de 'Novo cliente' para 'Pago' (cor verde) no WhatsApp. Remover o contato da lista comercial, inseri-lo na lista de clientes ativos da fábrica e notificar imediatamente os times de Engenharia, Compras de Materiais (vidros balísticos/aramida) e Planejamento de Produção.",
      message: "Parabéns e seja muito bem-vindo(a) à Solution Place! 🎉 \n\nÉ um privilégio e uma grande responsabilidade cuidar da sua proteção e da sua família. Confirmamos o recebimento e o seu pagamento foi validado com sucesso. \n\nA partir deste momento, nosso departamento de Engenharia e Produção já foi acionado e está preparando o cronograma sob medida do seu [Modelo do Veículo]. Entraremos em contato nas próximas horas para alinhar a data de recebimento do veículo na fábrica e a emissão da documentação junto ao Exército. \n\nEstamos à sua total disposição!"
    }
  ];

  // Função para Copiar Texto
  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Mensagem copiada para a área de transferência!");
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Cenários do Simulador - Alinhados com a Solution Place
  const simulatorScenarios = [
    {
      id: "new_lead",
      question: "O cliente acabou de mandar no WhatsApp: 'Gostaria de saber o valor para blindar uma Hilux GR-Sport 2026'.",
      state: "Lead Recém-Chegado",
      label: "Sem Etiqueta",
      tip: "Inicie o protocolo de atendimento acolhedor e premium. O foco é obter o nome e confirmar o ano/modelo exato antes de encaminhar.",
      scriptIndex: 0
    },
    {
      id: "qualified_lead",
      question: "O cliente informou que deseja blindar um Porsche Macan, confirmou que busca a blindagem com vidros de 19mm e eu agendei o envio da cotação formal pelo consultor.",
      state: "Lead Qualificado",
      label: "Novo cliente (Adicionar à Lista)",
      tip: "Adicione à lista comercial e marque a etiqueta 'Novo cliente'. Isso avisa o consultor especialista a entrar em contato com urgência e aciona a régua de acompanhamento comercial.",
      scriptIndex: 1
    },
    {
      id: "paid_lead",
      question: "O cliente aprovou o orçamento de R$ 95 mil para blindar a SW4, assinou o contrato digital e enviou o comprovante do sinal de 50%.",
      state: "Lead Convertido (Pago)",
      label: "Pago",
      tip: "Altere a etiqueta para 'Pago'. Notifique IMEDIATAMENTE a Engenharia e o PCP da fábrica de blindagem no RJ para dar início à compra de materiais (vidros, aramida, aço) e agendar o veículo.",
      scriptIndex: 2
    }
  ];

  const currentScenario = simulatorScenarios.find(s => s.id === simulatorStep);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden font-body pb-24">
      {/* Estilos CSS Embutidos para Impressão PDF */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card {
            border: 2px solid #e2e8f0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            break-inside: avoid;
            page-break-inside: avoid;
            border-radius: 8px !important;
            margin-bottom: 20px !important;
            padding: 20px !important;
          }
          .print-title {
            color: #0d1527 !important;
            font-size: 20pt !important;
            font-weight: bold !important;
          }
          .print-subtitle {
            color: #475569 !important;
            font-size: 12pt !important;
          }
          .print-badge {
            border: 1px solid #94a3b8 !important;
            color: #0f172a !important;
            background: #f1f5f9 !important;
            font-weight: bold !important;
          }
          .print-page-break {
            page-break-before: always;
            height: 0;
            margin: 0;
            border: none;
          }
          .print-mindmap {
            max-width: 100% !important;
            border: 1px solid #cbd5e1 !important;
            margin: 20px 0 !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Grid Decorativo Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none no-print" />
      
      {/* Gradientes de Luz */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none no-print" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none no-print" />

      {/* Navegação / Topbar */}
      <div className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-40 no-print">
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-foreground hover:text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 glow-gold"
          >
            <Printer size={14} />
            Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container max-w-5xl mx-auto px-6 pt-12 print-container">
        
        {/* Header da Página */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-10 border-b border-white/5 pb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 no-print">
            <ShieldCheck size={12} className="text-primary" />
            Solution Place · Blindados de Alto Padrão
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-2 print-title whitespace-nowrap">
            Onboard - Qualificação Comercial de <span className="text-gradient-gold">Leads WhatsApp</span>
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 items-center justify-between bg-card/40 border border-white/5 p-4 rounded-lg no-print">
            <div className="flex items-start gap-3 max-w-xl">
              <Info className="text-primary shrink-0 mt-1" size={18} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Protocolo Premium:</strong> Veículos de alto padrão exigem atendimento impecável. A etiquetagem precisa auxilia no treinamento do algoritmo para qualificação crescendo dos leads de entrada.
              </p>
            </div>
            <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded">
              Solution Place RJ
            </div>
          </div>
        </motion.div>

        {/* 1. SEÇÃO DO MAPA MENTAL */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 print-section"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg border border-primary/20 text-primary">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">1. Fluxograma e Mapa Mental de Decisão</h2>
            </div>
            
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 no-print">
              <Eye size={12} />
              Clique para expandir
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center bg-card/30 border border-white/5 p-6 md:p-8 rounded-xl backdrop-blur-sm print-card">
            
            {/* Imagem do Mapa Mental com Dialog de Zoom */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-lg border border-white/10 bg-black/40 p-2 cursor-pointer transition-all duration-300 hover:border-primary/50">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative">
                    <img 
                      src="/whatsapp_onboarding_map.png" 
                      alt="Mapa Mental de Etiquetagem WhatsApp Solution Place" 
                      className="w-full h-auto rounded object-cover transition-transform duration-500 group-hover:scale-[1.01] print-mindmap"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center no-print">
                      <span className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Eye size={14} />
                        Visualizar em Tela Cheia
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-background/95 border-white/10 p-2">
                  <img 
                    src="/whatsapp_onboarding_map.png" 
                    alt="Mapa Mental de Etiquetagem WhatsApp Solution Place - Tela Cheia" 
                    className="w-full h-auto rounded"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Resumo do Fluxo */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="text-primary">✦</span> Fluxo de Proteção Premium
              </h3>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                Assegura o rastreamento perfeito de cada projeto de blindagem (SW4, Defender, Porsche, etc.) na fábrica do Rio de Janeiro.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 block shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">Entrada (Sem Etiqueta)</p>
                    <p className="text-muted-foreground text-[10px]">Identificação do veículo/ano</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-2 rounded">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary block shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">Novo cliente</p>
                    <p className="text-muted-foreground text-[10px]">Cotação III-A ativa com o consultor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-2 rounded">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">Pago</p>
                    <p className="text-muted-foreground text-[10px]">Contrato assinado + Sinal ➡️ Engenharia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="print-page-break" />

        {/* 2. OS TRÊS ESTADOS DE ETIQUETA / SCRIPTS */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 print-section"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20 text-primary">
              <FileText size={20} />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">2. Ações de Etiquetagem & Scripts de Mensagem</h2>
          </div>

          <div className="space-y-8">
            {scripts.map((script, idx) => {
              const IconComponent = script.icon;
              return (
                <div 
                  key={idx}
                  className={`bg-card/40 border p-6 md:p-8 rounded-xl backdrop-blur-sm transition-all duration-300 print-card ${script.borderClass}`}
                >
                  {/* Cabeçalho do Card */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${script.colorClass.split(' ')[0]} border border-white/10 shrink-0`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{script.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border print-badge bg-white/5`}>
                            {script.badge}
                          </span>
                          <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded">
                            {script.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalhes de Critério e Ação */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6 text-xs text-muted-foreground">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <h4 className="font-bold text-foreground uppercase tracking-widest text-[9px] mb-2 text-primary">Quando usar (Critérios):</h4>
                      <p className="leading-relaxed">{script.criteria}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <h4 className="font-bold text-foreground uppercase tracking-widest text-[9px] mb-2 text-primary">Ação de Etiquetagem:</h4>
                      <p className="leading-relaxed font-semibold text-foreground">{script.action}</p>
                    </div>
                  </div>

                  {/* Bloco de Mensagem / Script */}
                  <div className="bg-black/30 border border-white/10 rounded-lg p-5 relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <MessageSquare size={10} />
                        Script de WhatsApp Recomendado
                      </span>
                      <button 
                        onClick={() => handleCopyText(script.message, idx)}
                        className="no-print flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary bg-white/5 hover:bg-white/10 border border-white/5 px-2.5 py-1 rounded transition-all"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            Copiar Script
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-xs text-foreground font-sans whitespace-pre-wrap leading-relaxed select-all">
                      {script.message}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <div className="print-page-break" />

        {/* 3. SIMULADOR INTERATIVO DE AÇÕES */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 no-print"
        >
          <div className="bg-gradient-to-br from-primary/10 via-card/80 to-background border border-primary/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 p-2 rounded-lg text-primary border border-primary/30">
                <HelpCircle size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">3. Treinamento e Simulador de Etiquetas</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Clique em uma situação real de blindagem premium abaixo para receber a orientação.</p>
              </div>
            </div>

            {/* Botões dos Cenários */}
            <div className="grid md:grid-cols-3 gap-3 mb-8">
              {simulatorScenarios.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => setSimulatorStep(sc.id)}
                  className={`text-left p-4 rounded-xl border text-xs font-medium transition-all duration-300 ${
                    simulatorStep === sc.id 
                      ? "bg-primary/20 border-primary text-foreground shadow-[0_0_15px_rgba(217,119,6,0.15)]"
                      : "bg-card/40 border-white/5 text-muted-foreground hover:bg-card/80 hover:border-white/10 hover:text-foreground"
                  }`}
                >
                  <p className="font-bold text-[10px] uppercase tracking-wider mb-1 text-primary opacity-80">Situação {i + 1}:</p>
                  <p className="line-clamp-2 leading-relaxed">{sc.question}</p>
                </button>
              ))}
            </div>

            {/* Resultado da Simulação */}
            <AnimatePresence mode="wait">
              {simulatorStep !== "init" ? (
                <motion.div
                  key={simulatorStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/40 border border-white/15 p-6 rounded-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Estado Identificado:</p>
                      <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mt-0.5">
                        {currentScenario?.state}
                      </h4>
                    </div>

                    <div className="bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-lg">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-primary/70">A etiqueta correta é:</p>
                      <p className="text-xs font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                        {currentScenario?.label}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-[10px] uppercase font-bold tracking-widest text-primary">Instrução Prática Solution Place:</h5>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{currentScenario?.tip}</p>
                    </div>

                    <div className="bg-card/60 p-4 rounded-lg border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                          <MessageSquare size={10} />
                          Script pronto:
                        </span>
                        <button
                          onClick={() => {
                            if (currentScenario) {
                              handleCopyText(scripts[currentScenario.scriptIndex].message, 99);
                            }
                          }}
                          className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-primary hover:text-white px-2 py-0.5 rounded border border-primary/20 hover:bg-primary/20 transition-all"
                        >
                          {copiedIndex === 99 ? <Check size={10} /> : <Copy size={10} />}
                          Copiar Mensagem
                        </button>
                      </div>
                      <p className="text-xs text-foreground italic leading-relaxed whitespace-pre-wrap">
                        {currentScenario && scripts[currentScenario.scriptIndex].message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-black/20 border border-dashed border-white/10 rounded-xl p-8 text-center text-muted-foreground">
                  <Info size={32} className="mx-auto mb-3 text-muted-foreground/40" />
                  <p className="text-sm">Selecione uma das situações de blindagem de alto padrão acima para ver a simulação.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* 4. BOAS PRÁTICAS */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 print-card border border-white/5 bg-card/20 p-6 md:p-8 rounded-xl"
        >
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Car size={18} className="text-primary" />
            Regras de Ouro no Atendimento Solution Place
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-xs text-muted-foreground">
            <ul className="space-y-3 list-disc pl-4 leading-relaxed">
              <li><strong className="text-foreground">Atendimento Alto Padrão (Exclusividade):</strong> Clientes premium exigem máxima formalidade, pontuação correta e atenção absoluta aos detalhes técnicos do veículo.</li>
              <li><strong className="text-foreground">Ficha Técnica Completa:</strong> Nunca envie o lead para a equipe comercial sem coletar o **Modelo exato do Carro**, **Ano de fabricação** e a urgência da blindagem.</li>
              <li><strong className="text-foreground">Sincronia com PCP e Engenharia:</strong> Ao marcar como <span className="text-emerald-400 font-semibold">Pago</span>, o comprovante deve ser anexado no ERP comercial imediatamente e o PCP acionado para reservar o slot do veículo na linha de blindagem do Rio de Janeiro.</li>
            </ul>

            <ul className="space-y-3 list-disc pl-4 leading-relaxed">
              <li><strong className="text-foreground">Velocidade sob Medida:</strong> O retorno de cotações para blindagem nível III-A deve ser tratado com altíssima prioridade (meta menor que 10 minutos).</li>
              <li><strong className="text-foreground">Limpeza Periódica de Leads:</strong> leads frios sem interação há mais de 10 dias devem ser limpos para manter a higiene do funil comercial ativa.</li>
              <li><strong className="text-foreground">Organização Documental Exército:</strong> Ao marcar como 'Novo cliente', certifique-se de perguntar se o cliente já possui o Certificado de Registro (CR) no Exército para agilizar o processo burocrático de blindagem.</li>
            </ul>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
