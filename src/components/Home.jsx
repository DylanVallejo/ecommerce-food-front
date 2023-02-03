// import Carrusel from "./Carrusel"
import Carrusel2 from "./Carrusel2"
import { useEffect } from "react";
import '../styles/Home.css'
import {useNavigate} from 'react-router-dom';
import Loader from "./Loader";
import { useSelector, useDispatch } from 'react-redux'
import { holaReducer , getData } from '../features/data/dataSlice'

function Home () {
    
    const slides = [
        {url:'../img/banner/1.jpg', title : 'Hamburguesa'},    
        {url:'../img/banner/2.jpg', title : 'papas'},
        {url:'../img/banner/3.jpg', title : 'Helados'},      
    ];
    
    const navigate = useNavigate();
    
    
    const dispatch = useDispatch();
    const { entities, loading } = useSelector((state) => state.data);
    
    
    dispatch(holaReducer());
    
    useEffect(() => {
        if (entities.length < 1) {
            dispatch(getData());
        }
    }, [entities,dispatch]);
    
    
    const handleNavigation = ( e, id ) =>{
        e.preventDefault();
        navigate('detalle/'+id)
    }
    
    return (
        <div>
            {/* <Carrusel/> */}
            <Carrusel2 slides={slides}/>

            <div className="cardsContainer">
                {
                    !loading ? entities.map((item, key)=>{
                        return(
                            <div className="mapContainer" key={key}>
                                <div className="mapImgContainer">
                                    <img src={item.image} width='80%' height='170em' margin='5px' className="mapImg" alt="ref-home"/>
                                    <button className="btnDetailsHome" onClick={( e ) => handleNavigation(e,item.id)}>Details</button>
                                </div>
                                <div className="mapInfoContainer">
                                    <h2 className="homeTitle">{item.productName}</h2>
                                    {/* <p>{item.description.slice(0,30)} ...</p> */}
                                    <p>{item.price}$</p>
                                    {/* <p>categorias:{item.category.name}</p> */}
                                </div>
                            </div>
                        )
                    })
                    : (<Loader/>)
                }
            </div>
            
            
        </div>
    )
}

export default Home