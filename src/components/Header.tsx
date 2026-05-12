import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import ApplicationModal from "@/components/ApplicationModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Método", href: "#metodo" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5" : "py-2"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-display text-2xl tracking-tighter text-foreground group">
          <span className="text-gradient-gold font-bold transition-all duration-300 group-hover:glow-gold">KrM</span>
          <span className="text-muted-foreground/40 font-light ml-1">Corp</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <ApplicationModal
            trigger={
              <button className="text-muted-foreground hover:text-primary text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300">
                Contato
              </button>
            }
          />
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-white/5 w-[300px]">
              <SheetHeader className="text-left mb-10">
                <SheetTitle className="font-display text-2xl">
                  <span className="text-gradient-gold font-bold">KrM</span> Corp
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border-b border-white/5 pb-2"
                  >
                    {link.name}
                  </a>
                ))}
                <ApplicationModal
                  trigger={
                    <button className="text-left text-muted-foreground hover:text-primary text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border-b border-white/5 pb-2">
                      Contato
                    </button>
                  }
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
