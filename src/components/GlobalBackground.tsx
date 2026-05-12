import heroBg from "@/assets/hero-bg.webp";
import logoWatermark from "@/assets/LogoKrM_Final_Extreme.png";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
      {/* Mountain/Interconnections Pattern Layer (Lowest) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.05] grayscale brightness-[0.2]"
        />
      </div>

      {/* Watermark Logo Layer (Above Pattern) */}
      <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none z-10">
        <img
          src={logoWatermark}
          alt="Logo KrM Corp"
          className="w-full max-w-5xl object-contain opacity-[0.10]"
        />
      </div>

      {/* Darkening Gradient Overlay (Top of background) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/95 z-20" />
    </div>
  );
};


export default GlobalBackground;
