import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from '../styles/HandleStore.module.scss'
import Swal from 'sweetalert2'
import { getData } from "../features/data/dataSlice";
import TablePagination from '@mui/material/TablePagination';
import { styled, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { orange, amber } from '@mui/material/colors';


function HandleStore() {


    // const [newStock, setNewStock] = useState(0)
    // const [itsInOffers, setItsInOffers] = useState(false)

    const [cambio, setCambio] = useState(0)
    const [spreadEntities, setspreadEntities] = useState(null)
    // useState

    const { entities } = useSelector(state => state.data)
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

    const handleStock = (stock, id, e) => {
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
                console.log(`${finalUrl}${stock + Number(createStock)}`)
                return axios.put(`${finalUrl}${stock + Number(createStock)}`)
                    .then(response => {
                        console.log("entro al post")
                        console.log(response)
                        console.log(cambio)
                        setCambio(manejarRefresh + 1)
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

    //paginador de tabla//
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //theme
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: orange[700],
            color: theme.palette.common.white,
            fontSize: 15,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            border: 0,

        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(2n)': {
            backgroundColor: amber[50],
           
        },
        '&:nth-of-type(2n+1)': {
            backgroundColor: amber[100],
        },
    }));

    return (
        <TableContainer className={styles.storeContainer} sx={{ minWidth: 250, maxWidth: 900 }} component={Paper} >
            <Table stickyHeader aria-label="customized table"
                className={styles.storeContainerTable}>
                <TableHead >
                    <TableRow>
                        <StyledTableCell align="center" className={styles.storeHeaders}>PRODUCTO</StyledTableCell>
                        <StyledTableCell align="center" className={styles.storeHeaders}>STOCK</StyledTableCell>
                        <StyledTableCell align="center" className={styles.storeHeaders}>OFERTA</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {entities.slice
                        (page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, key) => {
                            return (
                                <StyledTableRow className={styles.infoTable} key={key}>

                                    <StyledTableCell className={styles.infoProducts} size='small' align="center" >{item.productName}</StyledTableCell>
                                    <StyledTableCell className={styles.infoProducts} size='small' align='center'>
                                        <StyledTableCell className={styles.infoProducts} size='small' align='center'>  <p>{item.stock}</p> </StyledTableCell>
                                        <StyledTableCell className={styles.infoProducts} size='small' align='center'> <button onClick={e => handleStock(item.stock, item.id, e)}>Agregar Stock</button> </StyledTableCell>
                                    </StyledTableCell>
                                    <StyledTableCell className={styles.infoProducts} size='small' align="center">
                                        <StyledTableCell className={styles.infoProducts} size='small' align="center">{item.itsInOffers ? <p>SI</p> : <p>NO</p>}</StyledTableCell>
                                        <StyledTableCell className={styles.infoProducts} size='small' align="center"><button onClick={() => { }}>Poner en oferta</button> </StyledTableCell>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                </TableBody>

            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={entities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer >
    )
}

export default HandleStore