'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Wine,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Flame,
  Utensils,
  Bell,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCulinary } from '@/context/CulinaryContext';

export default function ServiceExpediterPage() {
  const { dishes, activeCourse, advanceCourse, resetService, activeSession } = useCulinary();
  const [courseFiring, setCourseFiring] = useState<number>(activeCourse);
  const [sommelierPoured, setSommelierPoured] = useState<boolean[]>(new Array(dishes.length).fill(false));
  const [kitchenAlert, setKitchenAlert] = useState<string | null>(null);

  const toggleSommelierPour = (idx: number) => {
    setSommelierPoured((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const fireKitchen = (courseNum: number) => {
    setCourseFiring(courseNum);
    setKitchenAlert(`PASS ORDER: COURSE #${courseNum} FIRED TO CHEF DE PARTIE!`);
    setTimeout(() => setKitchenAlert(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] pb-24 font-mono">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0c1220] via-[#090d17] to-[#07090e] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400">
              <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>PASS EXPEDITER CONSOLE // MICHELIN 3-STAR SERVICE DISPATCH</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              TABLE SERVICE <span className="chrome-gradient">DIRECTOR</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={advanceCourse}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>PLATE NEXT COURSE (#{activeCourse + 1 <= dishes.length ? activeCourse + 1 : 'COMPLETE'})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetService}
              className="px-3 py-2 bg-[#121724] border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs rounded-xl transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Kitchen Alert Notification */}
      {kitchenAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-sky-500/10 border border-sky-400 p-3 rounded-xl text-sky-300 text-xs flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2 font-bold">
              <Bell className="w-4 h-4 text-sky-400" />
              <span>{kitchenAlert}</span>
            </div>
            <span className="text-[10px] text-zinc-400">TRANSMITTED TO EXPEDITER LINE</span>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Table Session Ticket (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b101c] border border-sky-500/30 rounded-2xl p-6 shadow-xl relative holo-border">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <span className="text-xs font-bold text-sky-400">{activeSession.tableId}</span>
                <span className="text-[10px] text-zinc-500">SEATED AT {activeSession.serviceStartTime}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-zinc-500 text-[10px]">HOST / LEAD GUEST:</div>
                  <div className="font-bold text-white text-sm">{activeSession.guestName}</div>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">PARTY COVERS:</span>
                  <strong className="text-white">{activeSession.guestCount} GUESTS</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">CURRENT COURSE:</span>
                  <strong className="text-sky-300">COURSE #{activeCourse} OF {dishes.length}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">SOMMELIER FLIGHT:</span>
                  <span className="text-purple-300 font-bold">GRAND CRU SAKE & WINE</span>
                </div>

                <div className="p-3 bg-[#080b12] rounded-xl border border-amber-500/30 text-amber-300 text-[11px] mt-4">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>DIETARY ALLERGEN ISOLATION</span>
                  </div>
                  <p>{activeSession.specialDiet}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 space-y-1">
                <div>EXPEDITER STATION: STATION 01 (HOT PASS)</div>
                <div>TABLE PROGRESSION: {Math.round((activeCourse / dishes.length) * 100)}% COMPLETED</div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-sky-400 h-full transition-all duration-300"
                    style={{ width: `${(activeCourse / dishes.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Expediter Run-Sheet Checklist (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#0b101c] border border-sky-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-sky-400" />
                  <span>KITCHEN PLATING & SOMMELIER RUN-SHEET</span>
                </h2>
                <span className="text-xs text-zinc-500">TOTAL 6 COURSES</span>
              </div>

              <div className="space-y-3.5">
                {dishes.map((dish, idx) => {
                  const isPlated = dish.courseNumber < activeCourse;
                  const isCurrent = dish.courseNumber === activeCourse;
                  const isPoured = sommelierPoured[idx];

                  return (
                    <div
                      key={dish.id}
                      className={`p-4 rounded-xl border transition-all text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isCurrent
                          ? 'bg-[#12192c] border-sky-400 shadow-md shadow-sky-500/10'
                          : isPlated
                          ? 'bg-[#080b12] border-zinc-800/80 opacity-70'
                          : 'bg-[#090d16] border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isPlated
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isCurrent
                              ? 'bg-sky-500 text-black'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {dish.courseNumber}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{dish.name}</h4>
                            <span className="text-[10px] text-zinc-500">{dish.japaneseSubtitle}</span>
                          </div>
                          <div className="text-[11px] text-purple-300 mt-0.5">{dish.technique}</div>
                          <div className="text-[10px] text-zinc-400 mt-1 flex items-center gap-2">
                            <span>TEMP: {dish.coreTemperatureC}°C</span>
                            <span>•</span>
                            <span className="text-zinc-300">WINE: {dish.sommelierPairing}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Sommelier Pour Toggle */}
                        <button
                          onClick={() => toggleSommelierPour(idx)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors flex items-center gap-1 ${
                            isPoured
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                          }`}
                        >
                          <Wine className="w-3 h-3 text-purple-400" />
                          <span>{isPoured ? 'POURED' : 'POUR WINE'}</span>
                        </button>

                        {/* Fire Station Button */}
                        <button
                          onClick={() => fireKitchen(dish.courseNumber)}
                          className="px-3 py-1.5 bg-[#182236] hover:bg-[#202e4a] text-sky-300 border border-sky-500/30 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                        >
                          <Flame className="w-3 h-3 text-sky-400" />
                          <span>FIRE</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
