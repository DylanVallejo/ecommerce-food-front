import React, { useState } from 'react'
import '../styles/Carrusel2.css'

function Carrusel2({slides}) {
    const [currentIndex, setCurrentIndex]= useState(0);

    const sliderimage = {
       backgroundImage: `url(${slides[currentIndex].url})`,
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1 : currentIndex -1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex +1
        setCurrentIndex(newIndex);
    };

    const goToSlide = slideIndex => {
        setCurrentIndex(slideIndex) 
    }

  return (
    <div className='divslider'>
        <div className='sliderimage' style={sliderimage}>
            <p className='leftArrowStyles' onClick={goToPrevious}> « </p>
            <p className='rightArrowStyles' onClick={goToNext}> » </p>
        </div>
        <div className='dotsContainer'>
            {slides.map((slide, slideIndex) => (
                <div className='dotStyle' key= {slideIndex} onClick={() => goToSlide (slideIndex)}>
                        °</div>
            ) )}
        </div>

    </div>
  )
}

export default Carrusel2