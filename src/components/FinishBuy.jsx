// import { Container } from '@mui/material';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setPaymentStatus } from "../features/data/dataSlice";

import axios from 'axios';
import Swal from 'sweetalert2'  



function FinishBuy() {
    
    const { generatedOrder } = useSelector(state => state.data)
    const paymentStatus = `http://localhost:8082/api/payment`
    
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
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    return (
        <div>
            <h4>finalizar compra</h4>
            <div>
                <h3> ID de la compra {generatedOrder?.id}</h3>
                {
                    generatedOrder?.items.map((item, key) => {
                        return(
                            <div key={key}>
                                <ol>
                                    <li>    
                                        <p>{item.productName} <span>Subtotal: {item.subtotal}</span></p>
                                    </li>
                                </ol>
                            </div>
                        )
                    })
                }
                <h3>{generatedOrder?.totalAmount}</h3>
            </div>
            <button onClick={e=>handleFinish(e,generatedOrder.id)}>Finalizar Compra</button>
        </div>
    )
}

export default FinishBuy