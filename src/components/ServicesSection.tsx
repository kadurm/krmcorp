import { motion } from "framer-motion";
import { Target, Network, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Posicionamento Estratégico",
    subtitle: "Para quem é visto, mas não é percebido com profundidade.",
    description:
      "Redesenhamos a narrativa e o posicionamento de figuras públicas e empresas para que a percepção de mercado esteja alinhada com o valor real entregue. Autoridade não se constrói com volume — se constrói com precisão.",
  },
  {
    icon: Network,
    title: "Arquitetura de Ecossistemas",
    subtitle: "Para quem tem audiência, mas não tem estrutura.",
    description:
      "Projetamos e construimos ecossistemas de negócio que conectam produtos, serviços e parcerias de forma integrada. Cada peça gera receita e reforça as demais — sem dependência de uma única fonte.",
  },
  {
    icon: TrendingUp,
    title: "Articulação de Negócios",
    subtitle: "Para quem precisa de resultados, não de reuniões.",
    description:
      "Conectamos pessoas, oportunidades e capitais com foco em execução. Atuamos como articuladores entre as partes para viabilizar parcerias, acordos e operações que geram valor mensurável.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-32 relative">
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
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary/30 hover:glow-gold transition-all duration-500"
            >
              <service.icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-primary/80 text-sm font-medium mb-4 italic">{service.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
