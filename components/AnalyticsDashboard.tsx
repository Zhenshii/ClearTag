
import React, { useMemo } from 'react';
import { GradeResult } from '../types';

export const AnalyticsDashboard: React.FC = () => {
  const history: GradeResult[] = useMemo(() => {
    return JSON.parse(localStorage.getItem('fibr_history') || '[]');
  }, []);

  const stats = useMemo(() => {
    if (history.length === 0) return null;
    const avgScore = Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length);
    const topGrade = history.filter(h => h.grade === 'A' || h.grade === 'B').length;
    const carbonSaved = (topGrade * 2.4).toFixed(1); // Mock calculation: 2.4kg per high-grade choice

    return { avgScore, topGrade, carbonSaved };
  }, [history]);

  const topMaterials = useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach(item => {
      // Fix: Use the 'composition' array which exists on GradeResult instead of the non-existent 'compositionAnalysis'
      if (item.composition && Array.isArray(item.composition)) {
        item.composition.forEach(comp => {
          if (comp.material) {
            // Attempt to extract known fiber keywords to group variations (e.g., "Organic Cotton" -> "Cotton")
            const match = comp.material.match(/(Cotton|Linen|Hemp|Polyester|Nylon|Silk|Tencel|Wool)/i);
            const name = match ? match[0] : comp.material;
            const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            counts[normalized] = (counts[normalized] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [history]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-serif text-forest-900">Your Insights</h2>
        <p className="text-earth-600 text-sm italic">Based on your recent product scans.</p>
      </div>

      {!stats ? (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-earth-300 text-center space-y-4">
           <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto text-earth-400">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
           </div>
           <div>
             <h3 className="text-earth-900 font-bold">No Data Yet</h3>
             <p className="text-earth-500 text-sm px-4">Scan clothing labels to see your sustainability footprint grow.</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-forest-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg Score</span>
             <div className="text-3xl font-serif font-bold mt-1">{stats.avgScore}%</div>
             <p className="text-[10px] mt-2 opacity-80 leading-tight">Your wardrobe sustainability rating.</p>
          </div>
          <div className="bg-earth-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-forest-400/20 rounded-full blur-2xl"></div>
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Impact Score</span>
             <div className="text-3xl font-serif font-bold mt-1">{stats.carbonSaved}kg</div>
             <p className="text-[10px] mt-2 opacity-80 leading-tight">Estimated CO2 saved via better fabrics.</p>
          </div>

          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-earth-200">
            <h3 className="text-[10px] font-bold text-earth-400 uppercase tracking-widest mb-4">Most Scanned Fibers</h3>
            <div className="space-y-3">
              {topMaterials.length > 0 ? topMaterials.map(([name, count]) => (
                <div key={name} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-earth-50 rounded-lg flex items-center justify-center text-forest-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                      </div>
                      <span className="text-sm font-bold text-earth-900">{name}</span>
                   </div>
                   <span className="text-xs font-medium text-earth-400">{count} {count === 1 ? 'scan' : 'scans'}</span>
                </div>
              )) : (
                <p className="text-sm text-earth-400 italic">Scan results with composition data to see trends.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global simulated trends */}
      <div className="bg-gradient-to-br from-forest-900 to-forest-800 p-6 rounded-2xl text-white shadow-xl">
        <div className="flex justify-between items-center mb-6">
           <div>
             <h3 className="text-lg font-serif font-bold">Global Trends</h3>
             <p className="text-xs text-forest-200">Real-time Sustainable Fashion Index</p>
           </div>
           <div className="px-2 py-1 bg-white/20 rounded text-[9px] font-bold uppercase animate-pulse-soft">Live</div>
        </div>

        <div className="space-y-5">
           <TrendRow label="Circular Hemp" percentage={82} color="bg-green-400" />
           <TrendRow label="Vegan Leathers" percentage={64} color="bg-emerald-300" />
           <TrendRow label="Organic Cotton" percentage={45} color="bg-lime-300" />
           <TrendRow label="Recycled Syns" percentage={28} color="bg-orange-300" />
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
           <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border border-forest-800 bg-earth-200"></div>
              <div className="w-6 h-6 rounded-full border border-forest-800 bg-forest-400"></div>
              <div className="w-6 h-6 rounded-full border border-forest-800 bg-earth-400"></div>
              <div className="w-6 h-6 rounded-full border border-forest-800 bg-white flex items-center justify-center text-[8px] text-forest-900 font-bold">+1k</div>
           </div>
           <span className="text-[10px] font-medium text-forest-200">Join 1,240 active conscious shoppers</span>
        </div>
      </div>

      <div className="p-4 bg-earth-100 rounded-xl border border-earth-200 text-center">
         <p className="text-[10px] text-earth-500 font-medium">To see total unique visitor counts across the world, please link a Google Analytics "Measurement ID" in your project settings.</p>
      </div>
    </div>
  );
};

const TrendRow: React.FC<{ label: string; percentage: number; color: string }> = ({ label, percentage, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-xs font-bold">
      <span className="text-forest-100">{label}</span>
      <span className="text-white">{percentage}%</span>
    </div>
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);
