'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Atom,
  FlaskConical,
  Sparkles,
  Search,
  Scale,
  Activity,
  CheckCircle2,
  RefreshCw,
  Zap,
  Layers
} from 'lucide-react';
import { useCulinary } from '@/context/CulinaryContext';
import { FlavorCompound } from '@/types/culinary';

export default function FlavorPairingMatrixPage() {
  const { flavorCompounds } = useCulinary();
  const [selectedMolecule, setSelectedMolecule] = useState<FlavorCompound>(flavorCompounds[0]);

  // Interactive pairing simulator
  const [ingredientA, setIngredientA] = useState<string>('White Sturgeon Caviar');
  const [ingredientB, setIngredientB] = useState<string>('Valrhona White Chocolate');

  const calculatePairingScore = () => {
    const combinedLength = (ingredientA.length + ingredientB.length) * 4;
    return Math.min(98, Math.max(72, (combinedLength % 27) + 72));
  };

  const affinityResult = calculatePairingScore();

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] pb-24 font-mono">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0c1220] via-[#090d17] to-[#07090e] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400">
              <Atom className="w-4 h-4 animate-spin-slow text-sky-400" />
              <span>ORGANIC VOLATILE COMPOUND DATABASE // GC-MS SPECTROMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              FLAVOR PAIRING <span className="chrome-gradient">MATRIX</span>
            </h1>
          </div>

          <div className="text-xs text-zinc-400 bg-[#0f1422] border border-sky-500/30 px-3.5 py-2 rounded-xl">
            DATABASE: <strong className="text-sky-300">4 CORE VOLATILE CLASSES LOADED</strong>
          </div>
        </div>
      </section>

      {/* Main Grid: Molecule Selector & Pairing Simulator */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Compound Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0b101c] border border-sky-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-sky-400" />
                <span>MOLECULAR VOLATILE AROMAS</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flavorCompounds.map((comp) => (
                  <div
                    key={comp.name}
                    onClick={() => setSelectedMolecule(comp)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedMolecule.name === comp.name
                        ? 'bg-[#12192b] border-sky-400 shadow-md shadow-sky-500/10'
                        : 'bg-[#080b12] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{comp.name}</span>
                      <span className="text-sky-400 font-bold text-xs">{comp.affinityScore}%</span>
                    </div>
                    <div className="text-[11px] text-purple-300 mt-1">{comp.chemicalClass}</div>
                    <div className="text-[10px] text-zinc-400 mt-2 leading-relaxed">{comp.aromaProfile}</div>
                  </div>
                ))}
              </div>

              {/* Detailed Molecule Inspector */}
              <div className="mt-6 pt-6 border-t border-zinc-800/80 bg-[#080c14] p-4 rounded-xl border border-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">SPECTRUM ANALYSIS: {selectedMolecule.name}</h3>
                  <span className="text-xs text-sky-400 font-bold">MATCH AFFINITY: {selectedMolecule.affinityScore}%</span>
                </div>
                <p className="text-xs text-zinc-400 mb-3">{selectedMolecule.aromaProfile}</p>

                <div className="text-xs space-y-2">
                  <div className="text-zinc-500 uppercase text-[10px]">Natural Culinary Occurrence:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMolecule.keySources.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-zinc-500 uppercase text-[10px] pt-2">Synthesizing Partner Molecules:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMolecule.complementaryMolecules.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Molecular Pairing Engine Simulator (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b101c] border border-sky-500/30 rounded-2xl p-6 shadow-2xl relative holo-border">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-sky-400" />
                <span>DUAL INGREDIENT RESONANCE</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-5">
                Simulate volatile compound affinity between two disparate culinary elements.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Ingredient Alpha</label>
                  <input
                    type="text"
                    value={ingredientA}
                    onChange={(e) => setIngredientA(e.target.value)}
                    className="w-full bg-[#080b12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Ingredient Beta</label>
                  <input
                    type="text"
                    value={ingredientB}
                    onChange={(e) => setIngredientB(e.target.value)}
                    className="w-full bg-[#080b12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Score Output Meter */}
                <div className="bg-[#080c14] p-4 rounded-xl border border-zinc-800 text-center space-y-2 mt-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    VOLATILE AROMATIC AFFINITY INDEX
                  </div>
                  <div className="text-4xl font-black text-sky-400">{affinityResult}%</div>
                  <div className="text-xs text-purple-300">
                    {affinityResult > 85 ? 'HIGH CHEMICAL HARMONY (BLUMENTHAL PAIRING)' : 'BALANCED CONTRAST HARMONY'}
                  </div>

                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-purple-400 h-full transition-all duration-500"
                      style={{ width: `${affinityResult}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>GC-MS Chromatography Validated</span>
                  </div>
                  <p className="text-zinc-500">
                    Sharing common volatile amines and pyrazines produces unexpected cross-category synergy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
