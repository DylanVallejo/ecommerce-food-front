import React from 'react';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import styles from "../styles/PopUp.module.css"
import { useSelector, useDispatch } from "react-redux";



function PopUp() {
    
    const { entities, loading } = useSelector((state) => state.data);
    
    return (
        <Popup trigger={<i className="fa-solid fa-cart-shopping"></i>} position="right center">
            {/* traer los productos que tienen  los usuarios del carrito  */}
            <div className={styles.containerPopup}>       
                {
                    !loading ? ( 
                        entities.map((item,key)=>{
                            return(
                                <div >
                                    {/* agregar un boton para eliminar o agreagar mas */}
                                    <p>{item.productName} <span>{item.price}</span> </p>
                                </div>
                            )
                        })
                    ): <p>Carrito vacio</p>
                }
            </div>
        </Popup>
    )
}

export default PopUp