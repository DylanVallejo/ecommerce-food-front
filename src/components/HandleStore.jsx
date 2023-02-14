import {  useState, useEffect} from 'react'

import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from '../styles/HandleStore.module.scss'
import Swal from 'sweetalert2'
import { getData } from "../features/data/dataSlice";


function HandleStore() {
    
    
    const [newStock, setNewStock] = useState(0)
    const [itsInOffers, setItsInOffers] = useState(false)
    const [cambio, setCambio] = useState(0)
    // useState
    
    const {entities} = useSelector(state=>state.data)
    // console.log(entities)
    
    
    const urlUpdate = ` http://localhost:8082/api/product/update/product/`
    // http://localhost:8082/api/product/update/product/13/stock/25
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        // dispatch(getOrderStatus())
        
        dispatch(getData());
        console.log("useeffect")
        // dispatch(createOrder())
    console.log(cambio)
        

    }, [cambio]);
    
    
    
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
    
    const handleStock = (stock,id,e) => {
        e.preventDefault();
        // console.log(stock)
        // console.log(id)
        // console.log(newStock)
        
        const finalUrl = `${urlUpdate}${id}/stock/`
        // console.log(finalUrl)
        let manejarRefresh = cambio
        
        Swal.fire({
        title: 'Agregar stock',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        showLoaderOnConfirm: true,
        preConfirm: (createStock) => {
            // console.log(typeof(createStock))
            console.log("entrando al post")
            console.log(`${finalUrl}${stock+ Number(createStock)}`)
            return axios.put(`${finalUrl}${stock+Number(createStock)}`)
            .then(response => {
                console.log("entro al post")
                console.log(response)
                console.log(cambio)
                setCambio(manejarRefresh+1)
                console.log(cambio)
                
                
                Toast.fire({
                icon: 'success',
                title: `${response.data}`
                })
            })
            .catch(error => {
                Swal.showValidationMessage(
                `Request failed: ${error}`
                )
            })
        },
        // allowOutsideClick: () => !Swal.isLoading()
        })
        
        // const newStock = entities.stock
        
        
        // axios.post(`${urlUpdate}/${id}`,{
        //     "stock": stock
        // })
    }    
    
    // const setOffer = (oferta) => {
    //     console.log(oferta)
    // }
    return (
        <TableContainer className={styles.storeContainer}  sx={{ minWidth: 650 , maxWidth:900}} >
            <Table 
            // sx={{ minWidth: 650 }}  
            className={styles.storeContainerTable}>
                <TableHead >
                    <TableRow>
                        <TableCell className={styles.storeHeaders}>PRODUCTO</TableCell>
                        <TableCell align="center" className={styles.storeHeaders}>STOCK</TableCell>
                        <TableCell align="center" className={styles.storeHeaders}>OFERTA</TableCell>
                        {/* <TableCell align="right">Carbs</TableCell>
                        <TableCell align="right"></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody >
                    {entities.map((item,key)=>{
                        return(
                            <TableRow className={styles.infoTable} key={key}>

                                <TableCell className={styles.infoProducts}  align="center">{item.productName}</TableCell>
                                <TableCell className={styles.infoProducts} align="center"><p>{item.stock}</p> <button onClick={e=>handleStock(item.stock,item.id,e)}>Agregar Stock</button></TableCell>
                                <TableCell className={styles.infoProducts} align="center">{item.itsInOffers? <p>SI</p>:<p>NO</p>}<button onClick={()=>{}}>Poner en oferta</button></TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>
            
            </Table>
        </TableContainer >
    )
}

export default HandleStore