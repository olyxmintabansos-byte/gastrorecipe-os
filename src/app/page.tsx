'use client';

import React from 'react';
import Link from 'next/link';
import {
  Atom,
  Flame,
  Thermometer,
  Sparkles,
  ChevronRight,
  Wine,
  Activity,
  Droplets,
  Layers,
  FlaskConical,
  Scale
} from 'lucide-react';
import { useCulinary } from '@/context/CulinaryContext';

export default function TastingMenuBentoPage() {
  const { dishes, activeCourse, setActiveCourse, advanceCourse } = useCulinary();
  const currentDish = dishes.find((d) => d.courseNumber === activeCourse) || dishes[0];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] pb-24 cyber-pixel-dot">
      {/* Cyber Y2K Bento Header */}
      <section className="border-b border-sky-950/80 bg-gradient-to-b from-[#0c1220] via-[#090d17] to-[#07090e] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-4">
              <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
              <span>3-STAR MICHELIN EXPERIMENTAL DINING MATRIX</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-mono">
              MOLECULAR <span className="chrome-gradient">GASTRONOMY</span> OS
            </h1>
            <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base font-sans leading-relaxed">
              Precision thermal chemistry, hydrocolloid spherification, and cryogenic distillation. Designed as a high-density Japanese cyber-minimal bento layout for contemporary fine dining expediting.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
              <Link
                href="/matrix/"
                className="px-5 py-2.5 bg-gradient-to-r from-sky-400 to-purple-500 hover:from-sky-300 hover:to-purple-400 text-black font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                <Atom className="w-4 h-4" />
                <span>FLAVOR COMPOUND MATRIX</span>
              </Link>
              <Link
                href="/techniques/"
                className="px-5 py-2.5 bg-[#101726] hover:bg-[#18233a] text-zinc-200 border border-zinc-700 rounded-xl transition-all flex items-center gap-2"
              >
                <Thermometer className="w-4 h-4 text-purple-400" />
                <span>CRYO LN2 PROTOCOLS</span>
              </Link>
            </div>
          </div>

          {/* Live Plating Status Widget */}
          <div className="bg-[#0b101c] border border-sky-500/30 rounded-2xl p-6 shadow-2xl max-w-sm w-full font-mono text-xs holo-border">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>ACTIVE EXPEDITER TICKET</span>
              </div>
              <span className="text-zinc-500">OMAKASE TABLE 1</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-500">COURSE:</span>
                <span className="font-bold text-white">#{currentDish.courseNumber} — {currentDish.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CORE TEMP:</span>
                <span className="font-bold text-sky-400">{currentDish.coreTemperatureC}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">VISCOSITY:</span>
                <span className="font-bold text-purple-300">{currentDish.platingViscosity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ACIDITY:</span>
                <span className="font-bold text-emerald-400">pH {currentDish.acidityPH}</span>
              </div>
            </div>

            <button
              onClick={advanceCourse}
              className="w-full mt-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>ADVANCE TO NEXT COURSE</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid: 6-Course Tasting Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6 font-mono">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>6-COURSE AUTUMN TASTING MATRIX</span>
              <span className="text-xs text-sky-400 font-normal">秋の味覚 分子料理</span>
            </h2>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:inline">CLICK DISH TO ENGAGE PLATING TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => {
            const isSelected = dish.courseNumber === activeCourse;
            return (
              <div
                key={dish.id}
                onClick={() => setActiveCourse(dish.courseNumber)}
                className={`bg-[#0d121f] border rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xl ${
                  isSelected
                    ? 'border-sky-400 shadow-sky-500/20 -translate-y-1'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                      COURSE #{dish.courseNumber} // {dish.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">{dish.japaneseSubtitle}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {dish.name}
                  </h3>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141b2d] border border-zinc-800 text-[11px] font-mono text-purple-300">
                    <Atom className="w-3.5 h-3.5 text-purple-400" />
                    <span>{dish.technique}</span>
                  </div>

                  {/* Ingredients Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070a10] border border-zinc-800 text-zinc-400"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                    <div className="flex items-center gap-1 text-zinc-300">
                      <Wine className="w-3.5 h-3.5 text-purple-400" />
                      <span>SOMMELIER:</span>
                    </div>
                    <span className="text-zinc-200 truncate max-w-[170px]">{dish.sommelierPairing}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-zinc-500">
                    <span>TEMP: <strong className="text-sky-300">{dish.coreTemperatureC}°C</strong></span>
                    <span>ACID: <strong className="text-emerald-400">pH {dish.acidityPH}</strong></span>
                    <span className="text-purple-300 font-bold">{dish.platingViscosity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
