import React from 'react';

interface DecompositionData {
  fabric: string;
  duration: string;
  type: 'natural' | 'synthetic' | 'hybrid';
  details: string;
}

const DECOMP_DATA: DecompositionData[] = [
  { fabric: 'Linen', duration: '2 weeks - 6 months', type: 'natural', details: 'One of the fastest to return to earth.' },
  { fabric: 'Cotton', duration: '1 - 5 Months', type: 'natural', details: 'Breaks down quickly if 100% organic and undyed.' },
  { fabric: 'Wool', duration: '1 - 5 Years', type: 'natural', details: 'Rich in nitrogen; can actually act as fertilizer.' },
  { fabric: 'Leather', duration: '25 - 50 Years', type: 'hybrid', details: 'Animal-based but tanning chemicals significantly slow decomposition.' },
  { fabric: 'Nylon', duration: '30 - 40 Years', type: 'synthetic', details: 'A plastic derivative that lingers for decades.' },
  { fabric: 'Polyester', duration: '200+ Years', type: 'synthetic', details: 'Will outlive the person who wore it.' },
  { fabric: 'Spandex', duration: '500+ Years', type: 'synthetic', details: 'Practically permanent in our environment.' },
];

export const LifecyclePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-forest-900 leading-tight">
          How long does clothing take to decompose?
        </h2>
        <p className="text-earth-600 text-sm">
          Understanding the afterlife of your wardrobe helps in making better buying decisions.
        </p>
      </div>

      <div className="space-y-4">
        {DECOMP_DATA.map((item, idx) => (
          <div 
            key={idx} 
            className={`p-5 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
              item.type === 'natural' ? 'border-green-100' : 
              item.type === 'hybrid' ? 'border-amber-100' : 'border-red-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-forest-900">{item.fabric}</h3>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                item.type === 'natural' 
                  ? 'bg-green-100 text-green-700' 
                  : item.type === 'hybrid'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-50 text-red-600'
              }`}>
                {item.duration}
              </span>
            </div>
            <p className="text-earth-700 text-sm leading-relaxed">
              {item.details}
            </p>
            
            <div className="mt-4 w-full h-1.5 bg-earth-50 rounded-full overflow-hidden">
               <div 
                className={`h-full ${
                  item.type === 'natural' ? 'bg-green-500' : 
                  item.type === 'hybrid' ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: item.type === 'natural' ? '20%' : item.type === 'hybrid' ? '50%' : '90%' }}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-forest-900 text-white rounded-3xl mt-8">
        <h4 className="font-serif font-bold text-lg mb-2">The Synthetic Reality</h4>
        <p className="text-forest-100 text-sm leading-relaxed">
          Synthetic fabrics like Polyester and Nylon are essentially plastics. When they sit in landfills, they release methane and harmful chemicals into the soil and groundwater. Choosing natural fibers ensures your clothes can eventually return to the earth.
        </p>
      </div>
    </div>
  );
};