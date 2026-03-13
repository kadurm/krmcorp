import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CTASection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ⚠️ MUITO IMPORTANTE: Mude para o seu e-mail real aqui embaixo:
  const DESTINATION_EMAIL = "SEU_EMAIL_AQUI@gmail.com"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Captura todos os dados preenchidos no formulário
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Envia os dados para o FormSubmit usando AJAX
      const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nome: data.nome,
          Instagram: data.instagram,
          Telefone: data.telefone,
          Email: data.email,
          "O que faz atualmente": data.descricao,
          _subject: "🚀 Nova Aplicação de Consultoria - KRM Corp", 
          _template: "table" 
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Oculta a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        alert("Houve um erro ao enviar. Por favor, tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 relative">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="line-gold mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
            Pronto para converter
            <br />
            <span className="text-gradient-gold">autoridade em lucratividade?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            O primeiro passo é uma conversa estratégica. Sem compromisso, sem script — apenas uma análise direta do seu cenário atual e das oportunidades que você ainda não está capturando.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg" className="px-12 py-6">
                Iniciar Conversa Estratégica
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-background border-muted/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-center mb-2">Apl