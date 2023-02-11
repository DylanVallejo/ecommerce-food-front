import axios from 'axios';
import  { useEffect ,useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import '../styles/Detalle.css'
import Loader from "../components/Loader"
import { useDispatch } from "react-redux";
import {setItemsArray} from "../features/data/dataSlice";
import Swal from 'sweetalert2'

function Detalle() {
      
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

  const sendToOrderArray =  async () => {
    
    dispatch(setItemsArray(detail2));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto Añadido al carrito',
      showConfirmButton: false,
      timer: 1000
    })
      
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
  
  return (
    <>
      {
        detail2 !== null ? 
        <div className='detailContainer'>
          <h2 className='detaileTitle'>
            {detail2.productName}
          </h2>
          <div className='detailInfoContainer'>
              <div className='detailPriceContainer'>
                <p>${detail2.price}</p>
                <p>Disponibilidad: {detail2.stock} unidades en Stock </p>
                <h3 className='detalleTitlesFonts'>DESCRIPCION</h3>
              </div>
              <ol className='listDetailContainer'>
                <li>{detail2.description}</li>
              </ol>
              <ol className='listDetailContainer'> 
                <h3 className='detalleTitlesFonts'>Categoria</h3>
                <li>{ detail2.category.name }</li>
              </ol>
              
              <ol className='listDetailContainer'>
                {
                  commentsArray.length < 1  ? <h3 className='detalleTitlesFonts'>NO EXISTEN COMENTARIOS</h3> :  <h3 className='detalleTitlesFonts'>COMENTARIOS</h3>
                }
                
                {
                  commentsArray !== null ? commentsArray.map((item,key)=>{
                    return(
                      <div key={key} className="commentContainer">
                        <p>{item.text}</p>
                        <p>{item.createdBy}</p>
                      </div>
                    )
                  }):<p>no existen comentarios</p>
                }
              </ol>
              
          </div>
          <div className='detailImgContainer'>
            <div>
              <img src={detail2.image} className='detailPageImg slide-right'  alt='referencia'/>
              <button className='btnDetalleMejorar'>Mejorar Combo</button>
              
            </div>
            <div>
              <button className='btnDetalleAgregar' onClick={e=> createComments(e)}>COMENTARIOS</button>
              <button className='btnDetalleAgregar' onClick={sendToOrderArray}>Agregar al pedido</button>
              <button className='btnDetalleRegresar' onClick={handleNavigate}>Regresar</button>
            </div>
          </div>
        </div>
        : <Loader/>
      }
      
    </>
  )
}

export default Detalle;
