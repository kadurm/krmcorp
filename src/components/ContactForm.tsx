"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ContactFormProps {
  destinationEmail?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ destinationEmail = "contato@krmcorp.com" }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nome: data.name,
          Email: data.email,
          Empresa: data.company,
          Mensagem: data.message,
          _subject: "📬 Novo Contato - KRM Corp",
          _template: "table",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center"
            >
              <p className="text-green-400 font-medium">
                ✨ Mensagem enviada com sucesso! Entraremos em contato em breve.
              </p>
            </motion.div>
          )}

          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center"
            >
              <p className="text-red-400 font-medium">
                Algo deu errado. Por favor, tente novamente.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Nome é obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter pelo menos 2 caracteres",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/90">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome completo"
                      className="bg-muted/30 border-muted/40 focus:border-primary/50 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/90">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-muted/30 border-muted/40 focus:border-primary/50 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            rules={{
              required: "Empresa é obrigatória",
              minLength: {
                value: 2,
                message: "Empresa deve ter pelo menos 2 caracteres",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Empresa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome da sua empresa"
                    className="bg-muted/30 border-muted/40 focus:border-primary/50 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            rules={{
              required: "Mensagem é obrigatória",
              minLength: {
                value: 10,
                message: "Mensagem deve ter pelo menos 10 caracteres",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90">Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva sua necessidade ou projeto..."
                    className="min-h-[140px] bg-muted/30 border-muted/40 focus:border-primary/50 transition-colors resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full py-6 text-md tracking-wide"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Enviando...
              </span>
            ) : (
              "Enviar Mensagem"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
