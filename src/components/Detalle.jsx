import axios from 'axios';
import  { useEffect ,useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import '../styles/Detalle.css'
import Loader from "../components/Loader"
import { useDispatch } from "react-redux";
import {setItemsArray} from "../features/data/dataSlice";
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'



function Detalle() {
  
    
  const [detail2, setDetail2] = useState(null);
  
  // const { order,orderItems } =  useSelector(  (state)=>  state.data)
  
  const dispatch = useDispatch();
  
  const{id} = useParams();
  const navigate=useNavigate();
  
  const urlBack = `http://localhost:8082/api/product/${id}`
  
  
  // el numero final debe ser correspondiente a la orden que queremos modificar es decir dinamico
  // const urlAddProduct = `http://localhost:8082/api/orderproduct/orderproduct/1`
  // const updateOrder = `http://localhost:8082/api/order/1`
  
  useEffect(() => {
    axios.get(urlBack)
    .then(res=>{
      console.log(res)
      setDetail2(res.data)
    })
  }, [urlBack])
  
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
          </div>
          <div className='detailImgContainer'>
            <div>
              <img src={detail2.image} className='detailPageImg slide-right'  alt='referencia'/>
              <button className='btnDetalleMejorar'>Mejorar Combo</button>
              
            </div>
            <div>
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



  // {
  //   "status": true,
  //   "productId": 11, 
  //   "price": 10,
  //   "quantity": 3
  // }
  
  // [
    
  //   {
  //     "status": true,
  //     "productId": 11, 
  //     "price": 10,
  //     "quantity": 3
  //   },
  //   {
  //     "status": true,
  //     "productId": 11, 
  //     "price": 10,
  //     "quantity": 3
  //   }
    
  // ]
  
