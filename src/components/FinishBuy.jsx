// import { Container } from '@mui/material';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

function FinishBuy() {
    
    const { generatedOrder } = useSelector(state => state.data)
    
    // const { entities, loading } = useSelector((state) => state.data);
    
    // const dispatch = useDispatch();
    console.log(generatedOrder)
    
    return (
        <div>
            <h4>finalizar compra</h4>
            <div>
                <h3> ID de la compra {generatedOrder?.id}</h3>
                {
                    generatedOrder.items.map((item, key) => {
                        return(
                            <div key={key}>
                                <ol>
                                    <li>    
                                        {item.productName}
                                    </li>
                                </ol>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default FinishBuy