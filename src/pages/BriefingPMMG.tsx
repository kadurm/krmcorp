import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Check, 
  Copy, 
  Download, 
  Eye, 
  EyeOff, 
  FileText, 
  Globe, 
  HelpCircle, 
  Instagram, 
  Key, 
  Layers, 
  Lock, 
  Mail, 
  MessageSquare, 
  Phone, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  User, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  DollarSign,
  AlertCircle,
  FolderOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import jsPDF from "jspdf";

export default function BriefingPMMG() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copiedJSON, setCopiedJSON] = useState<boolean>(false);

  // Formulário do Briefing com dados pré-configurados do cliente Michel Juliano Santos Lima
  const [formData, setFormData] = useState({
    // Step 1: Cliente
    clientName: "Michel Juliano Santos Lima",
    cpf: "019.230.536-04",
    address: "Rua Lafetá, 95 apto 313, Centro, Montes Claros - MG",
    email: "",
    whatsapp: "",
    instagram: "",
    brandName: "PMMG Português Focado",

    // Step 2: Credenciais & Acessos
    googleEmail: "",
    googlePassword: "",
    metaAdsAccess: "quero_ajuda_krm", // 'tenho_bm', 'quero_ajuda_krm', 'acesso_login'
    checkoutPlatform: "Kiwify",
    checkoutUrl: "",

    // Step 3: Briefing do Produto (PMMG - Língua Portuguesa)
    productName: "Combo de Simulados Língua Portuguesa PMMG (Edital Atualizado)",
    productPrice: "37,00",
    bancaExam: "CRS / PMMG (Polícia Militar de Minas Gerais)",
    differentials: "• Questões 100% comentadas alternativa por alternativa;\n• Foco total em Crase, Regência, Sintaxe e Interpretação de Texto;\n• Material em PDF para download imediato + Gabarito explicativo;\n• Bônus: Raio-X das pegadinhas da banca PMMG.",
    painPoints: "• Medo de zerar a prova de Português (matéria eliminatória);\n• Dificuldade em acertar as pegadinhas específicas da banca CRS/PMMG;\n• Pouco tempo para estudar teorias gramaticais longas e desgastantes.",
    headlinePromessa: "Gabarite a Prova de Língua Portuguesa da PMMG Treinando Apenas 15 Minutos por Dia com Simulados Comentados",
    driveFolderUrl: "",
    additionalNotes: "Desejo focar na venda do produto low-ticket na primeira etapa com tráfego pago no Meta e Google Ads."
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: 1, title: "Dados do Cliente", icon: User, desc: "Identificação & Contatos" },
    { id: 2, title: "Acessos & Credenciais", icon: Key, desc: "Google & Meta Ads" },
    { id: 3, title: "Briefing PMMG Português", icon: BookOpen, desc: "Detalhes do Simulado" },
    { id: 4, title: "Envio & Confirmação", icon: Send, desc: "Gerar Briefing" }
  ];

  // Gerador de mensagem formatada para o WhatsApp da KrM Corp
  const generateWhatsAppMessage = () => {
    const text = `*📋 BRIEFING INICIAL DE PROJETO - KrM CORP*

*1. DADOS DO CLIENTE:*
• *Nome:* ${formData.clientName}
• *CPF:* ${formData.cpf}
• *Endereço:* ${formData.address}
• *E-mail:* ${formData.email || "Não informado"}
• *WhatsApp:* ${formData.whatsapp || "Não informado"}
• *Instagram:* ${formData.instagram || "Não informado"}
• *Projeto/Marca:* ${formData.brandName}

*2. ACESSOS & CREDENCIAIS TÉCNICAS:*
• *E-mail do Google:* ${formData.googleEmail || "Não informado"}
• *Senha do Google:* ${formData.googlePassword ? "•••••••• (Fornecida no formulário seguro)" : "A ser informada"}
• *Status Meta Ads:* ${formData.metaAdsAccess}
• *Checkout:* ${formData.checkoutPlatform} (${formData.checkoutUrl || "Link não informado"})

*3. BRIEFING DO PRODUTO (PMMG PORTUGUÊS):*
• *Produto:* ${formData.productName}
• *Valor Low-Ticket:* R$ ${formData.productPrice}
• *Banca:* ${formData.bancaExam}
• *Promessa Principal:* ${formData.headlinePromessa}
• *Diferenciais:* 
${formData.differentials}
• *Drive de Arquivos:* ${formData.driveFolderUrl || "Nenhum link anexado"}
• *Observações:* ${formData.additionalNotes || "Sem observações extra"}`;

    return encodeURIComponent(text);
  };

  // Gerador de PDF via jsPDF no Navegador
  const handleGeneratePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Cabeçalho
      doc.setFillColor(15, 23, 42); // #0F172A
      doc.rect(0, 0, 210, 35, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(217, 119, 6); // Amber Gold
      doc.text("KrM Corp", 105, 15, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(248, 250, 252);
      doc.text("BRIEFING DE ONBOARDING - PROJETO SIMULADOS PMMG PORTUGUÊS", 105, 25, { align: "center" });

      let currentY = 45;

      const addSectionTitle = (title: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFillColor(241, 245, 249);
        doc.rect(14, currentY - 4, 182, 7, "F");
        doc.text(title, 16, currentY);
        currentY += 10;
      };

      const addLine = (label: string, value: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(label, 16, currentY);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        const splitText = doc.splitTextToSize(value || "N/A", 120);
        doc.text(splitText, 70, currentY);
        currentY += (splitText.length * 5) + 3;
      };

      // Seção 1: Dados do Cliente
      addSectionTitle("1. IDENTIFICAÇÃO DO CLIENTE");
      addLine("Nome Completo:", formData.clientName);
      addLine("CPF:", formData.cpf);
      addLine("Endereço:", formData.address);
      addLine("E-mail de Contato:", formData.email);
      addLine("WhatsApp Comercial:", formData.whatsapp);
      addLine("Instagram:", formData.instagram);
      addLine("Nome do Projeto/Marca:", formData.brandName);

      currentY += 4;

      // Seção 2: Credenciais Técnicas
      addSectionTitle("2. CREDENCIAIS & ACESSOS");
      addLine("E-mail do Google:", formData.googleEmail);
      addLine("Senha do Google:", formData.googlePassword ? "(Informada de forma confidencial)" : "Não cadastrada");
      addLine("Status Meta Ads:", formData.metaAdsAccess);
      addLine("Plataforma Checkout:", formData.checkoutPlatform);
      addLine("URL do Checkout:", formData.checkoutUrl);

      currentY += 4;

      // Seção 3: Briefing do Produto
      addSectionTitle("3. BRIEFING DO PRODUTO (PMMG LÍNGUA PORTUGUESA)");
      addLine("Nome do Produto:", formData.productName);
      addLine("Preço (Low-Ticket):", `R$ ${formData.productPrice}`);
      addLine("Banca do Concurso:", formData.bancaExam);
      addLine("Promessa Principal:", formData.headlinePromessa);
      addLine("Drive de Materiais:", formData.driveFolderUrl);
      addLine("Observações Adicionais:", formData.additionalNotes);

      // Rodapé
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Documento de Briefing gerado pelo Sistema de Onboarding KrM Corp", 105, 285, { align: "center" });

      doc.save(`Briefing_PMMG_${formData.clientName.replace(/\s+/g, "_")}.pdf`);
      toast.success("PDF do Briefing gerado e baixado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao gerar o PDF.");
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedJSON(true);
    toast.success("Briefing em formato JSON copiado!");
    setTimeout(() => setCopiedJSON(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-x-hidden font-sans pb-24">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-slate-800/80 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 transition text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">KrM Corp</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                  Onboarding Oficial
                </span>
              </div>
              <p className="text-xs text-slate-400">Formulário de Briefing & Credenciais Iniciais</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400 border-l border-slate-800 pl-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ambiente Criptografado & Seguro</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-10">
        {/* Banner do Cliente */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <BookOpen className="w-40 h-40 text-amber-500" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 uppercase tracking-wider">
                Projeto 1 — Landing Page PMMG Língua Portuguesa
              </span>
              <span className="text-xs text-slate-400">Cliente: <strong className="text-slate-200">{formData.clientName}</strong></span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Briefing Inicial do Projeto & Cadastro de Acessos
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Preencha os campos abaixo com os dados necessários (e-mail do Google, WhatsApp, redes e detalhes do produto) para ativarmos o desenvolvimento da sua Landing Page e a estrutura de tráfego pago.
            </p>
          </div>
        </motion.div>

        {/* Stepper Progress */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
                  isActive 
                    ? "bg-amber-500/10 border-amber-500/50 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
                    : isCompleted 
                    ? "bg-slate-900/80 border-emerald-500/30 text-slate-300" 
                    : "bg-slate-900/40 border-slate-800 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1.5 rounded-lg ${
                    isActive ? "bg-amber-500 text-slate-950 font-bold" : isCompleted ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-semibold">Passo {step.id}</span>
                </div>
                <p className="text-xs font-bold truncate">{step.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{step.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Step Container */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Dados do Cliente */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0E1626]/90 border border-slate-800/80 backdrop-blur-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Etapa 1: Dados do Cliente & Contato Comercial</h2>
                  <p className="text-xs text-slate-400">Confirme suas informações pessoais e os canais oficiais de comunicação.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Nome Completo do Cliente *</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleChange("clientName", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    placeholder="Nome completo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">CPF *</label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleChange("cpf", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Endereço Residencial / Comercial</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    placeholder="Rua, número, complemento, bairro, cidade - UF"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">E-mail Principal para Notificações *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="seu.email@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">WhatsApp Comercial (com DDD) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange("whatsapp", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="(38) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Perfil do Instagram Comercial</label>
                  <div className="relative">
                    <Instagram className="w-4 h-4 text-pink-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => handleChange("instagram", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="@seu.perfil.pmmg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Nome do Projeto / Marca</label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => handleChange("brandName", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    placeholder="Ex: Português PMMG / Michel Santos Concursos"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
                >
                  <span>Acessos & Credenciais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Credenciais & Acessos Técnicos */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0E1626]/90 border border-slate-800/80 backdrop-blur-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Etapa 2: Acessos & Credenciais Técnicas (Ambiente Seguro)</h2>
                  <p className="text-xs text-slate-400">Dados para integração com ferramentas do Google (Google Ads/Analytics) e Meta Ads.</p>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-blue-300">Garantia de Sigilo & Segurança LGPD:</strong> Todas as credenciais fornecidas neste formulário são utilizadas exclusivamente pela equipe de engenharia e tráfego da <strong>KrM Corp</strong> para a criação e vínculo das contas de anúncio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">E-mail do Google (para Ads & Analytics) *</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.googleEmail}
                      onChange={(e) => handleChange("googleEmail", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="conta.google.ads@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Senha do E-mail Google (ou Senha de App temporária)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.googlePassword}
                      onChange={(e) => handleChange("googlePassword", e.target.value)}
                      className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Conta de Anúncios no Meta Ads (Instagram / Facebook)</label>
                  <select
                    value={formData.metaAdsAccess}
                    onChange={(e) => handleChange("metaAdsAccess", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                  >
                    <option value="quero_ajuda_krm">Quero que a KrM crie e configure a Gerenciador de Negócios (BM) para mim</option>
                    <option value="tenho_bm">Já possuo Business Manager (BM) ativa e enviarei o convite para a KrM</option>
                    <option value="login_direto">Enviarei o login e senha do Facebook/Instagram via WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Plataforma de Checkout Escolhida</label>
                  <select
                    value={formData.checkoutPlatform}
                    onChange={(e) => handleChange("checkoutPlatform", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                  >
                    <option value="Kiwify">Kiwify (Recomendado para Low-Ticket)</option>
                    <option value="Hotmart">Hotmart</option>
                    <option value="Eduzz">Eduzz</option>
                    <option value="Kirvano">Kirvano</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                    <option value="Outra">Outra plataforma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Link Direto do Checkout (se já criado)</label>
                  <input
                    type="text"
                    value={formData.checkoutUrl}
                    onChange={(e) => handleChange("checkoutUrl", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    placeholder="https://pay.kiwify.com.br/..."
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 text-sm transition"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
                >
                  <span>Briefing do Produto PMMG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Briefing Específico do Produto PMMG */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0E1626]/90 border border-slate-800/80 backdrop-blur-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Etapa 3: Briefing do Produto (Simulados PMMG Língua Portuguesa)</h2>
                  <p className="text-xs text-slate-400">Informações estratégicas sobre o material low-ticket e a proposta de valor.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Nome Comercial do Produto *</label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => handleChange("productName", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="Combo de Simulados PMMG Língua Portuguesa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Preço Low-Ticket (R$) *</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={formData.productPrice}
                        onChange={(e) => handleChange("productPrice", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm font-bold text-emerald-400 focus:outline-none focus:border-amber-500 transition"
                        placeholder="37,00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Promessa Principal / Headline de Vendas</label>
                  <input
                    type="text"
                    value={formData.headlinePromessa}
                    onChange={(e) => handleChange("headlinePromessa", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                    placeholder="Gabarite a Prova de Língua Portuguesa da PMMG..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Diferenciais Chave do Simulado</label>
                  <textarea
                    rows={3}
                    value={formData.differentials}
                    onChange={(e) => handleChange("differentials", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-xs leading-relaxed focus:outline-none focus:border-amber-500 transition"
                    placeholder="Questões comentadas, gabarito detalhado, raio-x da banca..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Principais Dores do Concurseiro PMMG</label>
                  <textarea
                    rows={3}
                    value={formData.painPoints}
                    onChange={(e) => handleChange("painPoints", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-xs leading-relaxed focus:outline-none focus:border-amber-500 transition"
                    placeholder="Medo da reprovação eliminatória, falta de tempo para teoria longa..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Link de Pasta no Google Drive (com artes/amostras se houver)</label>
                    <div className="relative">
                      <FolderOpen className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={formData.driveFolderUrl}
                        onChange={(e) => handleChange("driveFolderUrl", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                        placeholder="https://drive.google.com/drive/folders/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Banca / Foco do Concurso</label>
                    <input
                      type="text"
                      value={formData.bancaExam}
                      onChange={(e) => handleChange("bancaExam", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-sm focus:outline-none focus:border-amber-500 transition"
                      placeholder="CRS / PMMG"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Observações Adicionais para a Equipe KrM</label>
                  <textarea
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) => handleChange("additionalNotes", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-white text-xs focus:outline-none focus:border-amber-500 transition"
                    placeholder="Informações específicas sobre identidade visual ou campanhas de tráfego."
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 text-sm transition"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
                >
                  <span>Revisar & Finalizar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Envio & Confirmação */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0E1626]/90 border border-slate-800/80 backdrop-blur-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Etapa 4: Resumo & Envio do Briefing</h2>
                  <p className="text-xs text-slate-400">Revise os dados coletados e escolha o canal de envio para a KrM Corp.</p>
                </div>
              </div>

              {/* Resumo do Card */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 mb-6 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Cliente</span>
                  <strong className="text-sm text-white">{formData.clientName} ({formData.cpf})</strong>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400">E-mail do Google (Ads)</span>
                  <span className="text-xs text-amber-400 font-mono">{formData.googleEmail || "Não informado"}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Produto Low-Ticket</span>
                  <span className="text-xs text-emerald-400 font-bold">{formData.productName} — R$ {formData.productPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Plataforma & Tráfego</span>
                  <span className="text-xs text-slate-300">{formData.checkoutPlatform} | Tráfego Pago Meta/Google</span>
                </div>
              </div>

              {/* Ações de Envio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Botão WhatsApp */}
                <a
                  href={`https://wa.me/5538988450377?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs flex flex-col items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20 text-center"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Enviar Briefing via WhatsApp</span>
                </a>

                {/* Botão Gerar PDF */}
                <button
                  onClick={handleGeneratePDF}
                  className="p-4 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-xs flex flex-col items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 text-center"
                >
                  <Download className="w-5 h-5" />
                  <span>Baixar Briefing em PDF</span>
                </button>

                {/* Botão Copiar JSON */}
                <button
                  onClick={handleCopyJSON}
                  className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-xs flex flex-col items-center justify-center gap-2 transition border border-slate-700 text-center"
                >
                  {copiedJSON ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 text-slate-300" />}
                  <span>{copiedJSON ? "Copiado!" : "Copiar Dados em JSON"}</span>
                </button>
              </div>

              <div className="mt-8 flex justify-start">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 text-sm transition"
                >
                  Voltar para o Briefing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
