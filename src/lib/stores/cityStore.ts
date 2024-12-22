// stores/cityStore.ts
import { create } from 'zustand';
import { CityDetailsState } from '../../props';

interface CityStore {
    selectedCity: CityDetailsState | null;
    setSelectedCity: (city: CityDetailsState) => void;
}

const useCityStore = create<CityStore>((set) => ({
    selectedCity: null,
    setSelectedCity: (city) => set({ selectedCity: city }),
}));

export default useCityStore;
