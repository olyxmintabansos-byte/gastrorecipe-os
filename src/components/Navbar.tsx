'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Utensils, Atom, BookOpen, Flame, Activity } from 'lucide-react';
import { useCulinary } from '@/context/CulinaryContext';

export function Navbar() {
  const pathname = usePathname();
  const { activeCourse, dishes } = useCulinary();

  const links = [
    { href: '/', label: 'BENTO MENU', sub: 'TASTING MATRIX' },
    { href: '/matrix/', label: 'COMPOUND PAIRING', sub: 'VOLATILE MOLECULES' },
    { href: '/techniques/', label: 'CRYO LAB', sub: 'HYDROCOLLOIDS' },
    { href: '/service/', label: 'SERVICE EXPEDITER', sub: 'MICHELIN RUN-SHEET' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07090e]/90 backdrop-blur-md border-b border-sky-950/80">
      {/* Cyber Y2K Telemetry Ribbon */}
      <div className="bg-[#040508] border-b border-[#121929] px-4 py-1 text-[11px] font-mono text-zinc-400 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sky-400 font-bold">
            <Atom className="w-3.5 h-3.5 animate-spin-slow text-sky-400" />
            <span>GASTRO-RECIPE MOLECULAR LAB // TOKYO GINZA EXPEDITION</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-300">
            SERVICE RUN: <strong className="text-white">COURSE {activeCourse} OF {dishes.length} PLATED</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-purple-300 font-mono">CRYO LN2: -196°C READY</span>
          <span className="text-emerald-400">TITAN #44 // STYLE #11 Y2K CYBER</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-sky-950 to-purple-950 border border-sky-400/50 flex items-center justify-center shadow-lg group-hover:border-sky-300 transition-all">
              <Utensils className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-2 font-mono">
                GASTRO<span className="text-sky-400">RECIPE</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  AESTHETIC #11
                </span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                MOLECULAR CULINARY MATRIX
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl transition-all flex flex-col items-center ${
                    active
                      ? 'bg-[#101726] text-sky-300 border border-sky-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-[#0c101a]'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-[9px] text-zinc-500">{item.sub}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/service/"
            className="px-4 py-2 bg-gradient-to-r from-sky-400 to-purple-500 hover:from-sky-300 hover:to-purple-400 text-black font-mono font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-black" />
            <span>KITCHEN RUN-SHEET</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
