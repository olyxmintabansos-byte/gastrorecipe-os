'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Thermometer,
  Flame,
  Atom,
  FlaskConical,
  Scale,
  Sparkles,
  Droplets,
  Layers,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  category: string;
  temperature: string;
  pressureTime: string;
  hydrocolloid: string;
  dosage: string;
  equipment: string;
  safetyCaution: string;
  steps: string[];
}

const PROTOCOLS: Protocol[] = [
  {
    id: 'p-1',
    name: 'Reverse Calcium Spherification',
    category: 'HYDROCOLLOIDS',
    temperature: '18°C - 22°C (Ambient Liquid)',
    pressureTime: '2.5 min curing bath',
    hydrocolloid: 'Sodium Alginate + Calcium Lactate Gluconate',
    dosage: '0.5% Alginate Bath (5g/L) • 2.0% Calcium in Base (20g/L)',
    equipment: 'Immersion Blender, Hemisphere Dosing Spoons, Water Bath',
    safetyCaution: 'Do not aerate alginate bath; rest 12h under vacuum to eliminate micro-bubbles.',
    steps: [
      'Disperse 5g Sodium Alginate in 1000g low-calcium mineral water with hand blender.',
      'Dissolve 20g Calcium Lactate into 1000g flavored liquid (e.g. Yuzu juice or clarified consommé).',
      'Drop 15ml hemispheres into alginate bath. Submerge without touching edges for 150 seconds.',
      'Rinse gently in chilled distilled water bath and store in aromatic infusion oil.',
    ],
  },
  {
    id: 'p-2',
    name: 'Liquid Nitrogen Cryo-Poaching (-196°C)',
    category: 'CRYOGENICS',
    temperature: '-196°C LN2 Flash Immersion',
    pressureTime: '18 seconds surface crust',
    hydrocolloid: 'Gelatin Bloom 200 or Xanthan 0.15%',
    dosage: 'N/A (Phase Change Solidification)',
    equipment: 'Dewar Flask, Stainless Cryo-Tong, Insulated Tongs, Protective Visor',
    safetyCaution: 'Mandatory cryogenic gloves and safety eye shield. Avoid oral contact before thermal equalization.',
    steps: [
      'Dispense aerated meringue or scallop emulsion into quenelle mold.',
      'Carefully immerse into liquid nitrogen bath using stainless slotted spoon.',
      'Allow outer shell to form brittle glass-like cryo-crust (approx 15-20 sec).',
      'Transfer immediately to serving vessel. Core remains ultra-creamy at +15°C while crust shatters.',
    ],
  },
  {
    id: 'p-3',
    name: 'Agar-Agar Shear Fluid Gel',
    category: 'RHEOLOGY',
    temperature: 'Hydration 92°C • Setting 38°C',
    pressureTime: 'High Shear Blitz 3 min',
    hydrocolloid: 'Refined Gracilaria Agar-Agar',
    dosage: '1.2% - 1.5% by weight (12-15g/kg)',
    equipment: 'High-Shear Vitamix Blender, Fine Chinois, Thermocouple Probe',
    safetyCaution: 'Ensure full boiling rolling boil for at least 60 seconds to fully hydrate polysaccharide chains.',
    steps: [
      'Whisk 12g Agar into 1000g liquid. Bring to full rolling boil (92°C+) for 90 seconds.',
      'Pour onto flat stainless tray and chill in shock freezer until fully rigid brittle gel forms.',
      'Cut into cubes and transfer to high-speed blender. Blitz at maximum RPM until smooth fluid gel.',
      'Pass through superbag sieve to achieve silky squeeze-bottle sauce viscosity.',
    ],
  },
  {
    id: 'p-4',
    name: 'Ultrasonic Cavitation Emulsion',
    category: 'SONOCHEMISTRY',
    temperature: '45°C Stable Core',
    pressureTime: '40 kHz Ultrasound 90 sec',
    hydrocolloid: 'Glutamic Peptides & Soy Lecithin',
    dosage: '0.25% Lecithin (2.5g/kg)',
    equipment: 'Sonics & Materials Ultrasonic Cell Disruptor Horn, Titanium Probe',
    safetyCaution: 'Wear sound attenuation earmuffs during 40 kHz operation.',
    steps: [
      'Combine lipid phase (e.g. smoked bone marrow oil) and aqueous phase (yuzu dashi).',
      'Submerge 13mm titanium ultrasonic horn tip 2cm into boundary layer.',
      'Engage 40 kHz pulses at 60% amplitude for 90 seconds.',
      'Cavitation bubbles collapse creating sub-micron nano-droplets stable without heat.',
    ],
  },
];

export default function TechniquesPage() {
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>(PROTOCOLS[0]);

  // Calculator State
  const [calcVolumeML, setCalcVolumeML] = useState<number>(500);
  const [targetTexture, setTargetTexture] = useState<string>('SPHERE');

  const getDosageRecommendation = () => {
    switch (targetTexture) {
      case 'SPHERE':
        return {
          agent: 'Sodium Alginate (0.5%) + Calcium Lactate (2.0%)',
          agentGrams: (calcVolumeML * 0.005).toFixed(2),
          calciumGrams: (calcVolumeML * 0.02).toFixed(2),
          hydrationTemp: 'Cold / Room Temp',
          curingTime: '2 min 30 sec',
        };
      case 'FLUID_GEL':
        return {
          agent: 'Agar-Agar Refined (1.3%)',
          agentGrams: (calcVolumeML * 0.013).toFixed(2),
          calciumGrams: 'None required',
          hydrationTemp: 'Boil to 92°C+',
          curingTime: 'Chill to 35°C then high shear blend',
        };
      case 'ESPUMA':
        return {
          agent: 'Xanthan Gum (0.3%) + Gelatin 200 Bloom (1.0%)',
          agentGrams: (calcVolumeML * 0.003).toFixed(2),
          calciumGrams: `${(calcVolumeML * 0.01).toFixed(2)}g Gelatin`,
          hydrationTemp: '60°C to dissolve gelatin',
          curingTime: 'Charge with 2x N2O chargers and rest 4h',
        };
      default:
        return {
          agent: 'Xanthan Gum (0.2%)',
          agentGrams: (calcVolumeML * 0.002).toFixed(2),
          calciumGrams: 'None',
          hydrationTemp: 'Cold soluble',
          curingTime: 'Instant viscosity',
        };
    }
  };

  const calcResult = getDosageRecommendation();

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] pb-24 font-mono">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0c1220] via-[#090d17] to-[#07090e] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-purple-400">
              <FlaskConical className="w-4 h-4 text-purple-400" />
              <span>LABORATORY CRYO-GASTRONOMY PROTOCOL MANUAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              HYDROCOLLOIDS & <span className="chrome-gradient">CRYO LAB</span>
            </h1>
          </div>

          <div className="text-xs text-zinc-400 bg-[#0f1422] border border-purple-500/30 px-3.5 py-2 rounded-xl">
            STATUS: <strong className="text-purple-300">4 CLINICAL PROTOCOLS LOADED</strong>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Protocol Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0b101c] border border-purple-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Atom className="w-5 h-5 text-purple-400" />
                <span>MOLECULAR CULINARY PROTOCOLS</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROTOCOLS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProtocol(p)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedProtocol.id === p.id
                        ? 'bg-[#151226] border-purple-400 shadow-md shadow-purple-500/20'
                        : 'bg-[#080b12] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1">{p.name}</h3>
                    <div className="text-[11px] text-zinc-400 mt-2">TEMP: {p.temperature}</div>
                    <div className="text-[10px] text-sky-400 mt-1">{p.hydrocolloid}</div>
                  </div>
                ))}
              </div>

              {/* Protocol Step-by-Step Execution */}
              <div className="mt-6 pt-6 border-t border-zinc-800 bg-[#090b14] p-5 rounded-xl border border-zinc-900">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedProtocol.name}</h3>
                    <span className="text-xs text-purple-300">EQUIPMENT: {selectedProtocol.equipment}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    {selectedProtocol.temperature}
                  </span>
                </div>

                <div className="bg-[#0e0f18] p-3 rounded-lg border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2 mb-4">
                  <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{selectedProtocol.safetyCaution}</span>
                </div>

                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="text-zinc-500 uppercase text-[10px] font-bold">Standard Operating Procedure:</div>
                  {selectedProtocol.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#080a12] p-2.5 rounded-lg border border-zinc-800/80">
                      <span className="w-5 h-5 rounded bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        0{i + 1}
                      </span>
                      <p className="leading-relaxed">{st}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hydrocolloid Precision Calculator (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b101c] border border-sky-500/30 rounded-2xl p-6 shadow-2xl relative holo-border">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Scale className="w-5 h-5 text-sky-400" />
                <span>HYDROCOLLOID DOSAGE CALCULATOR</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-5">
                Calculate analytical milligram dosages for target gelification viscosities.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Batch Volume of Culinary Liquid (ML)</label>
                  <input
                    type="number"
                    min={50}
                    max={5000}
                    step={50}
                    value={calcVolumeML}
                    onChange={(e) => setCalcVolumeML(parseInt(e.target.value) || 100)}
                    className="w-full bg-[#080b12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Target Molecular Viscosity Profile</label>
                  <select
                    value={targetTexture}
                    onChange={(e) => setTargetTexture(e.target.value)}
                    className="w-full bg-[#080b12] border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="SPHERE">Spherical Ravioli (Direct / Reverse Spherification)</option>
                    <option value="FLUID_GEL">Shear Fluid Gel (Squeeze Bottle Silk Sauce)</option>
                    <option value="ESPUMA">Cold Thermal Espuma (Siphon Foam)</option>
                  </select>
                </div>

                {/* Analytical Weighing Scale Output */}
                <div className="bg-[#080c14] p-4 rounded-xl border border-zinc-800 space-y-3 mt-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest text-center">
                    ANALYTICAL METTLER-TOLEDO WEIGHING REQUIREMENT
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-[#0c101c] p-2.5 rounded-lg border border-zinc-800">
                      <div className="text-[10px] text-zinc-500">PRIMARY HYDROCOLLOID</div>
                      <div className="text-2xl font-black text-sky-400 mt-0.5">{calcResult.agentGrams}g</div>
                    </div>
                    <div className="bg-[#0c101c] p-2.5 rounded-lg border border-zinc-800">
                      <div className="text-[10px] text-zinc-500">SECONDARY CO-AGENT</div>
                      <div className="text-lg font-bold text-purple-300 mt-1">{calcResult.calciumGrams}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Formula:</span>
                      <strong className="text-white">{calcResult.agent}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Thermal Rule:</span>
                      <strong className="text-amber-400">{calcResult.hydrationTemp}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Curing / Rest:</span>
                      <strong className="text-emerald-400">{calcResult.curingTime}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-zinc-400 flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ISO 9001 Food Chemistry Precision Standard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
