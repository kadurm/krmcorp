import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}>
          
          <div className="line-gold mx-auto mb-8" />
          <p className="text-primary font-display tracking-[0.3em] uppercase text-sm mb-6">
            Arquitetura de Ecossistemas & Articulação Corporativa  
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-8">
            Transformamos <span className="text-gradient-gold">influência</span> em
            <br />
            estrutura lucrativa
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Estratégia, articulação e execução para quem precisa converter autoridade em resultados financeiros reais. Sem ruído. Sem improviso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="px-10 py-6">
              Agendar Conversa
            </Button>
            <Button variant="hero-outline" size="lg" className="px-10 py-6">
              Conheça o Método
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}>
        
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>);

};

export default HeroSection;