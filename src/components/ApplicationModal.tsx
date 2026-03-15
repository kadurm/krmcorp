import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ApplicationModalProps {
  trigger?: React.ReactNode;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  trigger,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const message = `🚀 Nova Aplicação de Consultoria - KRM Corp

Nome: ${data.nome}
Instagram: ${data.instagram}
Telefone: ${data.telefone}
Email: ${data.email}
O que faz atualmente: ${data.descricao}`;

    const whatsappUrl = `https://wa.me/5538988450377?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setOpen(false);
    }, 3000);

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger || (
          <Button variant="hero" size="lg" className="px-12 py-6">
            Iniciar Conversa Estratégica
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-lg sm:max-w-md bg-background border-muted/20 mx-auto my-4 sm:my-8 p-0 overflow-hidden">
        <DialogHeader className="px-4 sm:px-6 pt-4 pb-2">
          <DialogTitle className="text-lg sm:text-xl font-display text-center mb-1">
            Aplicação para Consultoria
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-xs sm:text-sm">
            Preencha os dados abaixo para analisarmos seu perfil.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 sm:py-8 text-center space-y-3 px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl">✨</div>
            <h3 className="text-base sm:text-lg font-medium text-gradient-gold">Aplicação Recebida!</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Analisaremos seu perfil e entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-2 text-left px-4 sm:px-6 pb-6">
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />

            <div className="space-y-1">
              <Label htmlFor="nome" className="text-xs">Nome Completo</Label>
              <Input
                id="nome"
                name="nome"
                required
                placeholder="Digite seu nome completo"
                className="bg-muted/50 h-9 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="instagram" className="text-xs">@ do Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  required
                  placeholder="@seu.perfil"
                  className="bg-muted/50 h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="telefone" className="text-xs">WhatsApp / Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  required
                  placeholder="(00) 00000-0000"
                  className="bg-muted/50 h-9 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="bg-muted/50 h-9 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="descricao" className="text-xs">Quem é você e o que faz atualmente?</Label>
              <Textarea
                id="descricao"
                name="descricao"
                required
                placeholder="Descreva brevemente sua atuação..."
                className="min-h-[70px] sm:min-h-[80px] bg-muted/50 resize-none text-sm"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full mt-4 py-4 sm:py-5 text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando aplicação..." : "Enviar Aplicação"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
