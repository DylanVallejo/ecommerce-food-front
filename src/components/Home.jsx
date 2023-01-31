import Carrusel from "./Carrusel"
import axios from 'axios';
import { useState,useEffect } from "react";
import '../styles/Home.css'
import {useNavigate} from 'react-router-dom';
import Loader from "./Loader";


function Home () {
    
    const [api, setApi] = useState(null)
    const navigate = useNavigate();
    
    // const url  = 'https://rickandmortyapi.com/api/character'
    const urlBack = 'http://localhost:8082/api/product'
    
    // useEffect(() => {
    //     axios.get(url)
    //     .then( res =>{
    //         console.log(res)
    //         console.log(url)
    //         setApi(res.data.results)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }, [url])
    useEffect(() => {
        axios.get(urlBack)
        .then( res =>{
            console.log(res)
            // console.log(url)
            setApi(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [urlBack])
    
    
    
    const handleNavigation = ( e, id ) =>{
        e.preventDefault();
        navigate('detalle/'+id)
    }
    
    // <img src={`${data}`} />
    return (
        <div>
            <Carrusel/>
            <div className="cardsContainer">
                {
                    api ? (api.map((item,key)=>{
                        return(
                            <div className="mapContainer" key={key}>
                                {/* <img src={item.image}/> 
                                <h2 className="homeTitle">{item.productName}</h2> */}
                                <div className="mapImgContainer">
                                    <h2 className="homeTitle">{item.productName}</h2>
                                    <img src={item.image} width='300px' margin='5px' className="mapImg"/>
                                    <button className="btnDetailsHome" onClick={( e ) => handleNavigation(e,item.id)}>Details</button>
                                </div>
                                <div className="mapInfoContainer">
                                    <p>{item.description}</p>
                                    <p>precio: {item.price} $</p>
                                    <p>categorias:{item.category.name}</p>
                                    {/* <p>{item.species}</p>
                                    <p>{item.gender}</p> */}
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