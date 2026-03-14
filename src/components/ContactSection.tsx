import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="line-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
            Vamos conversar sobre
            <br />
            <span className="text-gradient-gold">o seu próximo nível</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para transformar sua visão em resultados.
            Conte-nos sobre seus desafios e oportunidades.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground text-xs mt-12 tracking-wider uppercase"
        >
          Resposta em até 24 horas úteis
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
