// import { Container } from '@mui/material';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setPaymentStatus, setGeneratedOrder} from "../features/data/dataSlice";
import { useNavigate } from 'react-router-dom';
import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import styles from "../styles/FinishBuy.module.scss"

import axios from 'axios';
import Swal from 'sweetalert2'  



function FinishBuy() {
    
    const { generatedOrder } = useSelector(state => state.data)
    
    
    const paymentStatus = `http://localhost:8082/api/payment`
    const orderStatusUrl = `http://localhost:8082/api/order/order-state/`
    
    
    //metricas de google 
    const gaEventTracker = useAnalyticsEventTracker('Finalizar compra');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    const handleFinish =  (e, orderId) => {
        e.preventDefault();
                
        axios.post(paymentStatus, {
            "orderId":orderId
        }).then(res=>{
            console.log(res)
            dispatch(setPaymentStatus(res.data));
            Toast.fire({
                icon: 'success',
                title:  `Compra finalizada`
            })
            navigate('/cartj')
        }).catch((error)=>{
            console.log(error)
            Toast.fire({
                icon: 'error',
                title:  `No se pudo finalizar la compra`
            })
        })
        gaEventTracker('Compra finalizada')
        //alertar de que el envio ya esta en camino 
        
    }
    
    const handleCancel = ( e, orderId) => {
        e.preventDefault();
        console.log(generatedOrder)
        axios.put(`${orderStatusUrl}${orderId}`,{
            "orderState": {
                "id":2
            }
        }).then(res=>{
            console.log(res)
            dispatch(setGeneratedOrder(res.data))
            Toast.fire({
                icon: 'error',
                title:  `Compra Cancelada`
            })
        }).catch(error =>{
            console.log(error)
            Toast.fire({
                icon: 'error',
                title:  `Hubo un error al cancelar la orden`
            })
        })
        
    }
    
    return (
        <div className={styles.finishContainer}>
            <h4 className={styles.finishTitle}>finalizar compra</h4>
            <div className={styles.finishBuyInfo}>
                <h3 className={styles.buyFinishID}>ID de la compra: {generatedOrder?.id}</h3>
                {
                    generatedOrder?.items.map((item, key) => {
                        return(
                            <div key={key}>
                                <ol>
                                    <p className={styles.finishNames}>
                                        {item.productName}
                                        <span className={styles.finsihPrices}> ${item.price}</span><br/>
                                        <span className={styles.finishSubtotal}>
                                            Subtotal: {item.subtotal}
                                        </span>
                                    </p>
                                </ol>
                            </div>
                        )
                    })
                }
                <h3>{generatedOrder?.totalAmount}</h3>
            </div>
            <button onClick={e=>handleCancel(e,generatedOrder.id)} className={styles.cancelarFinishBtn}>Cancelar Compra</button>
            
            <button onClick={e=>handleFinish(e,generatedOrder.id)} className={styles.finalizarFinishBtn}>Finalizar Compra</button>
        </div>
    )
}

export default FinishBuy