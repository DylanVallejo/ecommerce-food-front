import {  useState, } from 'react'

import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from '../styles/HandleStore.module.scss'

function HandleStore() {
    
    
    
    
    const [stock, setStock] = useState(0)
    const [itsInOffers, setItsInOffers] = useState(false)
    
    const {entities} = useSelector(state=>state.data)
    
    const urlUpdate = `http://localhost:8080/api/product/update/`
    
    const handleStock = (stock) => {
        //traer stock actual mas stock antiguo crear un estado nuevo 
        const newStock = entities.stock + stock
        
        axios.post(urlUpdate,{
            "stock": stock
        })
    }    
    
    const setOffer = (oferta) => {
        
    }
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
                            <TableRow className={styles.infoTable}>
                                <TableCell className={styles.infoProducts}  align="center">{item.productName}</TableCell>
                                <TableCell className={styles.infoProducts} align="center"><p>{item.stock}</p> <button onClick={handleStock(item.stock)}>Agregar Stock</button></TableCell>
                                <TableCell className={styles.infoProducts} align="center">{item.itsInOffers? <p>SI</p>:<p>NO</p>}<button onClick={setOffer(item.itsInOffers)}>Poner en oferta</button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            
            </Table>
        </TableContainer >
    )
}

export default HandleStore