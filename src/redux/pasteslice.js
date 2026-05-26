import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}

const pasteslice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const data = action.payload;
            state.pastes.push(data);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste Created Successfully");
        },
        updateToPastes: (state, action) => {
            const data = action.payload;
            const index = state.pastes.findIndex((item) => {
                return item.id === data.id;
            })
            if (index >= 0) {
                state.pastes[index] = data;

                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste updated")
            }
        },
        removePastes: (state, action) => {
            const pasteId = action.payload; 

            const index = state.pastes.findIndex((item) => item.id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Deleted Successfully");
            }
        },
        resetAllPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("All Pastes Cleared");
        }
    }
})

export const { addToPastes, updateToPastes, resetAllPastes, removePastes } = pasteslice.actions
export default pasteslice.reducer