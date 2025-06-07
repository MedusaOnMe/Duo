import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToGenerator = () => {
    const element = document.getElementById("image-generator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl animate-pulse floating-orb"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/10 blur-3xl animate-pulse delay-1000 floating-orb"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-500/10 blur-3xl animate-pulse delay-2000 floating-orb"></div>
        
        {/* Moving particles - small */}
        <div className="absolute top-10 left-20 w-1 h-1 rounded-full bg-purple-400/60 moving-particle" style={{animationDelay: '0s', animationDuration: '8s'}}></div>
        <div className="absolute top-32 right-40 w-0.5 h-0.5 rounded-full bg-blue-400/70 moving-particle" style={{animationDelay: '1s', animationDuration: '10s'}}></div>
        <div className="absolute top-48 left-60 w-1.5 h-1.5 rounded-full bg-pink-400/50 moving-particle" style={{animationDelay: '2s', animationDuration: '12s'}}></div>
        <div className="absolute top-64 right-80 w-1 h-1 rounded-full bg-cyan-400/60 moving-particle" style={{animationDelay: '3s', animationDuration: '9s'}}></div>
        <div className="absolute top-80 left-32 w-0.5 h-0.5 rounded-full bg-indigo-400/70 moving-particle" style={{animationDelay: '4s', animationDuration: '11s'}}></div>
        
        {/* Moving particles - medium */}
        <div className="absolute bottom-20 right-32 w-2 h-2 rounded-full bg-purple-400/40 moving-particle" style={{animationDelay: '0.5s', animationDuration: '15s'}}></div>
        <div className="absolute bottom-40 left-48 w-1.5 h-1.5 rounded-full bg-blue-400/50 moving-particle" style={{animationDelay: '2.5s', animationDuration: '13s'}}></div>
        <div className="absolute bottom-60 right-64 w-1 h-1 rounded-full bg-pink-400/60 moving-particle" style={{animationDelay: '1.5s', animationDuration: '14s'}}></div>
        
        {/* Moving particles - large floating */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 floating-particle" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/40 to-cyan-400/40 floating-particle" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-2/3 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400/35 to-purple-400/35 floating-particle" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400/40 to-rose-400/40 floating-particle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/6 right-1/4 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400/50 to-blue-400/50 floating-particle" style={{animationDelay: '3s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 circuit-pattern opacity-30"></div>
        
        {/* Subtle moving lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent moving-line" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent moving-line" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-48 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/20 to-transparent moving-line" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-20">
        <div className="max-w-5xl mx-auto relative z-30">
          {/* Pre-title badge */}
          <div className="mb-12">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-3 animate-pulse"></div>
              <span className="text-sm font-medium gradient-text-secondary">
                AI-Powered Character Fusion
              </span>
            </span>
            
            {/* Site Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display mt-8 mb-6 tracking-tight relative z-20">
              <span className="relative inline-block z-30 gradient-text">
                IconicDuos
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-2xl opacity-75 -z-10"></div>
              </span>
            </h1>
          </div>

          {/* Main CTA title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-slate-200 mb-8 tracking-tight animate-text-glow">
            Create an Iconic Duo
          </h2>

          {/* Enhanced subtitle */}
          <p className="text-2xl md:text-4xl text-slate-300 mb-4 font-medium leading-relaxed animate-fade-in-up">
            Merge two characters into 
            <span className="gradient-text-accent font-bold animate-pulse-subtle"> iconic </span>
            creations
          </p>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            Experience the magic of AI as it seamlessly blends iconic characters into stunning, 
            unique artwork that captures the essence of both worlds.
          </p>

          {/* Example Image */}
          <div className="mb-12 animate-fade-in-delayed">
            <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-purple-500/20">
              <img 
                src="/main.png" 
                alt="Example of character fusion - two characters merged into one scene"
                className="max-w-full h-auto max-h-64 md:max-h-80 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
                  ✨ Example: Two characters seamlessly merged into one scene
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button
              onClick={scrollToGenerator}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl px-12 py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Create IconicDuos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
            
            <Button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className="group glass border-2 border-purple-500/30 text-slate-200 text-xl px-12 py-6 rounded-2xl font-semibold backdrop-blur-md hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Explore Gallery
              </span>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2 gradient-text">AI-Powered</h3>
              <p className="text-slate-400">Advanced AI technology creates seamless character fusions</p>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 gradient-text-accent">Lightning Fast</h3>
              <p className="text-slate-400">Generate stunning artwork in seconds, not hours</p>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-pink-500/5 to-transparent border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 gradient-text-secondary">Unique Results</h3>
              <p className="text-slate-400">Every creation is one-of-a-kind and perfectly blended</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
