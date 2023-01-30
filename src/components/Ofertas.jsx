import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {useNavigate} from 'react-router-dom'
import '../styles/Ofertas.css'

function Ofertas() {
  
  const [apiOfertas, setApiOfertas] = useState(null)
  const navigate = useNavigate();
  
  const url  = 'https://rickandmortyapi.com/api/character'
  
  
  useEffect(() => {
      axios.get(url)
      .then( res =>{
          console.log(res)
          console.log(url)
          setApiOfertas(res.data.results.slice(0,3))
      })
      .catch(err=>{
          console.log(err)
      })
  }, [url])
  const handleNavigation = (e) =>{
    e.preventDefault();
    navigate("/")
  }
  return (
    <div className='globalOfersContainer'>
      <div className="ofertasContainer">
        {
          apiOfertas?.map((item,key)=>{
            return(
              <div className='imgOfertasContainer'>
                <div>
                  <button className='etiquetaOfertas' >20%</button>
                  <img src={item.image} alt="...."></img>
                  <h3 className='titleOfertas'>{item.name}</h3>
                </div>
              </div>
            )
          })
        }
      </div>
        <button onClick={e=>handleNavigation(e)} className="btnOfertasRegresar" >Regresar</button>
      
    </div>
  )
}

export default Ofertas