interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function CityHero({ title, subtitle, image }: HeroProps) {
  return (
    <header 
      className="relative w-full h-[600px] bg-cover bg-center flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-8xl font-extralight tracking-[15px] uppercase mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg tracking-[4px] uppercase pt-4 border-t border-white/50 inline-block">
          {subtitle}
        </p>
      </div>
    </header>
  );
}