import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quotationData: {}
};

const quotationSlice = createSlice({
    name: 'quotation',
    initialState,
    reducers: {
        setQuotationData: (state, action) => {
            state.quotationData = action.payload;
        }
    }
});

export const { setQuotationData } = quotationSlice.actions;
export default quotationSlice.reducer;