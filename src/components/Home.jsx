import Carrusel from "./Carrusel"
import axios from 'axios';
import { useState,useEffect } from "react";
import '../styles/Home.css'
import {useNavigate} from 'react-router-dom';
import Loader from "./Loader";


function Home () {
    
    const [api, setApi] = useState(null)
    const navigate = useNavigate();
    
    const url  = 'https://rickandmortyapi.com/api/character'
    
    
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
    
    
    const handleNavigation = ( e, id ) =>{
        e.preventDefault();
        navigate('detalle/'+id)
    }
    return (
        <div>
            <Carrusel/>
            <div className="cardsContainer">
                {
                    api ? (api.map((item)=>{
                        return(
                            <div className="mapContainer">
                                <div className="mapImgContainer" style={{ 
                                    backgroundImage: `url(${item.image})` 
                                }}>
                                    <h2 className="homeTitle">{item.name}</h2>
                                    {/* <img  src={item.image} alt='....' className="homeImg"/> */}
                                    <button className="btnDetailsHome" onClick={( e ) => handleNavigation(e,item.id)}>Details</button>
                                </div>
                                <div className="mapInfoContainer">
                                    <p>{item.episode[0]}</p>
                                    <p>{item.origin.name}</p>
                                    <p>{item.species}</p>
                                    <p>{item.gender}</p>
                                </div>
                            </div>
                        )
                    }))
                    : (<Loader/>)
                }
            </div>
        </div>
    )
}

export default Home