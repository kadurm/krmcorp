import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => {
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
          <Button variant="hero" size="lg" className="px-12 py-6">
            Iniciar Conversa Estratégica
          </Button>
          <p className="text-muted-foreground text-xs mt-6 tracking-wider uppercase">
            Atendimento exclusivo · Vagas limitadas
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
