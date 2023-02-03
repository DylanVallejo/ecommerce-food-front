import { createAsyncThunk,createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
const mainUrl = `http://localhost:8082/api/product`;

const initialState = {
    entities: [],
    loading: false
}

export const getData = createAsyncThunk(
    "db/getData",
    async () => {
        const response = await axios.get(mainUrl)
        return response.data
    }
)


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        //
        holaReducer: (state, {payload}) => {
            console.log("hola desde redux")
            console.log("state")
            
        },
        
    },
    extraReducers: {
        [getData.pending]: (state) => {
            state.loading = true
        },
        [getData.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.entities = [...payload]
        },
        [getData.rejected]: (state) => {
            state.loading = false
        },
    }
})
//


// exportando los reducers
export const { holaReducer } = dataSlice.actions



//debo exportar el reducer de dataSlice
export default dataSlice.reducer