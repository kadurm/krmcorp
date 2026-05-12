import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Mapeamento profundo do seu cenário atual. Identificamos gargalos técnicos, posicionamento de marca, qualidade da audiência e oportunidades imediatas de alavancagem.",
  },
  {
    number: "02",
    title: "Arquitetura",
    description: "Desenho do ecossistema perfeito. Estruturamos as rotas de monetização, definimos a infraestrutura ideal e construímos a narrativa que o seu mercado precisa ouvir.",
  },
  {
    number: "03",
    title: "Articulação",
    description: "Conexão das pontas soltas. Negociação de acordos estratégicos, validação de parceiros e viabilização técnica para que o projeto saia do papel com precisão.",
  },
  {
    number: "04",
    title: "Execução & Escala",
    description: "Implementação rigorosa. Acompanhamento em tempo real, ajustes de performance contínuos e expansão sustentável da sua margem de lucro.",
  },
];

const MethodologySection = () => {
  return (
    <section id="metodo" className="py-32 bg-card/30 backdrop-blur-sm relative">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="line-gold mx-auto mb-6" />
          <p className="text-primary font-display tracking-[0.3em] uppercase text-sm mb-4">
            Metodologia
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold">
            Como entregamos <span className="text-gradient-gold">resultados</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 md:gap-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-primary font-display text-5xl font-bold opacity-20">{step.number}</span>
                  <h3 className="font-display text-2xl font-semibold -mt-2 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm inline-block">
                    {step.description}
                  </p>
                </div>

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background mt-2" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
