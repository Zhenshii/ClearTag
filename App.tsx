import React, { useState } from 'react';
import { LifecyclePage } from './components/LifecyclePage';
import { FabricDictionary } from './components/FabricDictionary';
import { ProductChecker } from './components/ProductChecker';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>('lifecycle');

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-earth-50 text-stone-800 font-sans select-none relative">
      
      {/* Mobile Top Bar */}
      <header className="flex-none h-14 bg-forest-900 text-earth-50 shadow-md z-20 flex items-center justify-center px-4 relative">
         <span className="text-lg font-serif font-bold tracking-wide">Clear Tag</span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 no-scrollbar scroll-smooth w-full">
        <div className="max-w-xl mx-auto w-full min-h-full pb-32"> 
          {view === 'lifecycle' && <LifecyclePage />}
          {view === 'dictionary' && <FabricDictionary />}
          {view === 'checker' && <ProductChecker />}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-earth-200 flex justify-around items-start pt-3 z-40 pb-[max(env(safe-area-inset-bottom),16px)] shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)]">
         <NavButton 
           active={view === 'lifecycle'} 
           onClick={() => setView('lifecycle')}
           icon={
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
           }
           label="Lifecycle"
         />
         <NavButton 
           active={view === 'checker'} 
           onClick={() => setView('checker')}
           icon={
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
           }
           label="Scan"
         />
         <NavButton 
           active={view === 'dictionary'} 
           onClick={() => setView('dictionary')}
           icon={
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
           }
           label="Guide"
         />
      </nav>
    </div>
  );
}

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-20 py-1 transition-colors outline-none focus:outline-none touch-manipulation ${
      active 
        ? 'text-forest-700' 
        : 'text-earth-400 hover:text-earth-600'
    }`}
  >
    <div className={`mb-1 transition-transform duration-200 ${active ? 'scale-110' : 'scale-100'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium leading-none ${active ? 'font-bold' : ''}`}>
      {label}
    </span>
  </button>
);

export default App;