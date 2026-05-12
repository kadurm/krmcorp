import { motion } from "framer-motion";
import { Target, Database, Rocket } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "Infraestrutura & Tecnologia",
    subtitle: "Para empresas que precisam escalar com solidez.",
    description:
      "Desenvolvimento de soluções sob medida. Criamos e integramos CRMs White Label, E-commerces de alta conversão e sistemas operacionais que sustentam o crescimento da sua empresa, sem depender de plataformas engessadas.",
  },
  {
    icon: Target,
    title: "Estratégia & Posicionamento",
    subtitle: "Para quem busca virar autoridade incontestável.",
    description:
      "Redesenhamos a narrativa e o posicionamento de figuras públicas e corporações. Arquitetamos sua autoridade para que a percepção de mercado esteja perfeitamente alinhada com o valor real das suas soluções.",
  },
  {
    icon: Rocket,
    title: "Operação Full Stack & Articulação",
    subtitle: "Para quem precisa focar no que importa.",
    description:
      "Fazemos a engrenagem girar. Desde a concepção de criativos de alta performance e marketing básico até a articulação de parcerias estratégicas B2B. Uma operação fim-a-fim focada em resultados mensuráveis.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-32 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="line-gold mx-auto mb-6" />
          <p className="text-primary font-display tracking-[0.3em] uppercase text-sm mb-4">
            Pilares de Atuação
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold">
            Onde a estratégia encontra <span className="text-gradient-gold">execução</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-card/40 backdrop-blur-xl border border-white/5 rounded-xl p-8 hover:border-primary/40 hover:glow-gold transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle gradient overlay for extra depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <service.icon className="w-10 h-10 text-primary mb-6 relative z-10" strokeWidth={1} />
              <h3 className="font-display text-2xl font-semibold mb-3 relative z-10">{service.title}</h3>
              <p className="text-primary/70 text-sm font-medium mb-5 italic tracking-wide relative z-10">{service.subtitle}</p>
              <p className="text-muted-foreground text-base leading-relaxed relative z-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
