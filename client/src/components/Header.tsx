import { Link } from "wouter";
import { useState, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-slate-900/80 border-b border-purple-500/20 shadow-lg shadow-purple-500/10' 
        : 'backdrop-blur-sm bg-slate-900/20 border-b border-slate-700/20'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="group flex items-center gap-4 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/40">
                <span className="text-2xl filter drop-shadow-sm">⚡</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold gradient-text leading-tight">
                IconicDuos
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wider">
                AI CHARACTER FUSION
              </span>
            </div>
          </Link>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="group relative px-6 py-3 text-slate-200 hover:text-white transition-all duration-300 font-medium rounded-xl hover:bg-purple-500/10"
            >
              <span className="relative z-10">Create</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 rounded-xl transition-all duration-300"></div>
            </Link>
            <Link
              href="/gallery"
              className="group relative px-6 py-3 text-slate-200 hover:text-white transition-all duration-300 font-medium rounded-xl hover:bg-blue-500/10"
            >
              <span className="relative z-10">Gallery</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300"></div>
            </Link>
            
            {/* Social Icon */}
            <div
              className="group ml-4 p-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
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
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden group p-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 hover:scale-110"
            onClick={onMenuClick}
          >
            <svg
              className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
