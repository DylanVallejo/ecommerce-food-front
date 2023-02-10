import { createAsyncThunk,createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

const mainUrl = `http://localhost:8082/api/product`;

const initialState = {
    entities: [],
    loading: false,
    order: [ ],
    orderItems: [ ],
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
        removeFromArr:(state, {payload}) => {
            // payload.e.preventDefault();
            console.log('llega al id?');
    
            console.log(payload)
            let clone = state.orderItems
            
            let index = clone.findIndex(obj => obj.id === payload);
            console.log(index)
            if (index !== -1) {
                clone.splice(index, 1);
            }
            state.orderItems = clone
            
            console.log(clone)
            
            
            // console.log(updateItem)
            // setClonOrderItems(updateItem)
            
                // console.log(id)
            // let updateItem = structuredClone(clonOrderItems) ;
            
            // let index = updateItem.findIndex(obj => obj.id === id);
            // console.log(index)
            // if (index !== -1) {
            //     updateItem.splice(index, 1);
            // }
            // console.log(updateItem)
            // setClonOrderItems(updateItem)
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
export const { getOrderStatus, setItemsArray,removeFromArr} = dataSlice.actions

//debo exportar el reducer de dataSlice
export default dataSlice.reducer