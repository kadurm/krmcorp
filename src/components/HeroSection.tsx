import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/ApplicationModal";
import MagneticWrapper from "@/components/MagneticWrapper";
import heroBg from "@/assets/hero-bg.webp";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="sobre" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-40" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="line-gold mx-auto mb-8" />
          
          <motion.p 
            variants={itemVariants}
            className="text-primary font-display tracking-[0.3em] uppercase text-xs sm:text-sm mb-6"
          >
            Arquitetura de Ecossistemas & Articulação Corporativa
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-8"
          >
            Transformamos <span className="text-gradient-gold">influência</span> em
            <br />
            estrutura lucrativa
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Estratégia, articulação e execução para quem precisa converter autoridade em resultados financeiros reais. Sem ruído. Sem improviso.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticWrapper>
              <ApplicationModal
                trigger={
                  <Button variant="hero" size="lg" className="px-10 py-7 text-base uppercase tracking-widest">
                    Agendar Conversa
                  </Button>
                }
              />
            </MagneticWrapper>
            
            <MagneticWrapper strength={0.2}>
              <a href="#metodo">
                <Button variant="hero-outline" size="lg" className="px-10 py-7 text-base uppercase tracking-widest">
                  Conheça o Método
                </Button>
              </a>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;