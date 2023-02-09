import React, { useEffect, useState, } from 'react'

import { useSelector, useDispatch,  } from "react-redux";
import { getOrderStatus } from "../features/data/dataSlice";

import styles from '../styles/Carrito.module.css'
import axios from 'axios';



function Carrito(  ) {
    
    const {orderItems} =  useSelector( (state) =>  state.data);

    const dispatch = useDispatch();
    
    const orderUrl = `http://localhost:8082/api/order`;
    
    
    
    const [contador, setContador] = useState(0)

    
    const [clonOrderItems, setClonOrderItems] = useState( null );
    
    const [idOrder,setIdOrder] = useState( null );
    
    const urlAddProduct = `http://localhost:8082/api/orderproduct/orderproduct/6`
    
    
    
    // console.log(clonOrderItems[0].id[0]);
    
    
    
    useEffect(() => {
        
        let initalArray = structuredClone(orderItems) ;
        setClonOrderItems(initalArray)
        // console.log("ejecuta")
        
    }, [orderItems])
    
    // console.log("clonOrderItems")

    // console.log(clonOrderItems)
    
    const handleCarrito  = (e,clonOrderItems) => {
        
        // console.log(" order items dentro de handle carrito")
        
        // console.log(clonOrderItems)
        
        
        e.preventDefault();
        
        
        axios.post(orderUrl, {

            "shipping" : 1,
            "associate":{ 
                "id": 1
            },
            "orderState": {
                "id":1
            }, 
            "cost": 3
            
        }).then( res => {
            dispatch(getOrderStatus(res.data));
            console.log("res 1")
            // console.log(clonOrderItems)

            console.log(res)
            setIdOrder(res.data.id)
            
        }).then(async  () => { 
            if( clonOrderItems !== undefined){
                for( let i=0 ; i <= clonOrderItems.length ; i++ ){
                    console.log("ciclo");
                    console.log(clonOrderItems);
                    console.log(clonOrderItems[i].id);
                    console.log(clonOrderItems[i].price);
                    console.log(clonOrderItems[i].quantity);
                    
                    
                    console.log(clonOrderItems)
                    await axios.post( 
                        urlAddProduct,   {
                            "status": true,
                            "productId": clonOrderItems[i].id, 
                            "price": clonOrderItems[i].price,
                            "quantity": clonOrderItems[i].quantity
                        } 
                    ).then(res=>{
                        console.log("res del carrito post productos")
                        console.log(res)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }else{
                console.log("no exsite")
            }
        })

    }
    
    const setQuantity = (key,e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems) ;
        // console.log(updateItem);
        // console.log(updateItem[0].quantity)
        // console.log(newQuantity+"cantidad de map");
        updateItem[key].quantity = newQuantity +1;      
        setClonOrderItems(updateItem)
    }
    
    const contadorSumar = ( e ) => {
        e.preventDefault();
        setContador( contador + 1 )
    }
    
    return (
        <div className={styles.containerPopup}>       
        
            <h1>hola carritos</h1>
            <form onSubmit={e=>handleCarrito(e, clonOrderItems)}>
            {
                clonOrderItems?.map((item, key) => {
                    return(
                        <div key={key}>
                            {key}
                            <p><span>{item.productName}</span> <span>cantidad: {item.quantity} <button onClick={e=> setQuantity(key,e,item.quantity)}>+</button></span> <button>eliminar</button>  </p>
                        </div>
                    )
                })
            }
                <button type='submit' >submit</button>
            </form>

            <button onClick={e=> contadorSumar(e)}>
                contador
            </button>
            <p>{contador}</p>
            
        </div>
    )
}

export default Carrito