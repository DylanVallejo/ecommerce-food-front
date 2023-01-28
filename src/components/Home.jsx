import Carrusel from "./Carrusel"
import axios from 'axios';
import { useState,useEffect } from "react";
import '../styles/Home.css'

function Home () {
    
    const [api, setApi] = useState()
    
    const url  = 'https://rickandmortyapi.com/api/character?10'
    
    
    useEffect(() => {
        axios.get(url)
        .then( res =>{
            console.log(res)
            console.log(url)
            setApi(res.data.results)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [url])
    

    

    return (
        <div>
            <Carrusel/>
            <div className="cardsContainer">
                {
                    api?.map((item)=>{
                        return(
                            <div className="mapContainer">
                                <div className="mapImgContainer">
                                    <h2>{item.name}</h2>
                                    <img  src={item.image} />
                                </div>
                                <div className="mapInfoContainer">
                                    <p>{item.episode[0]}</p>
                                    <p>{item.origin.name}</p>
                                    <p>{item.species}</p>
                                    <p>{item.gender}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
            
            
        </div>
    )
}

export default Home