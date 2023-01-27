import React from 'react'

function Carrusel() {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="1000">
                <img src={require("../resources/logofood_transparente.png")} className="d-block w-100 " alt="..."/>
                <p>imagen 1</p>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                <img src={require("../resources/logofood_transparente.png")} className="d-block w-100" alt="..."/>
                <p>imagen 2</p>
                </div>
                <div className="carousel-item">
                <img src={require("../resources/logofood_transparente.png")} className="d-block w-100" alt="..."/>
                <p>imagen 3</p>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carrusel