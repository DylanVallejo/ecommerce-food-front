import axios from 'axios';
import  { useEffect ,useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import '../styles/Detalle.css'
import Loader from "../components/Loader"

function Detalle() {
  
  const{id} = useParams();
  const [detail, setDetail] = useState(null)
  
  const navigate=useNavigate();
  
  const url = `https://rickandmortyapi.com/api/character/${id}`
  
  useEffect(() => {
    axios.get(url)
    .then( res =>{
      console.log(res.data)
      setDetail(res.data)
    })

  }, [url])
  
  
  const handleNavigate = (e) =>{
    e.preventDefault() ;
    navigate("/")
  }
  
  
  
  return (
    <>
      {
        detail !== null ? 
        <div className='detailContainer'>
          <h2 className='detaileTitle'>
            {detail?.name}
          </h2>
          <div className='detailInfoContainer'>
              <div className='detailPriceContainer'>
                <p>$8.99</p>
                <p>Disponibilidad: En Stock</p>
                <p>DESCRIPCION</p>
              </div>
              <ol className='listDetailContainer'>
                <li> Una carne de res a la parrilla</li>
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
              <img src={detail?.image} className='detailImg'  alt='referencia'/>
            </div>
            <div>
              <button>Agregar al pedido</button>
              <button onClick={handleNavigate}>Regresar</button>
            </div>
          </div>
        </div>
        : <Loader/>
      }
      
    </>
  )
}

export default Detalle