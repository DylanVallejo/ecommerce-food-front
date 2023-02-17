import {useContext} from 'react'
import MyContext from '../context/MyContext';

import { useSelector,useDispatch } from 'react-redux'
import { setItemsArray } from '../features/data/dataSlice'

import Swal from 'sweetalert2'

import {useNavigate} from 'react-router-dom'
import styles from '../styles/Ofertas.module.scss'

function Ofertas() {
  
  const context = useContext(MyContext);
  const navigate = useNavigate();
  

  const { entities, loading } = useSelector((state) => state.data);
  
  
  const itemsInOffers = entities.filter(item => item.itsInOffers === true);
  console.log(itemsInOffers)
  
  
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
  
  const handleNavigationHome = (e) =>{
    e.preventDefault();
    navigate("/")
  }
  
  const handleNavigation = (e, id) => {
    e.preventDefault();
    navigate("/detalle/" + id);
  };
  
  return (
    <div className={styles.globalOfersContainer}>
      <div className={styles.ofertasContainer}>
        {
          !loading  && itemsInOffers.map((item,key)=>{
            return(
              <div className={styles.imgOfertasContainer} key={key}>

                <button className={styles.etiquetaOfertas} >{item.discount}%</button>
                <img src={item.image} alt="...." className={styles.imgPageOfertas}></img>
                <h3 className={styles.titleOfertas}>{item.productName}</h3>
                {/* <button className={styles.btnDetalleAgregar} onClick={sendToOrderArray}>Agregar al pedido</button> */}
                <button
                  className={styles.btnDetailsOffer}
                  onClick={(e) => handleNavigation(e, item.id)}
                >
                  Details
                </button> 
              </div>
            )
          })
        }
      </div>

      <button onClick={e=>handleNavigationHome(e)} className={styles.btnOfertasRegresar} >Regresar</button>
    </div>
  )
}

export default Ofertas