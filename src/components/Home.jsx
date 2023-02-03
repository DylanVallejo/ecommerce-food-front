import Carrusel from "./Carrusel"
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
    ]
    // const [api, setApi] = useState(null)
    const navigate = useNavigate();
    
    
    const dispatch = useDispatch();
    const { entities, loading } = useSelector((state) => state.data);
    
    
    dispatch(holaReducer());
    
    //fetch desde el componente home
    // const urlBack = 'http://localhost:8082/api/product'
    // useEffect(() => {
    //     axios.get(urlBack)
    //     .then( res =>{
    //         console.log(res)
    //         // console.log(url)
    //         setApi(res.data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }, [urlBack])
    
    useEffect(() => {
        if (entities.length < 1) {
            dispatch(getData());
        }
    }, [entities,dispatch]);
    
    
    const handleNavigation = ( e, id ) =>{
        e.preventDefault();
        navigate('detalle/'+id)
    }
    
    // <img src={`${data}`} />
    return (
        <div>
            <Carrusel/>
            <Carrusel2 slides={slides}/>
            {/* <div className="cardsContainer">
                {
                    api ? (api.map((item,key)=>{
                        return(
                            <div className="mapContainer" key={key}>
                                <div className="mapImgContainer">
                                    <h2 className="homeTitle">{item.productName}</h2>
                                    <img src={item.image} width='80%' margin='5px' className="mapImg"/>
                                    <button className="btnDetailsHome" onClick={( e ) => handleNavigation(e,item.id)}>Details</button>
                                </div>
                                <div className="mapInfoContainer">
                                    <p>{item.description}</p>
                                    <p>precio: {item.price} $</p>
                                    <p>categorias:{item.category.name}</p>
                                </div>
                            </div>
                        )
                    }))
                    : (<Loader/>)
                }
            </div> */}
            
            <div className="cardsContainer">
                {
                    !loading ? entities.map((item, key)=>{
                        return(
                            <div className="mapContainer" key={key}>
                                <div className="mapImgContainer">
                                    <h2 className="homeTitle">{item.productName}</h2>
                                    <img src={item.image} width='80%' margin='5px' className="mapImg" alt="ref-home"/>
                                    <button className="btnDetailsHome" onClick={( e ) => handleNavigation(e,item.id)}>Details</button>
                                </div>
                                <div className="mapInfoContainer">
                                    <p>{item.description}</p>
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