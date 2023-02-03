import axios from 'axios';
import  { useEffect ,useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import '../styles/Detalle.css'
import Loader from "../components/Loader"

function Detalle() {
  
  const [detail2, setDetail2] = useState(null);
  
  const{id} = useParams();
  const navigate=useNavigate();
  
  const urlBack = `http://localhost:8082/api/product/${id}`
  
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
                {/* <li>queso americano</li>
                <li>tomates</li>
                <li>lechuga</li>
                <li>mayonesa</li>
                <li>pickles</li>
                <li>cebollas en rodajas.</li> */}
              </ol>
              <ol className='listDetailContainer'> 
                <h3 className='detalleTitlesFonts'>Categoria</h3>
                <li>{ detail2.category.name }</li>
              </ol>
          </div>
          <div className='detailImgContainer'>
            <div>
              <img src={detail2.image} className='detailPageImg'  alt='referencia'/>
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

export default Detalle;