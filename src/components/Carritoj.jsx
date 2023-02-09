import React, { useEffect, useState, } from 'react'

import { useSelector, useDispatch,  } from "react-redux";
// import { getOrderStatus } from "../features/data/dataSlice";

import styles from '../styles/Carrito.module.css'
import axios from 'axios';



function Carritoj(  ) {
    
    const {orderItems} =  useSelector( (state) =>  state.data);
    
    console.log(useSelector( (state) =>  state.data))

    const dispatch = useDispatch();
    
    const orderUrl = `http://localhost:8082/api/order`;
    
    
    const [clonOrderItems, setClonOrderItems] = useState( null );
    
    // const [idOrder,setIdOrder] = useState( null );
    
    const urlAddProduct = `http://localhost:8082/api/orderproduct/orderproduct/6`
    
    
    const [arrayJ, setArrayJ] = useState(
        
        {
            "shipping" : 1,
            "associate":{ 
                "id": 1
            },
            "orderState": {
                "id":1
            }, 
            "cost": 3 , 
            "items":
                null
            ,
            "totalAmount": null
        }   
        
    )
    
    console.log(arrayJ)
    console.log(clonOrderItems)
    
    
    useEffect(() => {
        
        
        let initalArray = structuredClone(orderItems) ;
        setClonOrderItems(initalArray)
        
        
        setArrayJ({
                "shipping" : 1,
                "associate":{ 
                    "id": 1
                },
                "orderState": {
                    "id":1
                }, 
                "cost": 3 , 
                "items":
                    initalArray
                ,
                "totalAmount": null
            }  
        )
        
    
    }, [orderItems])
        
    
    const enviarTodo = (e) => {
        e.preventDefault();
        console.log(arrayJ)
        axios.post( orderUrl,arrayJ )
        .then(res=>{
            console.log(res)
        }) 
        .catch(error=>{
            console.log(error)
        })
    }

    
    
    // useEffect(() => {
        
    //     let initalArray = structuredClone(orderItems) ;
    //     setClonOrderItems(initalArray)
        
    // }, [orderItems])
    

    
    // const handleCarrito  = (e,clonOrderItems) => {
        
    //     e.preventDefault();
        
    //     axios.post(orderUrl, {

    //         "shipping" : 1,
    //         "associate":{ 
    //             "id": 1
    //         },
    //         "orderState": {
    //             "id":1
    //         }, 
    //         "cost": 3
            
    //     }).then( res => {
    //         dispatch(getOrderStatus(res.data));
    //         console.log("res 1")
    //         console.log(res)
    //         setIdOrder(res.data.id)
            
    //     }).then(async  () => { 
    //         if( clonOrderItems !== undefined){
    //             for( let i=0 ; i <= clonOrderItems.length ; i++ ){

    //                 console.log(clonOrderItems)
    //                 await axios.post( 
    //                     urlAddProduct,   {
    //                         "status": true,
    //                         "productId": clonOrderItems[i].id, 
    //                         "price": clonOrderItems[i].price,
    //                         "quantity": clonOrderItems[i].quantity
    //                     } 
    //                 ).then(res=>{
    //                     console.log("res del carrito post productos")
    //                     console.log(res)
    //                 }).catch(error => {
    //                     console.log(error)
    //                 })
    //             }
    //         }else{
    //             console.log("no exsite")
    //         }
    //     })
    // }
    
    // const setQuantity = (key,e, newQuantity) => {
    //     e.preventDefault();
    //     let updateItem = structuredClone(clonOrderItems) ;
    //     updateItem[key].quantity = newQuantity +1;      
    //     setClonOrderItems(updateItem)
    // }
    

    
    return (
        <div className={styles.containerPopup}>       
        
            <h1>hola carritos desde cart j</h1>
            <form onSubmit={e=>enviarTodo(e, clonOrderItems)}>
            {
                clonOrderItems?.map((item, key) => {
                    return(
                        <div key={key}>
                            {key}
                            <p><span>{item.productName}</span> <span>cantidad: {item.quantity}</span> <button>eliminar</button>  </p>
                        </div>
                    )
                })
            }
                <button type='submit' >submit</button>
            </form>
            
        </div>
    )
}

export default Carritoj