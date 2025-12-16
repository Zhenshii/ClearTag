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
            <div className="flex gap-2 p-1 bg-earth-50 rounded-lg overflow-x-auto max-w-full">
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
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-lime-100 text-lime-800 border-lime-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'F': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="p-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold border ${getRatingColor(material.sustainabilityRating)}`}>
            {material.sustainabilityRating}
          </div>
          <div>
            <h3 className="text-lg font-bold text-forest-900">{material.name}</h3>
            <span className="text-xs font-medium text-earth-500 uppercase tracking-wide">{material.category}</span>
          </div>
        </div>
        
        <div className="text-earth-400">
          <svg className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 bg-earth-50/50 border-t border-earth-100">
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-earth-800 mb-4">{material.description}</p>
              
              <div className="mb-4 bg-white p-4 rounded-lg border border-earth-200">
                <h4 className="font-semibold text-forest-800 mb-2 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  Care Guide
                </h4>
                <ul className="text-sm text-earth-700 space-y-1">
                  {material.careInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>{inst}
                    </li>
                  ))}
                </ul>
              </div>

              <h4 className="font-semibold text-forest-800 mb-1 text-sm">Environmental Impact</h4>
              <p className="text-sm text-earth-700 italic">{material.ecoImpact}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-1 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Pros
                </h4>
                <ul className="text-sm text-earth-700 list-disc list-inside">
                  {material.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-1 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Cons
                </h4>
                <ul className="text-sm text-earth-700 list-disc list-inside">
                  {material.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};