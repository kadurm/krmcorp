import { motion } from "framer-motion";

const partners = [
  "CEPEL ARTE DECORE",
  "ORATÓRIA DÉLIO PINHEIRO",
  "SOLUTION PLACE",
  "INSTITUTO REGENERE",
  "FULLTIME ACADEMIA",
  "DCASTRO MKT",
  "V4 COMPANY",
  "CASTELO DO AÇAÍ",
  "ARQUITETE.AI",
  "CARRETEL AVIAMENTOS",
  "MIND GESTÃO EMPRESARIAL",
  "DIREITO DIRETO",
  "DR. YURI TELLES"
];

// Duplicar a lista para garantir um efeito infinito suave
const repeatedPartners = [...partners, ...partners];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-transparent border-y border-white/5 overflow-hidden flex flex-col items-center">
      <div className="container px-6 text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-display tracking-[0.3em] uppercase text-[10px] md:text-xs"
        >
          Empresas que confiam na nossa arquitetura
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Gradient Masks for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-16 md:gap-32 items-center whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {repeatedPartners.map((partner, index) => (
            <span
              key={`${partner}-${index}`}
              className="text-primary/20 font-display text-xl md:text-3xl font-bold tracking-[0.15em] hover:text-primary transition-all duration-700 cursor-default select-none uppercase"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
