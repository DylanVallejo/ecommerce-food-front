import axios from 'axios';
import  { useEffect ,useState,useContext} from 'react'

import { useParams ,useNavigate} from 'react-router-dom'
import Loader from "../components/Loader"
import { useDispatch } from "react-redux";
import {setItemsArray} from "../features/data/dataSlice";
import Swal from 'sweetalert2'
import styles from "../styles/Detalle.module.scss";
// import withReactContent from 'sweetalert2-react-content'
import MyContext from '../context/MyContext';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';



function Detalle() {
  
  const context = useContext(MyContext);
  
  
  const gaEventTracker = useAnalyticsEventTracker('Detalles agregar');
      
  const [detail2, setDetail2] = useState(null);
  const [commentsArray, setCommentsArrays] = useState([]);
  const [cambio, setCambio] = useState(0)
    
  const dispatch = useDispatch();
  
  const{id} = useParams();
  const navigate=useNavigate();
  
  const urlBack = `http://localhost:8082/api/product/${id}`
  
  
  const comments = `http://localhost:8082/api/comment/product/${id}`
  
  
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
  
  
  useEffect(() => {
    axios.get(urlBack)
    .then(res=>{
      console.log(res)
      setDetail2(res.data)
    })
    axios.get(comments)
    .then(res=>{
      console.log(res)
      setCommentsArrays(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [urlBack,cambio,comments])
  
  const handleNavigate = (e) =>{
    e.preventDefault() ;
    navigate("/")
  }
  
  console.log(context)

  const sendToOrderArray =  async () => {

    if(context.userContext.role === "USER" || context.userContext.role === "ADMIN"  ){
      
      if( detail2.itsInOffers && detail2.discount){

        let updated = structuredClone(detail2)
        let price = detail2.price;
        let setDiscount = detail2.discount / 100;
        price = price - price * setDiscount;
        updated.price = price 
        dispatch(setItemsArray(updated));
        Toast.fire({
          icon: 'success',
          title: ` ${updated.productName } Añadida al carrito`,
          position: 'bottom-right',
          timer: '2000'
        })
        navigate("/")
      }else{
        dispatch(setItemsArray(detail2));
        Toast.fire({
          icon: 'success',
          title: ` ${detail2.productName } Añadida al carrito`,
          position: 'bottom-right',
          timer: '2000'
        })
        navigate("/")
      }
          
    }else{
      Toast.fire({
        icon: 'error',
        title: ` Por favor registrate para poder agregar al carrito`,
        timer:9000
      })
      navigate("/login")
    }
    
    gaEventTracker('agreagar producto')
    

    // navigate('/')
      
  }
  
  
  const createComments = ( e) => { 

    e.preventDefault();
    console.log(comments)
    let url = comments;

    Swal.fire({
      title: 'Agregar un comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (newComment) => {
        console.log("newcomee")
        console.log(url)
        return axios.post(url, {
          "text":newComment
        })
          .then(response => {
            console.log(response)
            setCambio(cambio+1)
            Toast.fire({
              icon: 'success',
              title: 'Comentario creado'
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

  }
  
  // const calcularDES = () => {
  //   if( detail2.itsInOffers && detail2.discount){
    
  //     let updated = structuredClone(detail2)
  //     let price = detail2.price;
  //     let setDiscount = detail2.discount / 100;
  //     price = price - price * setDiscount;
  //     updated.price = price 
  //     console.log(updated)
  //   } else {
  //     console.log('no esta en decuento')
  //   }
  // }
  
  return (
    <>
      {
        detail2 !== null ? 
        <div className={styles.detailContainer}>
          <h2 className={styles.detaileTitle}>
            {detail2.productName}
          </h2>
          <div className={styles.detailInfoContainer}>
              <div className={styles.detailPriceContainer}>
                <p>${detail2.price}</p>
                <p>Disponibilidad: {detail2.stock} unidades en Stock </p>
                <h3 className={styles.detalleTitlesFonts}>DESCRIPCION</h3>
              </div>
              <ol className={styles.listDetailContainer}>
                <li>{detail2.description}</li>
              </ol>
              <ol className={styles.listDetailContainer}> 
                <h3 className={styles.detalleTitlesFonts}>Categoria</h3>
                <li>{ detail2.category.name }</li>
              </ol>
              
              <ol className={styles.listDetailContainerComment}>
                {
                  commentsArray.length < 1  ? <h3 className={styles.detalleTitlesFonts}>NO EXISTEN COMENTARIOS</h3> :  <h3 className={styles.detalleTitlesFonts}>COMENTARIOS</h3>
                }
                
                {
                  commentsArray !== null ? commentsArray.map((item,key)=>{
                    return(
                      <div key={key} className={styles.commentContainer}>
                        <p>{item.text}</p>
                        <p>{item.createdBy}</p>
                      </div>
                    )
                  }):<p>no existen comentarios</p>
                }
              </ol>
              
          </div>
          <div className={styles.detailImgContainer}>
            <div>
              <img src={detail2.image} className={styles.detailPageImg} slide-right  alt='referencia'/>
              <button className={styles.btnDetalleMejorar}>Mejorar Combo</button>
            </div>
            <div>
              {/* <button onClick={calcularDES}>Calcular descuento</button> */}
              <button className={styles.btnDetalleAgregar} onClick={e=> createComments(e)}>COMENTARIOS</button>
              <button className={styles.btnDetalleAgregar} onClick={sendToOrderArray}>Agregar al pedido</button>
              <button className={styles.btnDetalleRegresar} onClick={handleNavigate}>Regresar</button>

            </div>
          </div>
        </div>
        : <Loader/>
      }
      
    </>
  )
}

export default Detalle;
