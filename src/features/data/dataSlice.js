import { createAsyncThunk,createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
const mainUrl = `http://localhost:8082/api/product`;
const orderUrl = `http://localhost:8082/api/order`;

const initialState = {
    entities: [],
    loading: false,
    order: null
}

// const initOrder = {
    
//     "shipping" : 1,
//     "associate":{ 
//         "id": 1
//     },
//     "orderState": {
//         "id":1
//     },
//     "cost": 3
    
// };

export const getData = createAsyncThunk(
    "db/getData",
    async () => {
        const response = await axios.get(mainUrl)
        return response.data
    },
)


export const createOrder = createAsyncThunk(
    "db/createOrder",
    async () => {
        const order = await axios.post(orderUrl , {
    
            "shipping" : 1,
            "associate":{ 
                "id": 1
            },
            "orderState": {
                "id":1
            },
            "cost": 3
            
        })
        return order.data
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
        getOrderStatus: (state, {payload}) => {
            console.log('hola desde payload')
            console.log(payload)
            state.order = payload
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
        [createOrder.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.order = payload
        }
    }
})
//


// exportando los reducers
export const { holaReducer ,getOrderStatus} = dataSlice.actions



//debo exportar el reducer de dataSlice
export default dataSlice.reducer