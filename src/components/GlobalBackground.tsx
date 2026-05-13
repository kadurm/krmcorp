import heroBg from "@/assets/hero-bg.webp";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
      {/* 1. Pattern Layer (Deepest) */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.03] grayscale brightness-[0.1] z-0"
      />

      {/* 2. Logo Layer (Middle) */}
      <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-20 pointer-events-none z-10">
        <img
          src="/LogoKrM.PNG"
          alt="Logo KrM Corp"
          className="w-full max-w-4xl object-contain opacity-[0.15]"
        />
      </div>

      {/* 3. Gradient Overlay (Top of Background) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-20" />
    </div>
  );
};

export default GlobalBackground;
