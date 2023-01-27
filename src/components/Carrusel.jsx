import React from 'react'
import '../styles/Carrusel.css'

function Carrusel() {
    return (
        <div class="wrapper">
  <div class="slider" id="slider">
    <ul class="slides">
      <li class="slide" id="slide1">
        <a href="#">
         
          <img src='../img/banner/1.jpg' alt="photo 1"/>
        </a>
      </li>
      <li class="slide" id="slide2">
        <a href="#">
         
          <img src='../img/banner/2.jpg' alt="photo 2"/>
        </a>
      </li>
      <li class="slide" id="slide3">
        <a href="#">
          
          <img src='../img/banner/3.jpg'  alt="photo 3"/>
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

export default Carrusel