import { createAsyncThunk,createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

const mainUrl = `http://localhost:8082/api/product`;

const initialState = {
    entities: [],
    loading: false,
    order: [ ],
    orderItems: [ ],
    generatedOrder: null,
}

export const getData = createAsyncThunk(
    "db/getData",
    async () => {
        const response = await axios.get(mainUrl)
        return response.data
    },
)


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

        getOrderStatus: (state, {payload}) => {
            console.log('hola desde payload')
            console.log(payload)
            state.order = payload
        },
        setItemsArray: (state , {payload} ) => {
            console.log('llega al paylaod?');
            console.log(payload);
            payload['quantity'] = 1;
            payload['status'] = true;
            payload['productId'] = payload.id;
            state.orderItems = [ payload ,  ...state.orderItems ]
            console.log(state.orderItems);
            
        },
        setNewValuesForArray:(state, {payload}) => {
            console.log('llega el nuevo array actualizado?');
            console.log(payload);
            state.orderItems = payload
            
        },
        setGeneratedOrder:(state, {payload}) => {
            state.generatedOrder = payload 
        }
        
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

// exportando los reducers
export const { getOrderStatus, setItemsArray,setNewValuesForArray,setGeneratedOrder} = dataSlice.actions

//debo exportar el reducer de dataSlice
export default dataSlice.reducer