import React, { useState } from 'react';
import { MATERIALS } from '../constants';
import { Material, MaterialCategory } from '../types';

export const FabricDictionary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = MATERIALS.filter(material => {
    const matchesCategory = activeCategory === 'All' || material.category === activeCategory;
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
         <h2 className="text-2xl font-serif text-forest-900 mb-6">Fabric Dictionary</h2>
         
         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 p-1 bg-earth-50 rounded-lg overflow-x-auto max-w-full no-scrollbar">
              {['All', MaterialCategory.Natural, MaterialCategory.SemiSynthetic, MaterialCategory.Synthetic].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-forest-800 text-white shadow-sm' 
                      : 'text-earth-600 hover:bg-earth-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full md:w-64">
               <input 
                type="text" 
                placeholder="Search materials..." 
                className="w-full p-2.5 rounded-lg border border-earth-300 bg-earth-50 focus:ring-2 focus:ring-forest-400 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMaterials.map(material => (
          <MaterialRow key={material.id} material={material} />
        ))}
      </div>
      
      {filteredMaterials.length === 0 && (
         <div className="text-center py-12 text-earth-600">
           No fabrics found.
         </div>
      )}
    </div>
  );
};

const MaterialRow: React.FC<{ material: Material }> = ({ material }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRatingColor = (rating: string) => {
    switch(rating) {
      case 'A': return 'text-green-600 border-green-200 bg-green-50';
      case 'B': return 'text-lime-600 border-lime-200 bg-lime-50';
      case 'C': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'D': return 'text-orange-600 border-orange-200 bg-orange-50';
      case 'F': return 'text-red-600 border-red-200 bg-red-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div 
        className="p-5 flex items-center justify-between cursor-pointer gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl text-2xl font-serif font-bold border-2 ${getRatingColor(material.sustainabilityRating)}`}>
            {material.sustainabilityRating}
          </div>
          <div>
            <h3 className="text-lg font-bold text-forest-900 leading-tight">{material.name}</h3>
            <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">{material.category}</span>
          </div>
        </div>
        
        <div className="text-earth-300">
          <svg className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-forest-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-6 bg-earth-50/30 border-t border-earth-100 animate-slide-up">
          <div className="mt-5 space-y-6">
            {/* Description */}
            <p className="text-earth-800 text-sm font-medium leading-relaxed">
              {material.description}
            </p>
            
            {/* Environmental Impact Section (The Button Style) */}
            <div className="space-y-4">
              <h4 className="font-bold text-forest-900 text-[10px] uppercase tracking-widest opacity-60">Environmental Impact</h4>
              
              {/* Positives */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter ml-1">Positives</span>
                <div className="flex flex-wrap gap-2">
                  {material.pros.map((pro, idx) => (
                    <div key={idx} className="bg-green-50 border border-green-100 px-3 py-2 rounded-xl text-xs font-semibold text-green-800 flex items-center gap-2 shadow-sm hover:bg-green-100 transition-colors cursor-default">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                      {pro}
                    </div>
                  ))}
                </div>
              </div>

              {/* Negatives */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter ml-1">Negatives</span>
                <div className="flex flex-wrap gap-2">
                  {material.cons.map((con, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-100 px-3 py-2 rounded-xl text-xs font-semibold text-red-800 flex items-center gap-2 shadow-sm hover:bg-red-100 transition-colors cursor-default">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Care Guide (Styled like Longevity Guide) */}
            <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm">
              <h4 className="font-bold text-forest-800 text-[10px] uppercase tracking-widest mb-3 flex items-center opacity-60">
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                Care Instructions
              </h4>
              <ul className="text-sm text-earth-700 space-y-2">
                {material.careInstructions.map((inst, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-forest-400 font-bold">•</span>
                    <span className="font-medium">{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra Context */}
            <div className="pt-4 border-t border-earth-100">
               <h4 className="font-bold text-forest-900 text-[10px] uppercase tracking-widest opacity-60 mb-2">Detailed Impact</h4>
               <p className="text-sm text-earth-700 italic font-medium leading-relaxed">
                 {material.ecoImpact}
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};