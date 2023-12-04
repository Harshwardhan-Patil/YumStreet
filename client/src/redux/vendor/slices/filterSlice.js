import { SortByCategoriesKeys, SortByEnum } from '@/constants/constants';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sortBy: SortByEnum.popularity.key,
    cuisines: [],
    rating: { min: 0, max: 5 },
    costPerPerson: { min: 0, max: 'any' },
}

const filterSlice = createSlice({
    initialState,
    name: 'filter',
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = SortByCategoriesKeys.includes(action.payload)
                ? action.payload
                : SortByEnum.popularity.key;
        },
        setCuisines: (state, action) => {
            if (!state.cuisines.includes(action.payload))
                state.cuisines = [action.payload, ...state.cuisines]
        },
        removeCuisines: (state, action) => {
            state.cuisines = state.cuisines.filter(cuisine => cuisine !== action.payload);
        },
        setRating: (state, action) => {
            state.rating.min = action.payload;
        },
        setCostPerPerson: (state, action) => {
            state.costPerPerson.min = action.payload.min;
            state.costPerPerson.max = action.payload.max;
        },
        resetFilters: () => {
            return initialState;
        },

    }
})

export const { resetFilters, setCostPerPerson, setCuisines, setRating, setSortBy, removeCuisines } = filterSlice.actions;
export default filterSlice.reducer;