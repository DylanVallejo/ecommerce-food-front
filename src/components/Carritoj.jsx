import React, { useEffect, useState, } from 'react'

import { useSelector, useDispatch   } from "react-redux";
import {  removeFromArr } from "../features/data/dataSlice";

import styles from '../styles/Carrito.module.css'
import axios from 'axios';
import Swal from 'sweetalert2'

function Carritoj(  ) {
    
    // 1.-llamar order items
    
    const {orderItems} =  useSelector( (state) =>  state.data);
    // const dispatch = useDispatch();

    const orderUrl = `http://localhost:8082/api/order`;
    
    
    // 2.- clonar order items al abrir la app
    const [clonOrderItems, setClonOrderItems] = useState( null );
    
    
    //3.- mostar el precio de los productos 
    const [subtotal, setSubtotal] = useState(0);
    
    //4.- mostrar el total de la compra
    const [total, setTotal] = useState(0);
    
    
    //5.- actualizar el array cada que hago un cambio
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
                clonOrderItems
            ,
            "totalAmount": null
        }   
        
    )
    
    
    const [idProduct, setIdProduct] = useState(0)
    
    useEffect(() => {
        
        setClonOrderItems(structuredClone(orderItems));
        
    
    }, [orderItems])
    
    
    
    
    
    const setQuantity = (key,e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems) ;
        updateItem[key].quantity = newQuantity +1;   
        console.log("manipulando la cantidad")
        console.log(updateItem)   
        setClonOrderItems(updateItem)
    }
    
    const setMinusQuantity = (key,e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems) ;
        
        if(updateItem[key].quantity > 1 ){
            updateItem[key].quantity = newQuantity - 1;   
            console.log(updateItem)   
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
    
    const removeItem = (id,e ) => {
        e.preventDefault();
        console.log('remove')

        // dispatch(removeFromArr(id));
        console.log(id)
        let updateItem = structuredClone(clonOrderItems) ;
        
        let index = updateItem.findIndex(obj => obj.id === id);
        console.log(index)
        if (index !== -1) {
            updateItem.splice(index, 1);
        }
        console.log(updateItem)
        setClonOrderItems(updateItem)
    }
    
    // const deleteOneObject  = ( e  ) => {
    //     e.preventDefault()
    //     console.log("paso")
    //     // dispatch(removeFromArr(id));
        
    // }
    
    // const quePasa = (e) => {
    //     e.preventDefault();
    //     console.log("que pasa ?")
        
    // }
        
    
    const enviarTodo = (e, clonOrderItems,total) => {
        e.preventDefault();
        
        let sendObject = {
            "shipping" : 1,
            "associate":{ 
                "id": 1
            },
            "orderState": {
                "id":1
            }, 
            "cost": 3 , 
            "items":
                clonOrderItems
            ,
            "totalAmount": 0
        }
        
        console.log('esto se envia')
        console.log(sendObject)
        
        
        axios.post( orderUrl,sendObject )
        .then(res=>{
            console.log(res)
        }) 
        .catch(error=>{
            console.log(error)
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada',
            showConfirmButton: false,
            timer: 1000
        })
    }
    
    return (
        <div className={styles.carritoContainer}>       
        
            <h2>Carrito</h2>
            <form onSubmit={e=>enviarTodo(e, clonOrderItems, arrayJ,total)}>
            {
                clonOrderItems?.map((item, key) => {
                    return(
                        <div key={key} className={styles.allProductsContainer}>
                            {/* {key}
                            {item.id} id */}
                            <p>
                                <span className={styles.productCar}>{item.productName}</span> 
                                <section className={styles.cartQuantityContainer}>
                                    <span className={styles.productQuantity}>cantidad: {item.quantity} 
                                    <button onClick={e=> setQuantity(key,e,item.quantity)} className={styles.quantityBtnsCart} >+</button> 
                                    <button onClick={e=> setMinusQuantity(key,e,item.quantity)} className={styles.quantityBtnsCart}>-</button></span> 
                                </section>
                                <button onClick={e=>removeItem(e,item.id)} className={styles.removeBtnCart} >eliminar</button>  
                                {/* <button onClick={deleteOneObject(item.id)}>delete</button> */}
                                {/* <button onClick={e=>{quePasa(item.id,e)}}>Porque?</button> */}
                            </p>
                            {/* onClick={(e)=>{eliminarProducto(key,e)}} */}
                        </div>
                    )
                })
            }
                <button type='submit' className={styles.btnComprar}>Comprar</button>
            </form>
            
        </div>
    )
}

export default Carritoj