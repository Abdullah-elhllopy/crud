import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataProps {
    id: string;
    name: string;
    price: string;
    quantity: string;
}

interface CrudState {
    data: DataProps[];
    updatedItem : DataProps;
}

const initialState: CrudState = {
    data: [],
    updatedItem : {
        id : "",
        name : "",
        price : "",
        quantity : "",
    }
};

export const crudSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<{ data: DataProps }>) => {
            state.updatedItem = action.payload.data;
        },
        updateData: (state, action: PayloadAction<{ id: string; newData: Partial<DataProps> }>) => {
            const updatedData = state.data.map(item =>
                item.id === action.payload.id ? { ...item, ...action.payload.newData } : item
            );
            state.data = updatedData;
        },
        addNewData: (state, action: PayloadAction<{ item: DataProps }>) => {
            state.data = [ ...state.data ,action.payload.item];
        },
        deleteData: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter(item => item.id !== action.payload.id);
        },

    },
});

export const { setData, updateData, addNewData , deleteData} = crudSlice.actions;
export default crudSlice.reducer;
