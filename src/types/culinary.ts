export type CourseCategory = 'AMUSE_BOUCHE' | 'ENTREE' | 'POISSON' | 'VIANDE' | 'PRE_DESSERT' | 'GRAND_DESSERT';

export interface Dish {
  id: string;
  courseNumber: number;
  category: CourseCategory;
  name: string;
  japaneseSubtitle: string;
  technique: string;
  coreTemperatureC: number;
  acidityPH: number;
  sommelierPairing: string;
  ingredients: string[];
  volatileCompounds: string[];
  allergenFlags: string[];
  platingViscosity: 'GEL' | 'EMULSION' | 'CRYO_DUST' | 'CLEAR_CONSOMME';
}

export interface FlavorCompound {
  name: string;
  chemicalClass: string;
  aromaProfile: string;
  keySources: string[];
  affinityScore: number;
  complementaryMolecules: string[];
}

export interface TableTastingSession {
  tableId: string;
  guestName: string;
  guestCount: number;
  serviceStartTime: string;
  currentCourse: number;
  wineFlightActive: boolean;
  specialDiet: string;
}

export interface CulinaryContextType {
  dishes: Dish[];
  activeCourse: number;
  setActiveCourse: (num: number) => void;
  activeSession: TableTastingSession;
  flavorCompounds: FlavorCompound[];
  advanceCourse: () => void;
  resetService: () => void;
}
