import axios from 'axios';
import  { useEffect ,useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import '../styles/Detalle.css'
import Loader from "../components/Loader"

function Detalle() {
  
  const{id} = useParams();
  // const [detail, setDetail] = useState(null)
  const [detail2, setDetail2] = useState(null)
  
  const navigate=useNavigate();
  
  // const url = `https://rickandmortyapi.com/api/character/${id}`
  
  const urlBack = `http://localhost:8082/api/product/${id}`
  
  useEffect(() => {
    // axios.get(url)
    // .then( res =>{
    //   console.log(res.data)
    //   setDetail(res.data)
    // })
    // .catch(error=>{console.log(error)})

    
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
  
  
  
  return (
    <>
    
      {/* {
        detail2 !== null ?
        <div>
          <h2>{detail2.productName}</h2>
          <h3>{detail2.price}</h3>
          <img src={detail2.image} width='500px' margin='5px' className="mapImg"/>
            <p>{detail2.description}</p>
        </div>
        : <Loader/>
      }  */}
      {
        detail2 !== null ? 
        <div className='detailContainer'>
          <h2 className='detaileTitle'>
            {detail2.productName}
          </h2>
          <div className='detailInfoContainer'>
              <div className='detailPriceContainer'>
                <p>${detail2.price}</p>
                <p>Disponibilidad: En Stock</p>
                <p>DESCRIPCION</p>
              </div>
              <ol className='listDetailContainer'>
                <li>{detail2.description}</li>
                <li>queso americano</li>
                <li>tomates</li>
                <li>lechuga</li>
                <li>mayonesa</li>
                <li>pickles</li>
                <li>cebollas en rodajas.</li>
              </ol>
          </div>
          <div className='detailImgContainer'>
            <div>
              <img src={detail2.image} className='detailImg'  alt='referencia'/>
              <button className='btnDetalleMejorar'>Mejorar Combo</button>
              
            </div>
            <div>
              <button className='btnDetalleAgregar'>Agregar al pedido</button>
              <button className='btnDetalleRegresar' onClick={handleNavigate}>Regresar</button>
            </div>
          </div>
        </div>
        : <Loader/>
      }
      
    </>
  )
}

export default Detalle