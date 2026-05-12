import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  instagram: z.string().min(2, "Instagram inválido"),
  telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  email: z.string().email("E-mail inválido"),
  descricao: z.string().min(10, "Conte-nos um pouco mais sobre você ou sua empresa"),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationModalProps {
  trigger?: React.ReactNode;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  trigger,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      instagram: "",
      telefone: "",
      email: "",
      descricao: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
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
      form.reset();
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero" size="lg" className="px-12 py-6">
            Iniciar Conversa Estratégica
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-lg sm:max-w-md bg-background border-muted/20 mx-auto my-2 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="px-4 sm:px-6 pt-3 pb-1 border-b border-white/5">
          <DialogTitle className="text-lg sm:text-xl font-display text-center mb-0">
            Aplicação para Consultoria
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-[10px] sm:text-xs">
            Análise estratégica de perfil.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center space-y-2 px-6">
            <div className="text-2xl animate-bounce">✨</div>
            <h3 className="text-lg font-medium text-gradient-gold">Aplicação Recebida!</h3>
            <p className="text-muted-foreground text-xs">
              Entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5 mt-1 text-left px-6 pb-5">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" className="h-8 bg-muted/20 border-white/5 focus:border-primary/50 transition-colors text-xs" {...field} />
                    </FormControl>
                    <FormMessage className="text-[9px]" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="@perfil" className="h-8 bg-muted/20 border-white/5 focus:border-primary/50 transition-colors text-xs" {...field} />
                      </FormControl>
                      <FormMessage className="text-[9px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" className="h-8 bg-muted/20 border-white/5 focus:border-primary/50 transition-colors text-xs" {...field} />
                      </FormControl>
                      <FormMessage className="text-[9px]" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">E-mail Corporativo</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" type="email" className="h-8 bg-muted/20 border-white/5 focus:border-primary/50 transition-colors text-xs" {...field} />
                    </FormControl>
                    <FormMessage className="text-[9px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-[10px] uppercase tracking-wider opacity-70">Empresa / Projeto</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Ex: Preciso integrar toda minha operação..." 
                        className="min-h-[50px] bg-muted/20 border-white/5 focus:border-primary/50 transition-colors resize-none text-xs" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[9px]" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="hero"
                className="w-full mt-2 py-4 h-10 text-xs uppercase tracking-widest"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Aplicação"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
