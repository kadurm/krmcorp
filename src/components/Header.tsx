import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApplicationModal from "@/components/ApplicationModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""}`
      }>

      <div className="container max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-display text-lg tracking-wider text-foreground">
          <span className="text-gradient-gold font-semibold">KrM</span>
        </span>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#sobre"
            className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300"
          >
            Sobre
          </a>
          <a
            href="#servicos"
            className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300"
          >
            Serviços
          </a>
          <a
            href="#metodo"
            className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300"
          >
            Método
          </a>
          <ApplicationModal
            trigger={
              <button className="text-muted-foreground hover:text-foreground text-xs tracking-[0.2em] uppercase transition-colors duration-300">
                Contato
              </button>
            }
          />
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
