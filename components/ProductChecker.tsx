import React, { useState, useRef, useEffect } from 'react';
import { checkProduct } from '../services/geminiService';
import { GradeResult } from '../types';

export const ProductChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (showCamera) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'environment',
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            } 
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera Error:", err);
          setError("Could not access camera. Please check permissions.");
          setShowCamera(false);
        }
      };
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [showCamera]);

  const toggleFlash = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    const capabilities = track.getCapabilities() as any;
    
    if (capabilities.torch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !isFlashOn } as any]
        });
        setIsFlashOn(!isFlashOn);
      } catch (err) {
        console.error("Flash error:", err);
      }
    } else {
      console.log("Torch not supported on this device");
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
        setShowCamera(false);
        analyzeImage(imageBase64);
      }
    }
  };

  const analyzeImage = async (base64: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await checkProduct(input, base64);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Analysis failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkProduct(input);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
     if (['A', 'B'].includes(grade)) return 'text-green-600 border-green-200 bg-green-50';
     if (['C'].includes(grade)) return 'text-yellow-600 border-yellow-200 bg-yellow-50';
     return 'text-red-600 border-red-200 bg-red-50';
  };

  const getScoreWidth = (score: number) => `${Math.max(5, score)}%`;

  if (showCamera) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden touch-none">
        <div className="relative flex-1 bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-black/40"></div>
            <div className="flex flex-row h-56">
               <div className="flex-1 bg-black/40"></div>
               <div className="w-72 relative">
                  <div className="absolute inset-0 border border-white/20 rounded-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/40 shadow-[0_0_15px_white] animate-[scan_3s_ease-in-out_infinite]"></div>
                  </div>
               </div>
               <div className="flex-1 bg-black/40"></div>
            </div>
            <div className="flex-1 bg-black/40 flex flex-col items-center pt-8">
               <p className="text-white text-sm font-medium tracking-wide bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                 Position label or barcode within frame
               </p>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none">
             <button 
               onClick={toggleFlash}
               className="w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full text-white pointer-events-auto active:scale-90 transition-transform"
               title="Toggle Flash"
             >
               <svg className={`w-6 h-6 ${isFlashOn ? 'text-yellow-400' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
                 <path d="M13 2L3 14h7v8l10-12h-7z" />
               </svg>
             </button>

             <button 
               onClick={() => setShowCamera(false)}
               className="w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full text-white pointer-events-auto active:scale-90 transition-transform"
               title="Close Camera"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
          </div>
        </div>
        
        <div className="h-40 bg-black flex flex-col items-center justify-center pb-safe px-8 relative">
           <button 
             onClick={handleCapture}
             className="relative w-20 h-20 flex items-center justify-center group"
           >
              <div className="absolute inset-0 rounded-full border-4 border-white/30 group-active:scale-95 transition-transform"></div>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg group-active:scale-90 transition-transform"></div>
           </button>
           <span className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Capture to Scan</span>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />

        <style>{`
          @keyframes scan {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
       <div className="space-y-2">
          <h2 className="text-2xl font-serif text-forest-900">Scan & Check</h2>
          <p className="text-earth-700 text-sm">
            Scan a fabric label or type a product name to get its sustainability grade.
          </p>
       </div>

       <div className="grid grid-cols-1 gap-4">
         <button 
           onClick={() => setShowCamera(true)}
           className="group flex items-center justify-center gap-4 p-5 bg-forest-800 text-white rounded-2xl shadow-xl active:bg-forest-900 active:scale-[0.98] transition-all duration-200"
         >
           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
           </div>
           <div className="text-left">
             <span className="block font-bold text-lg leading-none mb-1">Open Scanner</span>
             <span className="block text-xs text-forest-200 font-medium">Automatic detection</span>
           </div>
         </button>

         <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-earth-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-earth-50 px-3 text-[10px] font-bold text-earth-400 uppercase tracking-widest">Or enter manually</span>
            </div>
         </div>

         <form onSubmit={handleTextSubmit} className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Uniqlo Linen Shirt"
              className="flex-1 p-4 rounded-xl border border-earth-300 bg-white shadow-inner focus:ring-2 focus:ring-forest-500 focus:outline-none placeholder:text-earth-400"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 bg-earth-200 text-forest-900 rounded-xl font-bold hover:bg-earth-300 disabled:opacity-50 transition-colors"
            >
              Analyze
            </button>
         </form>
       </div>

       {isLoading && (
         <div className="py-12 flex flex-col items-center justify-center text-forest-700">
           <div className="relative w-12 h-12 mb-4">
             <div className="absolute inset-0 rounded-full border-4 border-forest-100"></div>
             <div className="absolute inset-0 rounded-full border-4 border-forest-600 border-t-transparent animate-spin"></div>
           </div>
           <p className="text-sm font-bold tracking-wide uppercase opacity-70">Consulting ClearTag AI...</p>
         </div>
       )}

       {error && (
         <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
         </div>
       )}

       {result && (
         <div className="bg-white rounded-2xl shadow-xl border border-earth-200 overflow-hidden animate-slide-up">
            <div className="p-6 space-y-6">
               <div className="flex items-start justify-between gap-4">
                  <div className={`w-20 h-20 flex-shrink-0 rounded-2xl border-2 flex items-center justify-center text-4xl font-serif font-bold ${getGradeColor(result.grade)}`}>
                     {result.grade}
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <h3 className="text-xl font-bold text-forest-900 leading-tight break-words line-clamp-3 mb-1">
                      {result.productName || 'Analysis Result'}
                    </h3>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span className="text-[10px] font-bold text-earth-400 uppercase">Fiber Score</span>
                      <div className="w-24 h-2 bg-earth-100 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-600"
                            style={{ width: getScoreWidth(result.score) }}
                         />
                      </div>
                      <span className="text-sm font-bold text-forest-700">{result.score}/100</span>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <div className="bg-earth-50/50 p-4 rounded-xl border border-earth-100">
                     <h4 className="font-bold text-forest-900 text-[10px] uppercase tracking-widest mb-2 opacity-60">Composition Analysis</h4>
                     <p className="text-earth-800 text-sm font-medium">{result.compositionAnalysis}</p>
                  </div>
                  <div className="bg-earth-50/50 p-4 rounded-xl border border-earth-100">
                     <h4 className="font-bold text-forest-900 text-[10px] uppercase tracking-widest mb-2 opacity-60">Sustainability Verdict</h4>
                     <p className="text-earth-800 text-sm leading-relaxed">{result.explanation}</p>
                  </div>
                  {result.careInstructions && (
                    <div className="bg-forest-50/30 p-4 rounded-xl border border-forest-100">
                      <h4 className="font-bold text-forest-800 text-[10px] uppercase tracking-widest mb-2 flex items-center opacity-60">
                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        Longevity Guide
                      </h4>
                      <p className="text-forest-900 text-sm font-medium">{result.careInstructions}</p>
                    </div>
                  )}
               </div>
               
               {result.sources && result.sources.length > 0 && (
                  <div className="pt-4 border-t border-earth-100">
                    <h4 className="text-[10px] font-bold text-earth-400 uppercase tracking-widest mb-3">Verification Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-earth-100 text-[11px] text-earth-700 rounded-full font-bold hover:bg-earth-200 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          {source.title}
                        </a>
                      ))}
                    </div>
                  </div>
               )}

               <button 
                  onClick={() => setResult(null)}
                  className="w-full py-3 text-sm font-bold text-earth-400 hover:text-earth-600 transition-colors uppercase tracking-widest"
               >
                 Clear Result
               </button>
            </div>
         </div>
       )}
    </div>
  );
};