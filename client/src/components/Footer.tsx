import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-purple-500/20 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/3 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/3 blur-3xl"></div>
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Enhanced Logo Section */}
          <div className="flex-1">
            <Link href="/" className="group flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <span className="text-xl">⚡</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"></div>
              </div>
              <div>
                <span className="font-display text-2xl font-bold gradient-text">
                  IconicDuos
                </span>
                <div className="text-xs text-slate-400 font-medium tracking-wider">
                  AI CHARACTER FUSION
                </div>
              </div>
            </Link>
            
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Create stunning character fusions with the power of AI. 
              Merge your favorite characters into legendary, one-of-a-kind artwork.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <div
                className="group p-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <h3 className="font-display text-lg font-semibold gradient-text mb-4">Create</h3>
              <div className="space-y-3">
                <Link 
                  href="/" 
                  className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1"
                >
                  Character Fusion
                </Link>
                <div className="text-slate-500 text-sm">AI Image Generator</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-lg font-semibold gradient-text-accent mb-4">Explore</h3>
              <div className="space-y-3">
                <Link 
                  href="/gallery" 
                  className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1"
                >
                  Gallery
                </Link>
                <div className="text-slate-500 text-sm">Community Creations</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-lg font-semibold gradient-text-secondary mb-4">Features</h3>
              <div className="space-y-3">
                <div className="text-slate-300">AI-Powered</div>
                <div className="text-slate-300">Lightning Fast</div>
                <div className="text-slate-300">High Quality</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-12"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm mb-2">
              © {currentYear} IconicDuos. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              Powered by advanced AI technology for character fusion and creative expression.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <span className="text-slate-400">Made with</span>
            <div className="flex items-center gap-2">
              <span className="text-red-400 animate-pulse">❤️</span>
              <span className="text-slate-400">and AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}