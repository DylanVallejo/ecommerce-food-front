import React, { useState } from 'react'
import styles from "../styles/Carrusel2.module.scss";

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
    <div className={styles.divslider}>
        <div className={styles.sliderimage} style={sliderimage}>
            <p className={styles.leftArrowStyles} onClick={goToPrevious}> <i class="fa-solid fa-circle-chevron-left"> </i></p>
            <p className={styles.rightArrowStyles} onClick={goToNext}> <i class="fa-solid fa-circle-chevron-right"></i> </p>
        </div>
        <div className={styles.dotsContainer}>
            {slides.map((slide, slideIndex) => (
                <div className={styles.dotStyle} key= {slideIndex} onClick={() => goToSlide (slideIndex)}>
                        °</div>
            ) )}
        </div>

    </div>
  )
}

export default Carrusel2