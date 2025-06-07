import { useState, useEffect } from "react";
import { getAllImagesFromFirebase, onStorageChange } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadImage } from "@/lib/image-utils";

interface Image {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  displayTitle?: string;
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Set up real-time listener for Firebase Storage changes
  useEffect(() => {
    setIsLoading(true);
    
    // Initial load of images
    const loadImages = async () => {
      try {
        const initialImages = await getAllImagesFromFirebase();
        setImages(initialImages);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load initial images:", err);
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Unknown error loading images"));
        setIsLoading(false);
      }
    };
    
    loadImages();
    
    // Set up real-time listener
    const unsubscribe = onStorageChange((updatedImages) => {
      setImages(updatedImages);
      setIsLoading(false);
    });
    
    // Clean up listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle image click
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };
  
  // Close the details modal
  const closeDetails = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-24 relative bg-gradient-to-br from-slate-900/30 via-indigo-900/10 to-slate-900/30">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/8 to-purple-500/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-pink-500/8 to-blue-500/5 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/6 to-purple-500/4 blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      </div>
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-slate-300">Community Creations</span>
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display gradient-text mb-6 tracking-tight">
            IconicDuo Gallery
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing character fusions created by our 
            <span className="gradient-text-accent font-semibold"> legendary </span>
            community
          </p>
        </div>
      
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="group relative modern-card overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/30">
                <div className="aspect-square overflow-hidden">
                  <Skeleton className="w-full h-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Skeleton className="h-3 w-full bg-slate-600/50 mb-2" />
                  <Skeleton className="h-3 w-2/3 bg-slate-600/50" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center p-12 max-w-lg mx-auto modern-card bg-gradient-to-br from-red-900/20 to-pink-900/20 border-red-500/30">
            <div className="text-6xl mb-6">💔</div>
            <h3 className="text-red-400 mb-4 font-display text-2xl">Gallery Unavailable</h3>
            <p className="text-slate-300 mb-2">We're having trouble loading the gallery right now</p>
            <p className="text-slate-400 text-sm">
              {error ? error.message : "Please try again later"}
            </p>
          </div>
        ) : images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {images.map((image: Image, index) => (
              <div 
                key={image.id} 
                className="group relative modern-card overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/20 hover:border-purple-500/40"
                onClick={() => handleImageClick(image)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={image.url} 
                    alt="IconicDuo creation" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover overlay with icons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium mb-1">IconicDuo Creation</p>
                  <p className="text-slate-300 text-xs">
                    {new Date(image.timestamp).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-16 max-w-xl mx-auto modern-card bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/20">
            <div className="text-8xl mb-8 animate-bounce">🎭</div>
            <h3 className="text-slate-200 mb-4 font-display text-3xl gradient-text">
              No Creations Yet
            </h3>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              Be the first to create an amazing IconicDuo fusion! 
              Your masterpiece could be the start of an incredible gallery.
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              onClick={() => {
                const element = document.getElementById("image-generator");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Create First IconicDuo
            </Button>
          </div>
        )}
      </div>
      
      {/* Image details modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background: 'hsl(var(--background) / 0.8)'}}>
          <div className="iconic-card max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              <button 
                className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center z-10 hover:bg-red-600 transition-colors"
                onClick={closeDetails}
              >
                ×
              </button>
              
              <div className="overflow-hidden max-h-[60vh] finger-gradient p-4">
                <img 
                  src={selectedImage.url} 
                  alt="ditofied image" 
                  className="w-full object-contain iconic-rounded finger-shadow"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-display gradient-text mb-2">
                  IconicDuo Creation
                </h3>
                <p className="text-sm text-hsl(var(--muted-foreground)) mb-6 font-mono">
                  Created: {new Date(selectedImage.timestamp).toLocaleString()}
                </p>
                
                <div className="flex gap-4">
                  <Button 
                    className="btn-accent"
                    onClick={() => downloadImage(selectedImage.url, `iconicduo-${selectedImage.id.split('/').pop() || 'creation'}`)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl"></div>
      </div>
    </section>
  );
}