import React, { useEffect, useState, } from 'react'

import { useSelector, useDispatch,  } from "react-redux";
import { getOrderStatus } from "../features/data/dataSlice";

import styles from '../styles/Carrito.module.css'
import axios from 'axios';
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'




function Carrito(  ) {
    
    
    // const MySwal = withReactContent(Swal)
    
    const {orderItems} =  useSelector( (state) =>  state.data);

    const dispatch = useDispatch();
    
    const orderUrl = `http://localhost:8082/api/order`;
    
        
    const [clonOrderItems, setClonOrderItems] = useState( null );
    
    const [idOrder,setIdOrder] = useState( null );
    
    const urlAddProduct = `http://localhost:8082/api/orderproduct/orderproduct/7`
    
    
    
    // console.log(clonOrderItems[0].id[0]);
    
    
    
    useEffect(() => {
        
        let initalArray = structuredClone(orderItems) ;
        setClonOrderItems(initalArray)
        
    }, [orderItems])
    

    
    const handleCarrito  = (e,clonOrderItems) => {

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
            console.log(res)
            setIdOrder(res.data.id)
            
        }).then(async  () => { 
            if( clonOrderItems !== undefined){
                for( let i=0 ; i <= clonOrderItems.length ; i++ ){
                    // console.log("ciclo");
                    // console.log(clonOrderItems);
                    // console.log(clonOrderItems[i].id);
                    // console.log(clonOrderItems[i].price);
                    // console.log(clonOrderItems[i].quantity);
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
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada',
            showConfirmButton: false,
            timer: 1500
        })

    }
    
    const setQuantity = (key,e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems) ;
        updateItem[key].quantity = newQuantity +1;      
        setClonOrderItems(updateItem)
    }
    
    const setMinusQuantity = (key,e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems) ;
        
        if(updateItem[key].quantity > 1 ){
            updateItem[key].quantity = newQuantity - 1;      
            setClonOrderItems(updateItem)
        }else{
            // MySwal.fire("La cantidad minima es 1")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La cantidad minima es 1 !!!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    
    }
    
    const eliminarProducto = (key,e) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems);
        updateItem.filter( key ).slice();
        setClonOrderItems(updateItem)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Producto eliminado!!!',
            // footer: '<a href="">Why do I have this issue?</a>'
        })
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
                            <p><span>{item.productName}</span> <span>cantidad: {item.quantity} <button onClick={e=> setQuantity(key,e,item.quantity)}>+</button>  <button onClick={e=> setMinusQuantity(key,e,item.quantity)}>-</button></span> <button onClick={(e)=>{eliminarProducto(key,e)}}>eliminar</button>  </p>
                        </div>
                    )
                })
            }
                <button type='submit' >submit</button>
            </form>
            
        </div>
    )
}

export default Carrito