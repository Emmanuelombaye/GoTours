import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ query, setQuery, guests, setGuests }) => {
  return (
    <section className="relative bg-white pt-10 pb-6 border-b border-gray-100">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
          >
            Discover curated <span className="text-ocean-600">villas</span> and <span className="text-ocean-400">getaways</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto"
          >
            Handpicked stays, transparent pricing, and a smooth booking experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 p-1 pl-6">
              <div className="flex flex-col items-start pr-4 border-r border-gray-100 relative group/heroinput">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Location</span>
                <div className="relative flex items-center w-40">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Where are you going?"
                    className="bg-transparent border-none focus:ring-0 text-sm p-0 placeholder-slate-400 w-full pr-6"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-0 p-1 text-slate-400 hover:text-ocean-600 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start px-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Guests</span>
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm p-0 w-12"
                />
              </div>

              <button className="bg-ocean-600 hover:bg-ocean-700 text-white p-3 rounded-full transition-all group flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            {['All', 'Diani', 'Watamu', 'Malindi', 'Kilifi'].map((loc, i, arr) => (
              <React.Fragment key={loc}>
                <button
                  onClick={() => setQuery(loc === 'All' ? '' : loc)}
                  className={`transition-colors focus:outline-none active:scale-95 ${query === (loc === 'All' ? '' : loc) ? 'text-ocean-600' : 'hover:text-ocean-600'}`}
                >
                  {loc}
                </button>
                {i < arr.length - 1 && <span className="text-gray-200 select-none">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
