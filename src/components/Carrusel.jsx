import React from 'react'
import '../styles/Carrusel.css'

function Carrusel() {
    return (
        <div className="wrapper">
  <div className="slider" id="slider">
    <ul className="slides">
      <li className="slide" id="slide1">
        <a>  {/*  agreagar los href a las etiquetas a   href="#"*/}
          <img src='../img/banner/1.jpg' alt="ofertas 1"/>
        </a>
      </li>
      <li className="slide" id="slide2">
        <a >
          <img src='../img/banner/2.jpg' alt="ofertas 2"/>
        </a>
      </li>
      <li className="slide" id="slide3">
        <a>
          
          <img src='../img/banner/3.jpg'  alt="ofertas 3"/>
        </a>
      </li>
    </ul>
  {/*   <ul class="slider-controler">
      <li><a href="#slide1">&bullet;</a></li>
      <li><a href="#slide2">&bullet;</a></li>
      <li><a href="#slide3">&bullet;</a></li>
    </ul> */}
  </div>
</div>
    )
}
// eslint-disable-next-line
export default Carrusel