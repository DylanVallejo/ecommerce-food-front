import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/OrderState.module.scss'

function OrderState() {
    
    
    const { generatedOrder } = useSelector(state => state.data);
    
    return (
        <div className={styles.globalStatusContainer}>
        
            {
                // generatedOrder ?  
                <>
                    <h2 className={styles.statusTitle}> {generatedOrder?.orderState.description}</h2>
                    <div className={styles.estadoDeOrdenContainer}>
                    </div>
                </>
                // :
                // <div>
                //     <h4>Aun no has generado una orden</h4>
                // </div>
                
            }
        
        </div>
    )
}

export default OrderState