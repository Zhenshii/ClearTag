import React, { useState, useRef, useEffect } from 'react';
import { checkProduct } from '../services/geminiService';
import { GradeResult } from '../types';

export const ProductChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (showCamera) {
      const startCamera = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera Error:", err);
          setError("Could not access camera. Please allow permissions.");
          setShowCamera(false);
        }
      };
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
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

  // Camera UI Overlay
  if (showCamera) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="relative flex-1 bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay Guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-48 border-2 border-white/50 rounded-lg relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white"></div>
            </div>
          </div>
        </div>
        
        <div className="h-32 bg-forest-900 flex items-center justify-between px-8 pb-safe">
           <button 
             onClick={() => setShowCamera(false)}
             className="text-white font-medium p-2"
           >
             Cancel
           </button>
           <button 
             onClick={handleCapture}
             className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 shadow-lg active:scale-95 transition-transform"
           ></button>
           <div className="w-10"></div> {/* Spacer for centering */}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
       <div className="space-y-2">
          <h2 className="text-2xl font-serif text-forest-900">Scan & Check</h2>
          <p className="text-earth-700 text-sm">
            Scan a barcode/label or paste a link to get an instant sustainability grade.
          </p>
       </div>

       {/* Action Buttons */}
       <div className="grid grid-cols-1 gap-4">
         <button 
           onClick={() => setShowCamera(true)}
           className="flex items-center justify-center gap-3 p-4 bg-forest-800 text-white rounded-xl shadow-md active:bg-forest-900 transition-colors"
         >
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
           <span className="font-semibold text-lg">Scan Label / Barcode</span>
         </button>

         <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-earth-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-earth-50 px-2 text-xs text-earth-500 uppercase tracking-widest">Or type details</span>
            </div>
         </div>

         <form onSubmit={handleTextSubmit} className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste URL or type name..."
              className="flex-1 p-3 rounded-lg border border-earth-300 bg-white focus:ring-2 focus:ring-forest-500 focus:outline-none"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 bg-earth-200 text-forest-900 rounded-lg font-medium hover:bg-earth-300 disabled:opacity-50"
            >
              Check
            </button>
         </form>
       </div>

       {isLoading && (
         <div className="py-12 flex flex-col items-center justify-center text-forest-700 animate-pulse">
           <svg className="w-10 h-10 mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <p className="text-sm font-medium">Analyzing with Gemini AI...</p>
         </div>
       )}

       {error && (
         <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm text-center">
            {error}
         </div>
       )}

       {result && (
         <div className="bg-white rounded-2xl shadow-lg border border-earth-200 overflow-hidden animate-slide-up">
            <div className="p-6 space-y-6">
               <div className="flex items-center justify-between">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl font-serif font-bold ${getGradeColor(result.grade)}`}>
                     {result.grade}
                  </div>
                  <div className="flex-1 ml-4 text-right">
                    <h3 className="text-lg font-bold text-forest-900 leading-tight">{result.productName || 'Analysis Result'}</h3>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className="text-xs text-earth-500">Score</span>
                      <div className="w-24 h-2 bg-earth-100 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                            style={{ width: getScoreWidth(result.score) }}
                         />
                      </div>
                      <span className="text-xs font-bold text-forest-700">{result.score}</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="bg-earth-50 p-3 rounded-lg">
                     <h4 className="font-bold text-forest-900 text-xs uppercase mb-1">Composition</h4>
                     <p className="text-earth-800 text-sm">{result.compositionAnalysis}</p>
                  </div>
                  <div className="bg-earth-50 p-3 rounded-lg">
                     <h4 className="font-bold text-forest-900 text-xs uppercase mb-1">Verdict</h4>
                     <p className="text-earth-800 text-sm">{result.explanation}</p>
                  </div>
                  {result.careInstructions && (
                    <div className="bg-earth-50 p-3 rounded-lg">
                      <h4 className="font-bold text-forest-900 text-xs uppercase mb-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        Care Guide
                      </h4>
                      <p className="text-earth-800 text-sm">{result.careInstructions}</p>
                    </div>
                  )}
               </div>
               
               {result.sources && result.sources.length > 0 && (
                  <div className="pt-3 border-t border-earth-100">
                    <h4 className="text-[10px] font-bold text-earth-400 uppercase mb-2">Sources</h4>
                    <ul className="space-y-1">
                      {result.sources.map((source, idx) => (
                        <li key={idx} className="truncate">
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-forest-600 hover:underline"
                          >
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
               )}
            </div>
         </div>
       )}
    </div>
  );
};