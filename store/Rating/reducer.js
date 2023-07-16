import {createSlice} from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';

const createSingleOption = () => ({
    id: uuid.v4(), // Generate a unique ID using nanoid
    optionName: '',
    firstEntity: {
        rating: 1,
    },
    secondEntity: {
        rating: 1,
    },
});


const initialState = {
    firstEntityName: '',
    secondEntityName: '',
    compareOptions: [
        createSingleOption()
    ]
};

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        addCompareOption: (state, _)=> {
            state.compareOptions.push(createSingleOption());
        },
        removeCompareOption: (state, _) => {
            state.compareOptions.pop();
        },
        setSingleOptionName: (state, action) => {
            const { id, optionName } = action.payload;
            const singleOption = state.compareOptions.find(option => option.id === id);
            if (singleOption) {
                singleOption.optionName = optionName;
            }
        },
        setFirstEntityName: (state, action) => {
            state.firstEntityName = action.payload;
        },
        setSecondEntityName: (state, action) => {
            state.secondEntityName = action.payload;
        },
        setFirstEntityRating: (state, action) => {
            const { id, rating } = action.payload;
            const singleOption = state.compareOptions.find(option => option.id === id);
            if (singleOption) {
                singleOption.firstEntity.rating = rating;
            }
        },
        setSecondEntityRating: (state, action) => {
            const { id, rating } = action.payload;
            const singleOption = state.compareOptions.find(option => option.id === id);
            if (singleOption) {
                singleOption.secondEntity.rating = rating;
            }
        },
        clearOptions: (state, _)=> {
            state.compareOptions = [createSingleOption()];
        }
    }
})

export const {
    addCompareOption,
    removeCompareOption,
    setSingleOptionName,
    setFirstEntityName,
    setSecondEntityName,
    setFirstEntityRating,
    setSecondEntityRating,
    clearOptions,
} = ratingSlice.actions;
export default ratingSlice.reducer;