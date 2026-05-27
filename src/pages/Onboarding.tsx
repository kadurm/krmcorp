import { useState, useEffect } from "react";
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
  Car,
  Smartphone,
  Laptop,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  CheckCheck,
  Wifi,
  Battery,
  Shield,
  Layers,
  ArrowRight
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
  const [simulatorStep, setSimulatorStep] = useState<string>("new_lead");
  const [deviceType, setDeviceType] = useState<"iphone" | "macbook">("iphone");
  const [simulatedMessages, setSimulatedMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasSentResponse, setHasSentResponse] = useState<boolean>(false);

  // Novos estados para o modo Prática e Treinamento Interativo
  const [onboardMode, setOnboardMode] = useState<"guide" | "practice">("guide");
  const [practiceStep, setPracticeStep] = useState<number>(0); // 0 = new_lead, 1 = qualified_lead, 2 = paid_lead
  const [practiceStage, setPracticeStage] = useState<"label" | "chat" | "done">("label");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [chatInputValue, setChatInputValue] = useState<string>("");
  const [showTermForm, setShowTermForm] = useState<boolean>(false);
  const [showTermDoc, setShowTermDoc] = useState<boolean>(false);
  const [advisorName, setAdvisorName] = useState<string>("");
  const [advisorSurname, setAdvisorSurname] = useState<string>("");
  const [signedTime, setSignedTime] = useState<string>("");

  // Scripts de Mensagens Padrão - Alinhados com a Solution (Blindadora Boutique)
  const scripts: ScriptTemplate[] = [
    {
      title: "1. Lead Recém-Chegado",
      badge: "Entrada de Lead",
      label: "Sem Etiqueta / Sem Lista",
      colorClass: "from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/20",
      borderClass: "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
      icon: Inbox,
      criteria: "O Lead entrou em contato via WhatsApp solicitando cotação de blindagem para um veículo premium ou perguntando sobre veículos blindados em estoque. = pré-qualificado para o comercial.",
      action: "NÃO aplicar nenhuma etiqueta. Iniciar imediatamente o protocolo de recepção de alto padrão da Solution, coletando dados (nome do Lead, modelo do veículo, ano de fabricação e urgência da cotação).",
      message: "Olá! Seja muito bem-vindo(a) à Solution Place.\\nSou Viviane, especialista em segurança automotiva. Para que eu possa te auxiliar da melhor forma possível, qual é o modelo e o ano do seu veículo?"
    },
    {
      title: "2. Lead Pré-Qualificado",
      badge: "Direcionando ao Comercial",
      label: "Adicionar à Lista / Etiqueta: Novo cliente",
      colorClass: "from-amber-500/20 to-yellow-500/5 text-primary border-primary/20",
      borderClass: "border-primary/30 shadow-[0_0_15px_rgba(217,119,6,0.1)]",
      icon: UserCheck,
      criteria: "O cliente confirmou o modelo do veículo, demonstrou interesse em algum veículo pronta-entrega e aceitou receber uma proposta comercial técnica ou agendar uma visita ao showroom.",
      action: "Adicionar à Lista/Aplicar a etiqueta 'Novo cliente'. Encaminhar a ficha técnica para o Comercial.",
      message: "Excelente, obrigado pelas informações! [Nome do Leads], o seu veículo é extraordinário e merece o alto padrão de blindagem que oferecemos aqui na Solution. 💎\n\nAcabei de direcionar a ficha técnica do seu projeto. A nossa comercial [Nome da Gerente] entrará em contato para lhe enviar um orçamento."
    },
    {
      title: "3. Lead Convertido (Fechou Contrato)",
      badge: "Venda Concluída",
      label: "Etiqueta: Pago",
      colorClass: "from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/20",
      borderClass: "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      icon: DollarSign,
      criteria: "O cliente aprovou o orçamento da blindagem, assinou o contrato digital de prestação de serviços da Solution e enviou o comprovante de pagamento de sinal, Pix ou entrada de faturamento.",
      action: "MUDAR a etiqueta de 'Novo cliente' para 'Pago' (cor verde) no WhatsApp. Remover o contato da lista comercial, inseri-lo na lista de clientes ativos da fábrica e notificar imediatamente os times de Engenharia de Blindagem, Compras de Materiais (vidros balísticos AGP / mantas de aramida) e Planejamento de Produção.",
      message: "Parabéns e seja muito bem-vindo à Solution! 🎉\n\nÉ um privilégio e uma grande responsabilidade cuidar da sua proteção e da sua família. Confirmamos o recebimento e o seu pagamento foi validado com sucesso.\n\nA partir deste momento, nosso departamento de Engenharia e Produção já foi acionado e está preparando o cronograma sob medida do seu veículo. Entraremos em contato nas próximas horas para alinhar a data de recebimento do veículo na fábrica e a emissão da documentação junto ao Exército.\n\nEstamos à sua total disposição!"
    }
  ];

  // Cenários do Simulador - Alinhados com a Solution
  const simulatorScenarios = [
    {
      id: "new_lead",
      question: "O cliente acabou de mandar no WhatsApp: 'Gostaria de saber o valor para blindar um sedã premium 2024. Vocês trabalham com pronta entrega?'",
      state: "Lead Recém-Chegado",
      label: "Sem Etiqueta",
      tip: "Inicie o protocolo de atendimento de altíssimo padrão. Identifique-se e dê as boas-vindas formais da Solution. O foco é obter o nome do cliente e confirmar os detalhes do veículo antes de direcionar.",
      scriptIndex: 0,
      clientName: "Dr. André Santos",
      carModel: "Sedã Premium 2024",
      avatar: "A",
      avatarColor: "bg-blue-600",
      clientMessage: "Olá! Gostaria de saber o valor para blindar um sedã premium 2024. Vocês trabalham com pronta entrega?",
      clientTime: "18:15"
    },
    {
      id: "qualified_lead",
      question: "O cliente informou que deseja blindar um SUV de Luxo 2023 com vidros de 19mm e solicitou a proposta formalizada por WhatsApp.",
      state: "Lead Qualificado",
      label: "Novo cliente",
      tip: "Adicione o contato à lista de transmissão e marque com a etiqueta 'Novo cliente'. Isso aciona o time comercial especialista para fazer o envio e acompanhamento da cotação formal Nível III-A.",
      scriptIndex: 1,
      clientName: "Sra. Helena Meirelles",
      carModel: "SUV de Luxo 2023",
      avatar: "H",
      avatarColor: "bg-amber-600",
      clientMessage: "Sou a Helena. Gostaria de blindar meu SUV com vidros de 19mm. Consegue me enviar a proposta formalizada por aqui?",
      clientTime: "17:42"
    },
    {
      id: "paid_lead",
      question: "O cliente assinou o contrato digital e enviou o comprovante de Pix do sinal para blindagem de um esportivo premium 2022.",
      state: "Lead Convertido (Pago)",
      label: "Pago",
      tip: "Altere a etiqueta para 'Pago'. Notifique a Engenharia e o PCP da fábrica da Solution imediatamente para a reserva de slot de produção e compra dos insumos (vidros balísticos/aramida).",
      scriptIndex: 2,
      clientName: "Dr. Roberto Medeiros",
      carModel: "Esportivo Premium 2022",
      avatar: "R",
      avatarColor: "bg-emerald-600",
      clientMessage: "Contrato assinado digitalmente e o sinal enviado via Pix! Segue o comprovante.",
      clientTime: "15:20"
    }
  ];

  const currentScenario = simulatorScenarios.find(s => s.id === simulatorStep) || simulatorScenarios[0];

  // Efeito para sincronizar o cenário com a etapa de Prática/Treinamento
  useEffect(() => {
    if (onboardMode === "practice") {
      let scenarioId = "new_lead";
      if (practiceStep === 0) scenarioId = "new_lead";
      else if (practiceStep === 1) scenarioId = "qualified_lead";
      else if (practiceStep === 2) scenarioId = "paid_lead";
      setSimulatorStep(scenarioId);
    }
  }, [practiceStep, onboardMode]);

  // Efeito para resetar e carregar a conversa quando mudar de cenário
  useEffect(() => {
    setSimulatedMessages([
      { sender: "client", text: currentScenario.clientMessage, time: currentScenario.clientTime }
    ]);
    setHasSentResponse(false);
    setIsTyping(false);
    setChatInputValue("");
    setSelectedLabel(null);
    if (onboardMode === "practice") {
      setPracticeStage("label");
    }
  }, [simulatorStep]);

  // Função para enviar mensagem customizada pelo consultor no chat do simulador
  const handleSendCustomMessage = () => {
    const textToSend = chatInputValue.trim();
    if (!textToSend || hasSentResponse || isTyping) return;

    // Adiciona a mensagem do consultor
    setSimulatedMessages(prev => [
      ...prev,
      {
        sender: "agent",
        text: textToSend,
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setHasSentResponse(true);
    setChatInputValue("");
    setIsTyping(true);

    // Respostas automáticas do cliente após digitação
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Entendido, obrigado!";
      if (currentScenario.id === "new_lead") {
        replyText = "Olá! Meu nome é André Santos. É um sedã premium ano 2024 sim. Tenho bastante pressa no orçamento, vocês conseguem me enviar uma prévia dos valores ainda hoje?";
      } else if (currentScenario.id === "qualified_lead") {
        replyText = "Perfeito, Carlos Eduardo! Fico no aguardo do contato do consultor com a cotação formal Nível III-A da Solution. Muito obrigada pela agilidade!";
      } else if (currentScenario.id === "paid_lead") {
        replyText = "Excelente, Carlos! Já fiz o Pix do sinal também. Fico no aguardo do contato do PCP da fábrica para agendarmos o recebimento do veículo. Um abraço!";
      }

      setSimulatedMessages(prev => [
        ...prev,
        {
          sender: "client",
          text: replyText,
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);

      if (onboardMode === "practice") {
        setPracticeStage("done");
      }
      toast.success("Mensagem recebida do cliente!");
    }, 1800);
  };

  // Preencher campo de entrada de chat com o script oficial
  const handleUseOfficialScript = () => {
    setChatInputValue(scripts[currentScenario.scriptIndex].message);
    toast.info("Script preenchido no chat! Pressione enviar para simular.");
  };

  // Função para Simular Envio de Resposta Premium
  const triggerSimulatedResponse = () => {
    if (hasSentResponse || isTyping) return;
    
    setIsTyping(true);
    
    // Simula tempo de digitação de 1.8 segundos
    setTimeout(() => {
      setIsTyping(false);
      setSimulatedMessages(prev => [
        ...prev,
        { 
          sender: "agent", 
          text: scripts[currentScenario.scriptIndex].message, 
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
      setHasSentResponse(true);
      toast.success("Mensagem da Solution enviada com sucesso no simulador!");

      // Dispara a réplica automática do cliente
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let replyText = "Entendido, obrigado!";
        if (currentScenario.id === "new_lead") {
          replyText = "Olá! Meu nome é André Santos. É um sedã premium ano 2024 sim. Tenho bastante pressa no orçamento, vocês conseguem me enviar uma prévia dos valores ainda hoje?";
        } else if (currentScenario.id === "qualified_lead") {
          replyText = "Perfeito, Carlos Eduardo! Fico no aguardo do contato do consultor com a cotação formal Nível III-A da Solution. Muito obrigada pela agilidade!";
        } else if (currentScenario.id === "paid_lead") {
          replyText = "Excelente, Carlos! Já fiz o Pix do sinal também. Fico no aguardo do contato do PCP da fábrica para agendarmos o recebimento do veículo. Um abraço!";
        }

        setSimulatedMessages(prev => [
          ...prev,
          {
            sender: "client",
            text: replyText,
            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          }
        ]);

        if (onboardMode === "practice") {
          setPracticeStage("done");
        }
        toast.success("Mensagem recebida do cliente!");
      }, 1500);

    }, 1800);
  };

  // Função para Copiar Texto
  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Mensagem copiada para a área de transferência!");
    setTimeout(() => setCopiedIndex(null), 2500);
  };

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
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-white transition-all">
            <ArrowLeft size={14} />
            Voltar ao Início
          </Link>
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
      <div className="container max-w-6xl mx-auto px-6 pt-12 print-container">
        
        {/* Header da Página */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-10 border-b border-white/5 pb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 no-print">
            <ShieldCheck size={12} className="text-primary" />
            Solution Place
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-2 print-title">
            Onboard - Atendimento & <span className="text-gradient-gold">Etiquetagem WhatsApp</span>
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 items-center justify-between bg-card/40 border border-white/5 p-4 rounded-lg no-print">
            <div className="flex items-start gap-3 max-w-xl">
              <Info className="text-primary shrink-0 mt-1" size={18} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Esse alinhamento garante o treinamento correto do algoritmo do Meta Ads e a organização do fluxo de atendimento.
              </p>
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
              <h2 className="text-2xl font-display font-bold text-foreground">Adicionar à lista</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start bg-card/30 border border-white/5 p-6 md:p-8 rounded-xl backdrop-blur-sm print-card">
            
            {/* Visualização de Conversas Etiquetadas */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Exemplo de Visualização no WhatsApp Business</h3>
              </div>

              <div className="space-y-3">
                {/* Contato 1: Sem Etiqueta */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-foreground">Dr. André Santos</h4>
                      <span className="text-[10px] text-muted-foreground">18:15</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate italic">"Olá! Gostaria de saber o valor para blindar um sedã premium..."</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-tighter">Sem Etiqueta</span>
                    <CheckCheck size={14} className="text-muted-foreground/30" />
                  </div>
                </div>

                {/* Contato 2: Novo cliente */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    H
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-foreground">Sra. Helena Meirelles</h4>
                      <span className="text-[10px] text-muted-foreground">17:42</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">"Sou a Helena. Gostaria de blindar meu SUV com vidros de 19mm..."</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-tighter">Novo cliente</span>
                    <div className="flex items-center gap-1">
                      <CheckCheck size={14} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Contato 3: Pago */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    R
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-foreground">Dr. Roberto Medeiros</h4>
                      <span className="text-[10px] text-muted-foreground">15:20</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">"Contrato assinado digitalmente e o sinal enviado via Pix!"</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-tighter">Pago</span>
                    <CheckCheck size={14} className="text-emerald-400" />
                  </div>
                </div>
              </div>

            </div>

            {/* Resumo do Fluxo Lateral */}
            <div className="md:col-span-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="text-primary">✦</span> Funil:
                </h3>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded border border-white/5 hover:border-blue-500/30 transition-all group">
                    <span className="w-3 h-3 rounded-full bg-blue-400 block shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
                    <div>
                      <p className="font-bold text-foreground group-hover:text-blue-400 transition-colors">1. Sem Etiqueta</p>
                      <p className="text-muted-foreground text-[10px]">Boas-vindas / Identificação do Veículo</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded border border-white/5 hover:border-amber-500/30 transition-all group">
                    <span className="w-3 h-3 rounded-full bg-amber-400 block shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                    <div>
                      <p className="font-bold text-foreground group-hover:text-amber-400 transition-colors">2. Novo cliente</p>
                      <p className="text-muted-foreground text-[10px]">Lead qualificado / Enviar para o comercial</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded border border-white/5 hover:border-emerald-500/30 transition-all group">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 block shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                    <div>
                      <p className="font-bold text-foreground group-hover:text-emerald-400 transition-colors">3. Pago</p>
                      <p className="text-muted-foreground text-[10px]">Contrato assinado</p>
                    </div>
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
            <h2 className="text-2xl font-display font-bold text-foreground">Mensagens de atendimento</h2>
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

        {/* 3. SIMULADOR INTERATIVO DE AÇÕES COM MOCKUPS HIGH-FIDELITY */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 no-print"
        >
          <div className="bg-gradient-to-br from-primary/10 via-card/80 to-background border border-primary/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2.5 rounded-lg text-primary border border-primary/30 shadow-[0_0_10px_rgba(217,119,6,0.1)]">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">3. Treinamento e Simulador Interativo</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Visualize a interface exata do WhatsApp Business operando no iPhone e MacBook.</p>
                </div>
              </div>

              {/* Toggles de Dispositivo */}
              <div className="flex items-center bg-black/40 p-1.5 rounded-xl border border-white/10 self-start lg:self-center">
                <button
                  onClick={() => setDeviceType("iphone")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    deviceType === "iphone"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone size={14} />
                  iPhone (iOS)
                </button>
                <button
                  onClick={() => setDeviceType("macbook")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    deviceType === "macbook"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Laptop size={14} />
                  MacBook (Web)
                </button>
              </div>
            </div>

            {/* Grid Principal: Seletor & Ficha Técnica vs Mockup do WhatsApp */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Coluna da Esquerda: Cenários e Orientações Técnicas (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-display block">Escolha uma Situação Real:</span>
                  <div className="flex flex-col gap-3">
                    {simulatorScenarios.map((sc, i) => (
                      <button
                        key={sc.id}
                        onClick={() => setSimulatorStep(sc.id)}
                        className={`text-left p-4 rounded-xl border text-xs font-medium transition-all duration-300 flex items-start gap-3 relative overflow-hidden ${
                          simulatorStep === sc.id 
                            ? "bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(217,119,6,0.1)]"
                            : "bg-card/40 border-white/5 text-muted-foreground hover:bg-card/80 hover:border-white/10 hover:text-foreground"
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          simulatorStep === sc.id ? "bg-primary text-primary-foreground" : "bg-white/5"
                        }`}>
                          <Car size={14} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[10px] uppercase tracking-wider text-primary">Cenário {i + 1}: {sc.clientName}</p>
                          <p className="font-semibold text-foreground text-[11px]">{sc.carModel}</p>
                          <p className="line-clamp-2 leading-relaxed text-muted-foreground text-[10px]">{sc.question}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Painel de Instruções de Etiquetagem */}
                <motion.div
                  key={simulatorStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/30 border border-white/10 p-5 rounded-xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div>
                      <p className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Estado do Lead:</p>
                      <p className="text-sm font-bold text-foreground">{currentScenario.state}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-primary">Etiqueta Recomendada:</p>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border mt-1 ${
                        currentScenario.id === "new_lead" ? "text-blue-400 border-blue-500/20 bg-blue-500/10" :
                        currentScenario.id === "qualified_lead" ? "text-amber-400 border-amber-500/20 bg-amber-500/10" :
                        "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          currentScenario.id === "new_lead" ? "bg-blue-400" :
                          currentScenario.id === "qualified_lead" ? "bg-amber-400" :
                          "bg-emerald-400"
                        }`} />
                        {currentScenario.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <h4 className="font-bold text-primary flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                        <Shield size={12} /> Diretriz da Blindadora:
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mt-1 text-[11px]">{currentScenario.tip}</p>
                    </div>

                    <div className="bg-white/5 p-3.5 rounded-lg border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground text-[10px] uppercase tracking-wider">Script de Atendimento:</span>
                        <button
                          onClick={() => handleCopyText(scripts[currentScenario.scriptIndex].message, 99)}
                          className="text-[9px] font-bold text-primary hover:text-white uppercase tracking-wider flex items-center gap-1"
                        >
                          {copiedIndex === 99 ? <Check size={10} /> : <Copy size={10} />}
                          Copiar Mensagem
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground italic leading-relaxed line-clamp-3">
                        "{scripts[currentScenario.scriptIndex].message}"
                      </p>
                    </div>

                    {!hasSentResponse && (
                      <button
                        onClick={triggerSimulatedResponse}
                        disabled={isTyping}
                        className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-300 glow-gold uppercase tracking-wider"
                      >
                        {isTyping ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Carlos Eduardo Digitando...
                          </>
                        ) : (
                          <>
                            <Send size={12} />
                            Simular Resposta no Aparelho
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Coluna da Direita: Mockup Físico de Aparelho (7 cols) */}
              <div className="lg:col-span-7 flex justify-center items-center">
                <AnimatePresence mode="wait">
                  {deviceType === "iphone" ? (
                    /* ================= IPHONE MOCKUP ================= */
                    <motion.div
                      key="iphone-device"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-[340px] h-[670px] rounded-[52px] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl relative flex flex-col overflow-hidden border-t-[12px] border-b-[12px] shadow-black/80"
                    >
                      {/* Dynamic Island / Notch do iPhone */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <div className="w-10 h-1 bg-zinc-900 rounded-full" />
                      </div>

                      {/* iPhone Status Bar */}
                      <div className="h-10 bg-zinc-900 flex items-end justify-between px-6 pb-1 text-[11px] font-semibold text-zinc-300 z-40 shrink-0">
                        <span>18:20</span>
                        <div className="flex items-center gap-1.5">
                          <Wifi size={11} />
                          <span className="text-[9px]">5G</span>
                          <Battery size={13} className="text-zinc-300" />
                        </div>
                      </div>

                      {/* WhatsApp iOS Header */}
                      <div className="bg-zinc-900 border-b border-white/5 py-2 px-3 flex items-center justify-between z-30 shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary font-medium hover:opacity-80 transition-all flex items-center cursor-pointer">
                            <ChevronRight size={16} className="rotate-180 text-primary" />
                            Atrás
                          </span>
                          
                          {/* Avatar */}
                          <div className={`w-9 h-9 rounded-full ${currentScenario.avatarColor} flex items-center justify-center font-bold text-sm text-white shadow-inner relative`}>
                            {currentScenario.avatar}
                            {/* Etiqueta na Foto */}
                            {currentScenario.id !== "new_lead" && (
                              <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border border-zinc-950 flex items-center justify-center ${
                                currentScenario.id === "qualified_lead" ? "bg-amber-400" : "bg-emerald-400"
                              }`} />
                            )}
                          </div>

                          {/* Nome e Status */}
                          <div className="text-left">
                            <h4 className="text-xs font-bold text-foreground leading-tight">{currentScenario.clientName}</h4>
                            <p className="text-[10px] text-emerald-400 leading-none flex items-center gap-1 mt-0.5">
                              {isTyping ? (
                                <span className="animate-pulse">digitando...</span>
                              ) : (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                                  online
                                </>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Ações Rápidas Header */}
                        <div className="flex items-center gap-3 text-primary">
                          <Phone size={14} className="cursor-pointer hover:opacity-80" />
                          <Video size={15} className="cursor-pointer hover:opacity-80" />
                          <MoreVertical size={14} className="text-zinc-400 cursor-pointer" />
                        </div>
                      </div>

                      {/* Corpo do Chat (Wallpaper Clássico WhatsApp Dark) */}
                      <div className="flex-1 bg-zinc-950 p-4 flex flex-col gap-4 overflow-y-auto relative bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:16px_16px]">
                        
                        {/* Indicador de Categoria / Tag flutuante */}
                        <div className="self-center bg-zinc-900/90 border border-white/5 py-1 px-3 rounded-full text-[9px] font-bold text-muted-foreground uppercase tracking-wider backdrop-blur-sm shadow flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            currentScenario.id === "new_lead" ? "bg-blue-400" :
                            currentScenario.id === "qualified_lead" ? "bg-amber-400" :
                            "bg-emerald-400"
                          }`} />
                          Etiqueta: {currentScenario.label}
                        </div>

                        {/* Mensagem Informativa de Veículo */}
                        <div className="self-center bg-primary/10 border border-primary/20 text-primary py-1 px-2.5 rounded-lg text-[9px] font-medium max-w-[240px] text-center leading-normal">
                          Modelo: <span className="font-bold">{currentScenario.carModel}</span>
                        </div>

                        {/* Mensagens Simulares */}
                        {simulatedMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed relative flex flex-col ${
                              msg.sender === "client"
                                ? "bg-zinc-800 text-zinc-100 self-start rounded-tl-none border border-zinc-700/50"
                                : "bg-primary/20 border border-primary/30 text-foreground self-end rounded-tr-none shadow-[0_0_10px_rgba(217,119,6,0.05)]"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <span className="text-[8px] text-muted-foreground/60 self-end mt-1.5 flex items-center gap-0.5">
                              {msg.time}
                              {msg.sender === "agent" && <CheckCheck size={10} className="text-primary" />}
                            </span>
                          </div>
                        ))}

                        {/* Indicador Visual de Digitação */}
                        {isTyping && (
                          <div className="bg-zinc-800 border border-zinc-700/50 text-zinc-300 max-w-[60px] rounded-xl p-2.5 self-start rounded-tl-none flex items-center justify-center gap-1 shrink-0">
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: '300ms' }} />
                          </div>
                        )}
                      </div>

                      {/* iPhone WhatsApp Input Bar */}
                      <div className="bg-zinc-900 border-t border-white/5 p-3 flex items-center gap-2 z-30 shrink-0">
                        <Paperclip size={16} className="text-primary cursor-pointer hover:opacity-85 shrink-0" />
                        <div className="flex-1 bg-zinc-950 border border-white/5 rounded-full px-4 py-1.5 flex items-center justify-between text-xs text-foreground">
                          <input
                            type="text"
                            value={chatInputValue}
                            onChange={(e) => setChatInputValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSendCustomMessage();
                            }}
                            placeholder={hasSentResponse ? "Mensagem enviada" : "Digite uma mensagem..."}
                            disabled={hasSentResponse || isTyping}
                            className="bg-transparent border-none outline-none w-full text-xs text-foreground placeholder-zinc-500"
                          />
                          <Smile size={15} className="text-zinc-500 cursor-pointer hover:text-zinc-300 shrink-0 ml-1" />
                        </div>
                        <button 
                          onClick={handleSendCustomMessage} 
                          disabled={hasSentResponse || isTyping || !chatInputValue.trim()}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            hasSentResponse || !chatInputValue.trim()
                              ? "bg-zinc-800 text-zinc-600" 
                              : "bg-primary text-primary-foreground hover:scale-105"
                          }`}
                        >
                          <Send size={12} className={hasSentResponse ? "" : "translate-x-[1px]"} />
                        </button>
                      </div>

                      {/* iPhone Home Indicator bar */}
                      <div className="h-5 bg-zinc-900 flex items-center justify-center z-30 shrink-0">
                        <div className="w-28 h-1 bg-zinc-700 rounded-full" />
                      </div>
                    </motion.div>
                  ) : (
                    /* ================= MACBOOK / WHATSAPP WEB MOCKUP ================= */
                    <motion.div
                      key="macbook-device"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-[620px] h-[480px] bg-zinc-950 rounded-xl border border-white/10 shadow-2xl relative flex flex-col overflow-hidden shadow-black/80"
                    >
                      {/* Top macOS Style Bar */}
                      <div className="h-10 bg-zinc-900 border-b border-white/5 px-4 flex items-center justify-between shrink-0">
                        {/* Red, Yellow, Green window controls */}
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/20" />
                          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/20" />
                          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block border border-green-600/20" />
                        </div>
                        
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                          <Layers size={11} className="text-primary" />
                          Solution RJ · WhatsApp Web
                        </div>
                        
                        <div className="w-12" /> {/* Spacer */}
                      </div>

                      {/* Main Application Body */}
                      <div className="flex-1 flex overflow-hidden">
                        
                        {/* Left Sidebar: Active Chats (35%) */}
                        <div className="w-[38%] border-r border-white/5 bg-zinc-900/50 flex flex-col overflow-hidden shrink-0">
                          {/* Sidebar Header & Search */}
                          <div className="p-3 border-b border-white/5 space-y-3 shrink-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-foreground">Conversas Recentes</span>
                              <div className="bg-white/5 p-1 rounded hover:bg-white/10 cursor-pointer">
                                <Search size={12} className="text-zinc-400" />
                              </div>
                            </div>
                          </div>

                          {/* Chat List (Veículos Premium) */}
                          <div className="flex-1 overflow-y-auto space-y-0.5 p-1.5">
                            {simulatorScenarios.map(sc => (
                              <button
                                key={sc.id}
                                onClick={() => setSimulatorStep(sc.id)}
                                className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 flex items-center gap-2.5 ${
                                  simulatorStep === sc.id 
                                    ? "bg-primary/10 border border-primary/20 text-foreground" 
                                    : "border border-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-full ${sc.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0 relative`}>
                                  {sc.avatar}
                                  {sc.id !== "new_lead" && (
                                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-zinc-900 ${
                                      sc.id === "qualified_lead" ? "bg-amber-400" : "bg-emerald-400"
                                    }`} />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1 space-y-0.5">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-bold text-foreground truncate">{sc.clientName}</h4>
                                    <span className="text-[8px] text-muted-foreground shrink-0">{sc.clientTime}</span>
                                  </div>
                                  <p className="text-[9px] text-primary font-medium truncate leading-none">{sc.carModel}</p>
                                  <p className="text-[9px] text-muted-foreground truncate leading-normal italic">
                                    {sc.id === simulatorStep && hasSentResponse ? "Você respondeu..." : sc.clientMessage}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Chat Pane: Active Conversation (65%) */}
                        <div className="flex-1 bg-zinc-950 flex flex-col overflow-hidden relative">
                          
                          {/* Active Chat Header */}
                          <div className="bg-zinc-900 border-b border-white/5 p-3 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-8 h-8 rounded-full ${currentScenario.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                                {currentScenario.avatar}
                              </div>
                              <div className="text-left min-w-0">
                                <h4 className="text-xs font-bold text-foreground leading-tight truncate">{currentScenario.clientName}</h4>
                                <p className="text-[9px] text-muted-foreground leading-none mt-1 truncate">
                                  Interesse: <span className="font-semibold text-primary">{currentScenario.carModel}</span>
                                </p>
                              </div>
                            </div>

                            {/* Active Tag indicator */}
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                              currentScenario.id === "new_lead" ? "text-blue-400 border-blue-500/20 bg-blue-500/10" :
                              currentScenario.id === "qualified_lead" ? "text-amber-400 border-amber-500/20 bg-amber-500/10" :
                              "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                            }`}>
                              {currentScenario.label}
                            </span>
                          </div>

                          {/* Chat Wallpaper Log */}
                          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col relative bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:16px_16px]">
                            
                            {/* Conversas */}
                            {simulatedMessages.map((msg, i) => (
                              <div
                                key={i}
                                className={`max-w-[70%] rounded-xl p-3 text-[11px] leading-relaxed flex flex-col shadow-md ${
                                  msg.sender === "client"
                                    ? "bg-zinc-800 text-zinc-100 self-start rounded-tl-none border border-zinc-700/50"
                                    : "bg-primary/20 border border-primary/30 text-foreground self-end rounded-tr-none"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <span className="text-[8px] text-muted-foreground/60 self-end mt-1.5 flex items-center gap-0.5">
                                  {msg.time}
                                  {msg.sender === "agent" && <CheckCheck size={10} className="text-primary" />}
                                </span>
                              </div>
                            ))}

                            {/* Digitação */}
                            {isTyping && (
                              <div className="bg-zinc-800 border border-zinc-700/50 text-zinc-300 max-w-[60px] rounded-xl p-2.5 self-start rounded-tl-none flex items-center justify-center gap-1 shrink-0">
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: '300ms' }} />
                              </div>
                            )}
                          </div>

                          {/* Chat Web Bottom Input */}
                          <div className="bg-zinc-900 border-t border-white/5 p-3 flex items-center gap-3 shrink-0">
                            <Smile size={16} className="text-zinc-400 cursor-pointer hover:text-zinc-200" />
                            <Paperclip size={16} className="text-zinc-400 cursor-pointer hover:text-zinc-200" />
                            
                            <div className="flex-1 bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-foreground flex items-center justify-between">
                              <input
                                type="text"
                                value={chatInputValue}
                                onChange={(e) => setChatInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSendCustomMessage();
                                }}
                                placeholder={hasSentResponse ? "Resposta enviada" : "Digite a mensagem de boas-vindas..."}
                                disabled={hasSentResponse || isTyping}
                                className="bg-transparent border-none outline-none w-full text-xs text-foreground placeholder-zinc-500"
                              />
                            </div>

                            <button 
                              onClick={handleSendCustomMessage}
                              disabled={hasSentResponse || isTyping || !chatInputValue.trim()}
                              className={`p-2 rounded-lg transition-all ${
                                hasSentResponse || !chatInputValue.trim()
                                  ? "bg-zinc-800 text-zinc-600" 
                                  : "bg-primary text-primary-foreground hover:scale-105"
                              }`}
                            >
                              <Send size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
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
            Regras de Ouro no Atendimento Solution
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-xs text-muted-foreground">
            <ul className="space-y-3 list-disc pl-4 leading-relaxed">
              <li><strong className="text-foreground">Atendimento Boutique (Solution):</strong> Clientes do segmento premium exigem máxima formalidade, vocabulário impecável e clareza nos aspectos de engenharia balística.</li>
              <li><strong className="text-foreground">Ficha Técnica Indispensável:</strong> Nunca direcione o lead para a equipe comercial especializada sem colher o **Modelo exato** (ex: SUV, Sedã, Esportivo), **Ano** e o **tipo de blindagem desejado** (geralmente Nível III-A).</li>
              <li><strong className="text-foreground">Sincronia Operacional (PCP):</strong> Ao marcar como <span className="text-emerald-400 font-semibold">Pago</span>, o sinal deve ser validado pelo financeiro e a engenharia notificada imediatamente para compras de vidros de alta tecnologia (AGP Glass).</li>
            </ul>

            <ul className="space-y-3 list-disc pl-4 leading-relaxed">
              <li><strong className="text-foreground">Velocidade no SLA:</strong> O tempo limite para envio do primeiro contato aos leads de cotação de blindagem Nível III-A é de **10 minutos**.</li>
              <li><strong className="text-foreground">Processos com o Exército:</strong> Ao qualificar o cliente como 'Novo cliente', verifique se o mesmo já possui o Certificado de Registro (CR) ativo para facilitar a documentação da blindagem junto ao Exército.</li>
              <li><strong className="text-foreground">Manutenção do Funil:</strong> Higienize semanalmente os contatos, enviando leads que não responderam por mais de 7 dias para réguas automáticas de reengajamento comercial.</li>
            </ul>
          </div>

          {!showTermForm && !showTermDoc && (
            <div className="flex justify-center pt-4 no-print">
              <button
                onClick={() => {
                  setShowTermForm(true);
                  setTimeout(() => {
                    document.getElementById('term-form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-xl text-sm flex items-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 uppercase tracking-widest"
              >
                <ShieldCheck size={20} />
                Finalizar Treinamento & Assinar Termo
              </button>
            </div>
          )}
        </motion.section>

        {/* 5. SEÇÃO DO TERMO DE COMPROMISSO (DINÂMICO) */}
        <AnimatePresence>
          {showTermForm && (
            <motion.section
              id="term-form-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-24 max-w-2xl mx-auto no-print"
            >
              <div className="bg-card/40 border border-primary/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Shield size={120} className="text-primary" />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
                  <FileText className="text-primary" />
                  Assinatura do Termo de Compromisso
                </h2>
                <p className="text-xs text-muted-foreground mb-8">
                  Para concluir seu onboard e validar seu acesso como Consultor Solution, preencha seus dados para geração do certificado digital de excelência.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Nome</label>
                      <input 
                        type="text" 
                        value={advisorName}
                        onChange={(e) => setAdvisorName(e.target.value)}
                        placeholder="Ex: Carlos"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Sobrenome</label>
                      <input 
                        type="text" 
                        value={advisorSurname}
                        onChange={(e) => setAdvisorSurname(e.target.value)}
                        placeholder="Ex: Eduardo"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl flex items-start gap-3">
                    <div className="mt-0.5">
                      <input 
                        type="checkbox" 
                        id="agree-term"
                        className="w-4 h-4 rounded border-primary text-primary focus:ring-primary accent-primary cursor-pointer"
                      />
                    </div>
                    <label htmlFor="agree-term" className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer select-none">
                      Eu li e concordo com os protocolos de atendimento de altíssimo padrão da Solution e comprometo-me a aplicar rigorosamente a etiquetagem conforme o treinamento.
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      if (!advisorName || !advisorSurname) {
                        toast.error("Por favor, preencha seu nome e sobrenome.");
                        return;
                      }
                      const checkbox = document.getElementById('agree-term') as HTMLInputElement;
                      if (!checkbox.checked) {
                        toast.error("Você precisa concordar com os termos para prosseguir.");
                        return;
                      }
                      
                      setSignedTime(new Date().toLocaleString('pt-BR'));
                      setShowTermForm(false);
                      setShowTermDoc(true);
                      toast.success("Termo de Compromisso assinado com sucesso!");
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 glow-gold"
                  >
                    Gerar Certificado & Finalizar
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {showTermDoc && (
            <motion.section
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-24 print-container"
            >
              <div className="max-w-3xl mx-auto bg-white text-zinc-900 p-8 md:p-16 rounded-sm shadow-2xl relative border-[12px] border-zinc-100 print:border-none">
                {/* Cabeçalho do Documento */}
                <div className="flex flex-col items-center text-center mb-10 border-b-2 border-zinc-200 pb-8">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-xl">
                    <ShieldCheck size={40} className="text-[#d97706]" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold uppercase tracking-tight text-zinc-900">Termo de Compromisso de Excelência</h2>
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mt-1">Solution · Blindagem Boutique</p>
                </div>

                {/* Corpo do Texto */}
                <div className="space-y-6 text-sm leading-relaxed text-zinc-800 text-justify">
                  <p>
                    Eu, <strong className="text-zinc-950 underline underline-offset-4">{advisorName} {advisorSurname}</strong>, doravante designado como Consultor(a) de Atendimento Premium, comprometo-me formalmente perante a <strong className="text-zinc-950">Solution</strong> a seguir os protocolos de atendimento de altíssimo padrão estabelecidos para o segmento boutique no Rio de Janeiro.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="flex gap-4">
                      <span className="font-bold text-zinc-400">01.</span>
                      <p><strong className="text-zinc-950">Excelência na Comunicação:</strong> Utilizar vocabulário adequado ao público de altíssimo luxo, mantendo a formalidade, clareza técnica e cordialidade em todos os pontos de contato via WhatsApp Business.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-bold text-zinc-400">02.</span>
                      <p><strong className="text-zinc-950">Precisão na Etiquetagem:</strong> Aplicar rigorosamente as etiquetas (Sem Etiqueta, Novo cliente, Pago) conforme o estado real do lead, visando a integridade do CRM e o treinamento correto dos algoritmos comerciais.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-bold text-zinc-400">03.</span>
                      <p><strong className="text-zinc-950">Compromisso com o SLA:</strong> Priorizar o primeiro contato com novos leads em um prazo máximo de 10 minutos, compreendendo a urgência e exclusividade demandadas por clientes de alto padrão.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-bold text-zinc-400">04.</span>
                      <p><strong className="text-zinc-950">Sigilo e Proteção:</strong> Zelar pela total confidencialidade das informações e documentos de nossos clientes, em conformidade com as normas do Exército Brasileiro e políticas internas de segurança balística.</p>
                    </div>
                  </div>

                  <p className="pt-6">
                    Por estar de pleno acordo com os termos acima citados, firmo este compromisso digital para validação imediata de minhas atividades operacionais.
                  </p>
                </div>

                {/* Rodapé e Assinatura */}
                <div className="mt-16 flex flex-col items-center">
                  <div className="w-full max-w-xs border-b border-zinc-400 mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">{advisorName} {advisorSurname}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">Consultor Homologado Solution</p>
                  
                  <div className="mt-10 pt-6 border-t border-zinc-100 w-full flex justify-between items-end">
                    <div className="text-[9px] text-zinc-400 uppercase tracking-tighter">
                      <p>Protocolo Digital: SP-{Math.floor(Math.random() * 900000 + 100000)}</p>
                      <p>Data de Assinatura: {signedTime}</p>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-200 p-2 rounded flex items-center gap-2">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Verificado</span>
                    </div>
                  </div>
                </div>

                {/* Selo de Água / Decorativo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                  <Car size={400} />
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4 no-print">
                <button
                  onClick={() => window.print()}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <Printer size={16} />
                  Imprimir Comprovante
                </button>
                <Link
                  to="/"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest transition-all"
                >
                  Concluir & Ir para a Home
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
