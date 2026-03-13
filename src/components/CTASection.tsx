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
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
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
                <DialogTitle className="text-2xl font-display text-center mb-2">Aplicação para Consultoria</DialogTitle>
                <DialogDescription className="text-center text-muted-foreground">
                  Preencha os dados abaixo para analisarmos seu perfil e ecossistema antes da nossa conversa.
                </DialogDescription>
              </DialogHeader>

              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="text-4xl">✨</div>
                  <h3 className="text-xl font-medium text-gradient-gold">Aplicação Recebida!</h3>
                  <p className="text-muted-foreground">
                    Analisaremos seu perfil e entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 mt-4 text-left">
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" name="nome" required placeholder="Digite seu nome completo" className="bg-muted/50" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">@ do Instagram</Label>
                      <Input id="instagram" name="instagram" required placeholder="@seu.perfil" className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">WhatsApp / Telefone</Label>
                      <Input id="telefone" name="telefone" required placeholder="(00) 00000-0000" className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" required placeholder="seu@email.com" className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Quem é você e o que faz atualmente?</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      required
                      placeholder="Descreva brevemente sua atuação, modelo de negócio e principal objetivo hoje..."
                      className="min-h-[120px] bg-muted/50 resize-none"
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full mt-6 py-6 text-md" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando aplicação..." : "Enviar Aplicação"}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <p className="text-muted-foreground text-xs mt-6 tracking-wider uppercase">
            Atendimento exclusivo · Vagas limitadas
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;