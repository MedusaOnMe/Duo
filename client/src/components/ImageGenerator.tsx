import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { downloadImage } from "@/lib/image-utils";
import { uploadImageToFirebase, onStorageChange } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";

// Interface for image data
interface ImageData {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export default function ImageGenerator() {
  const [imageFile1, setImageFile1] = useState<File | null>(null);
  const [imagePreview1, setImagePreview1] = useState<string | null>(null);
  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Set up real-time listener for the latest images
  useEffect(() => {
    const unsubscribe = onStorageChange((images) => {
      if (images && images.length > 0) {
        const latestImage = images[0];
        setCurrentImage(latestImage);
        setIsUpdating(false);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Cleanup function for when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (imagePreview1) {
        URL.revokeObjectURL(imagePreview1);
      }
      if (imagePreview2) {
        URL.revokeObjectURL(imagePreview2);
      }
    };
  }, [imagePreview1, imagePreview2]);
  
  // Dual image processing mutation
  const processMutation = useMutation({
    mutationFn: async () => {
      setIsUpdating(true);
      
      if (!imageFile1 || !imageFile2) {
        throw new Error("Both images are required");
      }
      
      const formData = new FormData();
      formData.append("image1", imageFile1);
      formData.append("image2", imageFile2);
      
      // Hardcoded prompt for combining two images
      const hardcodedPrompt = "Create a stunning artistic scene that seamlessly combines these two characters into one cohesive image. The characters should appear naturally together in various poses like standing side by side, sitting on a bench, in a car, at a diner, or any other natural setting. Make it look like they belong in the same world and are interacting in a believable way.";
      
      formData.append("prompt", hardcodedPrompt);
      
      const response = await fetch("/api/images/combine", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to process images");
      }
      
      return response.json();
    },
    onSuccess: async (data) => {
      if (data?.url) {
        try {
          const imageResponse = await fetch(data.url);
          if (!imageResponse.ok) {
            throw new Error(`Failed to fetch processed image: ${imageResponse.statusText}`);
          }
          
          const imageBlob = await imageResponse.blob();
          const stableUrl = URL.createObjectURL(imageBlob);
          
          try {
            await uploadImageToFirebase(stableUrl, "IconicDuo Creation");
          } finally {
            URL.revokeObjectURL(stableUrl);
          }
        } catch (error) {
          console.error("Failed to upload image to Firebase:", error);
          setIsUpdating(false);
        }
      }
    },
    onError: (error) => {
      setIsUpdating(false);
      toast.error({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process images"
      });
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile1 || !imageFile2) {
      toast.error({
        title: "Missing Images",
        description: "Please upload both images before creating your IconicDuos"
      });
      return;
    }
    
    setIsUpdating(true);
    processMutation.reset();
    processMutation.mutate();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
    const file = e.target.files?.[0] || null;
    
    const currentPreview = imageNumber === 1 ? imagePreview1 : imagePreview2;
    if (currentPreview) {
      URL.revokeObjectURL(currentPreview);
      if (imageNumber === 1) {
        setImagePreview1(null);
      } else {
        setImagePreview2(null);
      }
    }
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error({
          title: "Invalid file type",
          description: `File type ${file.type} is not a supported image format`
        });
        return;
      }
      
      const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
      if (file.size > maxSizeInBytes) {
        toast.error({
          title: "File too large",
          description: `Image is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 4MB.`
        });
        return;
      }
      
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          toast.error({
            title: "Invalid image",
            description: "Unable to load image. The file may be corrupted or not a valid image."
          });
        };
        
        img.onload = () => {
          if (imageNumber === 1) {
            setImageFile1(file);
            setImagePreview1(objectUrl);
          } else {
            setImageFile2(file);
            setImagePreview2(objectUrl);
          }
        };
        
        img.src = objectUrl;
      } catch (error) {
        toast.error({
          title: "Error processing image",
          description: "An error occurred while processing the image file."
        });
      }
    } else {
      if (imageNumber === 1) {
        setImageFile1(null);
        setImagePreview1(null);
      } else {
        setImageFile2(null);
        setImagePreview2(null);
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };
  
  const handleDrop = (e: React.DragEvent, imageNumber: 1 | 2) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0] || null;
    
    const currentPreview = imageNumber === 1 ? imagePreview1 : imagePreview2;
    if (currentPreview) {
      URL.revokeObjectURL(currentPreview);
      if (imageNumber === 1) {
        setImagePreview1(null);
      } else {
        setImagePreview2(null);
      }
    }
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error({
          title: "Invalid file type",
          description: `File type ${file.type} is not a supported image format`
        });
        return;
      }
      
      const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
      if (file.size > maxSizeInBytes) {
        toast.error({
          title: "File too large",
          description: `Image is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 4MB.`
        });
        return;
      }
      
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          toast.error({
            title: "Invalid image",
            description: "Unable to load image. The file may be corrupted or not a valid image."
          });
        };
        
        img.onload = () => {
          if (imageNumber === 1) {
            setImageFile1(file);
            setImagePreview1(objectUrl);
          } else {
            setImageFile2(file);
            setImagePreview2(objectUrl);
          }
        };
        
        img.src = objectUrl;
      } catch (error) {
        toast.error({
          title: "Error processing image",
          description: "An error occurred while processing the dropped image file."
        });
      }
    } else {
      if (imageNumber === 1) {
        setImageFile1(null);
        setImagePreview1(null);
      } else {
        setImageFile2(null);
        setImagePreview2(null);
      }
    }
  };

  return (
    <section id="image-generator" className="py-24 relative bg-gradient-to-br from-slate-900/50 via-purple-900/10 to-slate-900/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/5 blur-3xl"></div>
        <div className="absolute inset-0 dot-pattern opacity-20"></div>
      </div>
      
      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-slate-300">AI Character Fusion Engine</span>
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display gradient-text mb-6 tracking-tight animate-gradient-shift">
            Create Your IconicDuos
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Upload two character images and watch as AI seamlessly merges them into one 
            <span className="gradient-text-accent font-semibold animate-pulse-subtle"> iconic </span>
            scene
          </p>
          
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Our advanced AI technology analyzes both characters and creates natural, believable interactions between them
          </p>
        </div>
        
        {/* Enhanced Main Card */}
        <Card className="modern-card backdrop-blur-2xl border-purple-500/20 shadow-2xl shadow-purple-500/10">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Upload Section with enhanced design */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* First Image Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                    <Label htmlFor="upload-image1" className="text-xl font-display gradient-text">
                      First Character
                    </Label>
                  </div>
                  
                  <div 
                    className={`group relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 ${
                      dragActive 
                        ? 'border-purple-400 bg-purple-500/10 scale-105' 
                        : imagePreview1 
                          ? 'border-green-400 bg-green-500/10 shadow-lg shadow-green-500/20' 
                          : 'border-slate-600 hover:border-purple-400 hover:bg-purple-500/5 hover:scale-105'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 1)}
                  >
                    {imagePreview1 ? (
                      <div className="relative">
                        <img 
                          src={imagePreview1} 
                          alt="Character 1" 
                          className="max-h-56 mx-auto rounded-xl shadow-2xl border border-white/10"
                        />
                        <button 
                          type="button"
                          className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg z-10"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (imagePreview1) {
                              URL.revokeObjectURL(imagePreview1);
                            }
                            setImageFile1(null);
                            setImagePreview1(null);
                            if (fileInputRef1.current) fileInputRef1.current.value = '';
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                      </div>
                    ) : (
                      <>
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎭</div>
                        <h3 className="text-xl font-display gradient-text mb-3">Drop your first character</h3>
                        <p className="text-slate-400 mb-6 text-sm">Drag & drop or click to browse</p>
                        <button 
                          type="button" 
                          className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                          onClick={() => fileInputRef1.current?.click()}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Choose Image
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </>
                    )}
                    <input 
                      ref={fileInputRef1}
                      id="upload-image1" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 1)}
                    />
                  </div>
                </div>

                {/* Second Image Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                    <Label htmlFor="upload-image2" className="text-xl font-display gradient-text-accent">
                      Second Character
                    </Label>
                  </div>
                  
                  <div 
                    className={`group relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 ${
                      dragActive 
                        ? 'border-blue-400 bg-blue-500/10 scale-105' 
                        : imagePreview2 
                          ? 'border-green-400 bg-green-500/10 shadow-lg shadow-green-500/20' 
                          : 'border-slate-600 hover:border-blue-400 hover:bg-blue-500/5 hover:scale-105'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 2)}
                  >
                    {imagePreview2 ? (
                      <div className="relative">
                        <img 
                          src={imagePreview2} 
                          alt="Character 2" 
                          className="max-h-56 mx-auto rounded-xl shadow-2xl border border-white/10"
                        />
                        <button 
                          type="button"
                          className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg z-10"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (imagePreview2) {
                              URL.revokeObjectURL(imagePreview2);
                            }
                            setImageFile2(null);
                            setImagePreview2(null);
                            if (fileInputRef2.current) fileInputRef2.current.value = '';
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                      </div>
                    ) : (
                      <>
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎪</div>
                        <h3 className="text-xl font-display gradient-text-accent mb-3">Drop your second character</h3>
                        <p className="text-slate-400 mb-6 text-sm">Drag & drop or click to browse</p>
                        <button 
                          type="button" 
                          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                          onClick={() => fileInputRef2.current?.click()}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Choose Image
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </>
                    )}
                    <input 
                      ref={fileInputRef2}
                      id="upload-image2" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 2)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Merge Button */}
              <div className="relative">
                <Button 
                  type="submit" 
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white text-xl font-display py-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100"
                  disabled={processMutation.isPending || !imageFile1 || !imageFile2}
                >
                  {processMutation.isPending ? (
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating your legendary duo...</span>
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Fuse Characters</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                
                {(!imageFile1 || !imageFile2) && (
                  <p className="text-center text-slate-400 text-sm mt-3">
                    Upload both characters to enable fusion
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Result Display */}
        <div className="mt-8">
          <Card className="glass border-border/20">
            <CardContent className="p-8">
              {processMutation.isPending || isUpdating ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h4 className="text-lg font-display gradient-text mb-2">Creating your IconicDuos...</h4>
                  <p className="text-muted-foreground">This may take a moment as we merge your characters seamlessly</p>
                </div>
              ) : processMutation.isError ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">💔</div>
                  <h4 className="text-lg font-display text-red-400 mb-2">Oops! Something went wrong</h4>
                  <p className="text-muted-foreground">
                    {processMutation.error instanceof Error ? processMutation.error.message : "An unexpected error occurred"}
                  </p>
                </div>
              ) : processMutation.data ? (
                <div className="text-center">
                  <div className="inline-block rounded-lg overflow-hidden p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 shadow-lg">
                    <img 
                      src={processMutation.data?.url} 
                      alt="IconicDuos Creation"
                      className="max-w-full max-h-96 rounded-lg"
                    />
                  </div>
                  
                  {/* Download Button */}
                  <div className="mt-6">
                    <button 
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
                      onClick={async () => {
                        try {
                          const imageUrl = processMutation.data?.url;
                          const imageId = processMutation.data?.id || 'iconicduo';
                          
                          if (!imageUrl) {
                            toast.error({
                              title: "Download failed",
                              description: "No image URL available for download"
                            });
                            return;
                          }
                          
                          await downloadImage(imageUrl, `iconicduo-${imageId}`);
                          
                          toast.success({
                            title: "Download successful!",
                            description: "Your IconicDuos creation has been saved"
                          });
                        } catch (error) {
                          toast.error({
                            title: "Download failed",
                            description: error instanceof Error ? error.message : "Failed to download image"
                          });
                        }
                      }}
                    >
                      Download IconicDuos
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">👥</div>
                  <h4 className="text-xl font-display gradient-text mb-2">Ready to create your IconicDuos?</h4>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Upload two character images and let AI create a stunning merged scene
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}