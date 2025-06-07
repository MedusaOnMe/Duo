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
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-500/10 blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-purple-400/40 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-blue-400/60 animate-float delay-500"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-pink-400/50 animate-float delay-1000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 circuit-pattern opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Pre-title badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-3 animate-pulse"></div>
              <span className="text-sm font-medium gradient-text-secondary">
                AI-Powered Character Fusion
              </span>
            </span>
          </div>

          {/* Main title with enhanced effects */}
          <h1 className="text-7xl md:text-9xl font-display gradient-text mb-8 tracking-tight relative">
            <span className="relative inline-block">
              IconicDuo
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl opacity-75"></div>
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-2xl md:text-4xl text-slate-300 mb-4 font-medium leading-relaxed">
            Merge two characters into 
            <span className="gradient-text-accent font-bold"> legendary </span>
            creations
          </p>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the magic of AI as it seamlessly blends iconic characters into stunning, 
            unique artwork that captures the essence of both worlds.
          </p>

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
                Create Iconic Duo
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
