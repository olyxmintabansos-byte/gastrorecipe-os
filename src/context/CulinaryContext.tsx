'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, FlavorCompound, TableTastingSession, CulinaryContextType } from '@/types/culinary';

const SEED_DISHES: Dish[] = [
  {
    id: 'dish-01',
    courseNumber: 1,
    category: 'AMUSE_BOUCHE',
    name: 'Translucent Spherical Dashi & Yuzu Pearl',
    japaneseSubtitle: '出汁 柚子 珠玉',
    technique: 'Direct Calcium Alginate Spherification',
    coreTemperatureC: 4.0,
    acidityPH: 4.8,
    sommelierPairing: 'Dassai Beyond 23 Junmai Daiginjo',
    ingredients: ['Kombu Ichiban Dashi', 'Kochi Yuzu Oil', 'Edible 24k Gold Leaf'],
    volatileCompounds: ['Limonene', 'Glutamic Acid', 'Guanylate'],
    allergenFlags: ['FISH_EXTRACT'],
    platingViscosity: 'GEL',
  },
  {
    id: 'dish-02',
    courseNumber: 2,
    category: 'ENTREE',
    name: 'Nitro-Poached Hokkaido Scallop & Shiso Snow',
    japaneseSubtitle: '北海道帆立 紫蘇 零下氷',
    technique: '-196°C Liquid Nitrogen Micro-Cryo Grating',
    coreTemperatureC: -8.0,
    acidityPH: 5.6,
    sommelierPairing: '2020 Domaine Leflaive Puligny-Montrachet',
    ingredients: ['Hokkaido Diver Scallops', 'Red Shiso Essence', 'Finger Lime Caviar'],
    volatileCompounds: ['Perillaldehyde', 'Linalool', 'Glycine'],
    allergenFlags: ['MOLLUSC'],
    platingViscosity: 'CRYO_DUST',
  },
  {
    id: 'dish-03',
    courseNumber: 3,
    category: 'POISSON',
    name: 'Wild Turbot with Rotovap Truffle Consommé',
    japaneseSubtitle: '平目 黒トリュフ 清湯',
    technique: 'Low-Pressure Rotary Evaporation (40°C)',
    coreTemperatureC: 56.5,
    acidityPH: 6.1,
    sommelierPairing: '2019 Meursault Premier Cru Genevrières',
    ingredients: ['Breton Wild Turbot', 'Périgord Black Truffle', 'Clarified Chicken Essence'],
    volatileCompounds: ['Dimethyl Sulfide', 'Methional', 'Inosinate'],
    allergenFlags: ['FISH'],
    platingViscosity: 'CLEAR_CONSOMME',
  },
  {
    id: 'dish-04',
    courseNumber: 4,
    category: 'VIANDE',
    name: 'A5 Miyazaki Wagyu Ribcap & Smoked Bone Marrow Emulsion',
    japaneseSubtitle: '宮崎牛 A5 燻製 骨髄乳濁',
    technique: 'Precision Ultrasound Emulsification & Binchotan Sear',
    coreTemperatureC: 54.5,
    acidityPH: 6.4,
    sommelierPairing: '2015 Château Margaux Premier Grand Cru',
    ingredients: ['Miyazaki A5 Wagyu (BMS 12)', 'Binchotan Charcoal Ash', 'Fermented Black Garlic'],
    volatileCompounds: ['Lactone', 'Guaiacol', 'Pyrazines'],
    allergenFlags: ['DAIRY'],
    platingViscosity: 'EMULSION',
  },
  {
    id: 'dish-05',
    courseNumber: 5,
    category: 'PRE_DESSERT',
    name: 'Ultrasonic Lychee Aerated Mousse & Matcha Crisp',
    japaneseSubtitle: 'ライチ 気泡 宇治抹茶 薄片',
    technique: 'N2O Vacuum Chamber Expansion & Dehydration',
    coreTemperatureC: 2.0,
    acidityPH: 4.2,
    sommelierPairing: 'Ippodo Ummon-no-mukashi Uji Matcha',
    ingredients: ['Fukien Lychee Pulp', 'Ceremonial Grade Uji Matcha', 'Malic Acid Crunch'],
    volatileCompounds: ['Linalool Oxide', 'Damascenone', 'Theanine'],
    allergenFlags: [],
    platingViscosity: 'GEL',
  },
  {
    id: 'dish-06',
    courseNumber: 6,
    category: 'GRAND_DESSERT',
    name: 'Smoked Valrhona 72% Chocolate Meteor with Gold Leaf Core',
    japaneseSubtitle: '燻製 漆黒 隕石ショコラ',
    technique: 'Isomalt Glassblowing & Hickory Wood Smoke Infusion',
    coreTemperatureC: 16.0,
    acidityPH: 5.2,
    sommelierPairing: '1982 Graham’s Vintage Tawny Port',
    ingredients: ['Valrhona Guanaja 72%', 'Smoked Fleur de Sel', 'Tahitian Vanilla Pods'],
    volatileCompounds: ['Vanillin', 'Tetramethylpyrazine', 'Syringol'],
    allergenFlags: ['DAIRY', 'SOY'],
    platingViscosity: 'GEL',
  },
];

const SEED_COMPOUNDS: FlavorCompound[] = [
  {
    name: 'Trimethylamine',
    chemicalClass: 'Tertiary Amine',
    aromaProfile: 'Deep Saline, Oceanic Umami, Marine Minerals',
    keySources: ['White Sturgeon Caviar', 'White Chocolate', 'Sea Urchin Uni'],
    affinityScore: 94,
    complementaryMolecules: ['Limonene', 'Butyric Acid', 'Glutamate'],
  },
  {
    name: 'Limonene',
    chemicalClass: 'Cyclic Monoterpene',
    aromaProfile: 'Zesty Citrus, Fresh Terpene, High Octane Floral',
    keySources: ['Kochi Yuzu', 'Finger Lime', 'Bergamot Orange'],
    affinityScore: 91,
    complementaryMolecules: ['Perillaldehyde', 'Linalool', 'Citral'],
  },
  {
    name: '2-Acetyl-1-pyrroline',
    chemicalClass: 'Nitrogen Heterocycle',
    aromaProfile: 'Roasted Basmati, Toasted Rice, Binchotan Crust',
    keySources: ['Niigata Koshihikari Crust', 'Pandan Leaf', 'Binchotan Grilled Poultry'],
    affinityScore: 96,
    complementaryMolecules: ['Pyrazines', 'Vanillin', 'Methional'],
  },
  {
    name: 'Syringol & Guaiacol',
    chemicalClass: 'Methoxyphenols',
    aromaProfile: 'Aromatic Hardwood Smoke, Lignin Pyrolysis, Peat',
    keySources: ['Binchotan Charcoal Ash', 'Smoked Bone Marrow', 'Single Malt Islay Scotch'],
    affinityScore: 89,
    complementaryMolecules: ['Lactones', 'Eugenol', 'Glutamic Acid'],
  },
];

const LOCAL_STORAGE_KEY = 'gastrorecipe_os_state_v1';

const CulinaryContext = createContext<CulinaryContextType | undefined>(undefined);

export function CulinaryProvider({ children }: { children: React.ReactNode }) {
  const [dishes] = useState<Dish[]>(SEED_DISHES);
  const [flavorCompounds] = useState<FlavorCompound[]>(SEED_COMPOUNDS);
  const [activeCourse, setActiveCourse] = useState<number>(1);
  const [activeSession, setActiveSession] = useState<TableTastingSession>({
    tableId: 'OMAKASE-VIP-01',
    guestName: 'Ambassador Kenji Sato & Party',
    guestCount: 4,
    serviceStartTime: '19:30 JST',
    currentCourse: 1,
    wineFlightActive: true,
    specialDiet: 'NO PEANUTS • PREFERS DRY SAKE FLIGHT',
  });

  // LocalStorage Sync
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeCourse) setActiveCourse(parsed.activeCourse);
        if (parsed.activeSession) setActiveSession(parsed.activeSession);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ activeCourse, activeSession }));
    } catch {}
  }, [activeCourse, activeSession]);

  const advanceCourse = () => {
    setActiveCourse((prev) => {
      const next = prev < dishes.length ? prev + 1 : prev;
      setActiveSession((s) => ({ ...s, currentCourse: next }));
      return next;
    });
  };

  const resetService = () => {
    setActiveCourse(1);
    setActiveSession((s) => ({ ...s, currentCourse: 1 }));
  };

  return (
    <CulinaryContext.Provider
      value={{
        dishes,
        activeCourse,
        setActiveCourse,
        activeSession,
        flavorCompounds,
        advanceCourse,
        resetService,
      }}
    >
      {children}
    </CulinaryContext.Provider>
  );
}

export function useCulinary() {
  const context = useContext(CulinaryContext);
  if (!context) throw new Error('useCulinary must be used within CulinaryProvider');
  return context;
}
