import { useState, } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { setNewValuesForArray } from "../features/data/dataSlice";
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Carrito.module.scss'
import axios from 'axios';
import Swal from 'sweetalert2'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Carritoj() {

    // 1.-llamar order items

    const { orderItems } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const orderUrl = `http://localhost:8082/api/order`;

    // 2.- clonar order items al abrir la app
    const [clonOrderItems, setClonOrderItems] = useState(orderItems);

    //3.- mostar el precio de los productos 
    const [subtotal, setSubtotal] = useState(0);

    //4.- mostrar el total de la compra
    const [total, setTotal] = useState(0);

    //5.- actualizar el array cada que hago un cambio
    const [arrayJ, setArrayJ] = useState(

        {
            "shipping": 1,
            "associate": {
                "id": 1
            },
            "orderState": {
                "id": 1
            },
            "cost": 3,
            "items":
                clonOrderItems
            ,
            "totalAmount": null
        }

    )
    
    const navigate = useNavigate();
    console.log(clonOrderItems)

    // const [idProduct, setIdProduct] = useState(0)

    // useEffect(() => {

    //     setClonOrderItems(structuredClone(orderItems));


    // }, [orderItems])

    const setQuantity = (key, e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems);
        updateItem[key].quantity = newQuantity + 1;
        console.log("manipulando la cantidad")
        console.log(updateItem)
        setClonOrderItems(updateItem)
        dispatch(setNewValuesForArray(updateItem))
    }

    const setMinusQuantity = (key, e, newQuantity) => {
        e.preventDefault();
        let updateItem = structuredClone(clonOrderItems);
        if (updateItem[key].quantity > 1) {
            updateItem[key].quantity = newQuantity - 1;
            console.log(updateItem)
            setClonOrderItems(updateItem)
            dispatch(setNewValuesForArray(updateItem))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La cantidad minima es 1 !!!',
            })
        }

    }

    const enviarTodo = (e, clonOrderItems, total) => {
        e.preventDefault();
        let sendObject = {
            "shipping": 1,
            "associate": {
                "id": 1
            },
            "orderState": {
                "id": 1
            },
            "cost": 3,
            "items":
                clonOrderItems
            ,
            "totalAmount": 0
        }
        if(clonOrderItems.length>0){
            console.log('esto se envia')
            console.log(sendObject)
            axios.post(orderUrl, sendObject)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada',
                showConfirmButton: false,
                timer: 1000
            })
        }else if(clonOrderItems.length === 0){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No existen productos para comprar',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    function remover(id, e) {
        e.preventDefault();
        console.log(e)
        console.log(id)
        let actualArray = structuredClone(clonOrderItems);
        let updateArrayItems = actualArray
        for (let i = 0; i < updateArrayItems.length; i++) {
            if (updateArrayItems[i].id === id) {
                updateArrayItems.splice(i, 1);
                break;
            }
        }
        setClonOrderItems(updateArrayItems)
        dispatch(setNewValuesForArray(updateArrayItems))
        console.log(updateArrayItems)
        Swal.fire({
            icon: 'error',
            title: 'Carrito actualizado',
            text: 'Producto Removido',
            timer: 600
        })

    }

    function handleNavigation() {
        navigate('/');
    }

        


    return (
        <div className={styles.carritoContainer}>

            <h2>Carrito</h2>
            
            {
                clonOrderItems.length !== 0 ? 
                <form onSubmit={e => enviarTodo(e, clonOrderItems, arrayJ, total)}>
                    {
                        clonOrderItems?.map((item, key) => {
                            return (
                                <div key={key} className={styles.allProductsContainer}>
                                    <img src={item.image} className={styles.carritoImg} />
                                    <div>
                                        {/* <img   className={styles.imgCarrito}>{item.image}</img> */}
                                        <p className={styles.productCar}>{item.productName}</p>
                                        <section className={styles.cartQuantityContainer}>
                                            <p className={styles.productQuantity}>cantidad: {item.quantity}</p>
                                            <div>
                                                <button  className={styles.quantityBtnsCart} onClick={e => setQuantity(key, e, item.quantity)}  ><AddShoppingCartIcon></AddShoppingCartIcon>  </button>
                                                <button className={styles.quantityBtnsCart} onClick={e => setMinusQuantity(key, e, item.quantity)} ><RemoveShoppingCartIcon ></RemoveShoppingCartIcon ></button>
                                                <button className={styles.quantityBtnsCart} onClick={(e) => remover(item.id, e)}><DeleteForeverIcon></DeleteForeverIcon></button>
                                            </div>
                                        </section>

                                    </div>
                                </div>
                            )
                        })
                    }
                    <button type='submit' className={styles.btnComprar}>Comprar</button> 
                </form>
                :
                <div className={styles.carritoVacio} >
                    <h4 className={styles.carritoVacioHeader}>Carrito vacío. </h4>
                    <button  className={styles.btnNavegarMenu} onClick={ handleNavigation}>Mirar Menu</button> 
                </div>
            }
            
            
        </div>
    )
}

export default Carritoj