import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styles from '../styles/Ofertas.module.scss'

function Ofertas() {
  
  const navigate = useNavigate();

  const { entities, loading } = useSelector((state) => state.data);
  
  
  const itemsInOffers = entities.filter(item => item.itsInOffers === true);
  
  const handleNavigation = (e) =>{
    e.preventDefault();
    navigate("/")
  }
  
  return (
    <div className={styles.globalOfersContainer}>
      <div className={styles.ofertasContainer}>
        {/* {
          
          !loading && entities.slice(0,3).map((item,key)=>{
            return(
              <div className='imgOfertasContainer' key={key}>
                <button className='etiquetaOfertas' >20%</button>
                <img src={item.image} alt="...." className='imgPageOfertas'></img>
                <h3 className='titleOfertas'>{item.productName}</h3>
              </div>
            )
          })
        } */}
        
        {
          !loading  && itemsInOffers.map((item,key)=>{
            return(
              <div className={styles.imgOfertasContainer} key={key}>
                <button className={styles.etiquetaOfertas} >20%</button>
                <img src={item.image} alt="...." className={styles.imgPageOfertas}></img>
                <h3 className='titleOfertas'>{item.productName}</h3>
              </div>
            )
          })
        }
      </div>
        <button onClick={e=>handleNavigation(e)} className={styles.btnOfertasRegresar} >Regresar</button>
    </div>
  )
}

export default Ofertas