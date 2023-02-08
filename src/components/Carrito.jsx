import React from 'react'

import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/Carrito.module.css'


function Carrito() {
    
    const { entities, loading , order} = useSelector((state) => state.data);
    console.log('order carrito')
    console.log(order)
    
    return (
        <div className={styles.containerPopup}>       
        
            <h1>hola carritos</h1>
            <h2>{order.cost}</h2>
            {
                
                order.items.map((item, key) => {
                    return(
                        <div>
                            <p><span>{item.productName}</span> <span>{item.quantity}</span> <button>eliminar</button>  </p>
                        </div>
                    )
                })
            
            }
            {/* {
                !loading ? ( 
                    order.map((item,key)=>{
                        return(
                            <div >
                                <p>hola</p> */}
                                {/* <p>{item.productName} <span>{item.price}</span> </p> <button>add</button> <button>quitar</button> */}
                            {/* </div>
                        )
                    })
                ): <p>Carrito vacio</p>
            } */}
        </div>
    )
}

export default Carrito