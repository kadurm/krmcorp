import heroBg from "@/assets/hero-bg.webp";
import logoWatermark from "@/assets/LogoKrM_Final_Extreme.png";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
      {/* Mountain/Interconnections Pattern Layer */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.05] grayscale brightness-[0.2]"
        />
      </div>

      {/* Watermark Logo Layer */}
      <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
        <img
          src={logoWatermark}
          alt=""
          className="w-full max-w-5xl object-contain opacity-[0.12]"
        />
      </div>

      {/* Darkening Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/90" />
      
      {/* Subtle Noise or Texture could be added here if needed */}
    </div>
  );
};

export default GlobalBackground;
