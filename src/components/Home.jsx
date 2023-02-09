// import Carrusel from "./Carrusel"
import Carrusel2 from "./Carrusel2";
import { useEffect, useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { getData , getOrderStatus} from "../features/data/dataSlice";
import { motion } from "framer-motion";
// import { LayoutGroup } from "framer-motion";

function Home() {
    
    const [barFilter, setBarFilter] = useState("");
    const [textFilter, setTextFilter] = useState("");
    // const [searchTextBar, setSearchTextBar ] = useState("")

    const slides = [
        { url: "../img/banner/1.jpg", title: "Hamburguesa" },
        { url: "../img/banner/2.jpg", title: "papas" },
        { url: "../img/banner/3.jpg", title: "Helados" },
    ];

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { entities, loading, order } = useSelector((state) => state.data);
    console.log(entities)
    console.log(order)
    
// actualizar los datos de la order con un get 

    useEffect(() => {
        // dispatch(getOrderStatus())
        if (entities.length < 1) {
        dispatch(getData());
        // dispatch(createOrder())
        }
    }, [entities, dispatch]);

    const handleNavigation = (e, id) => {
        e.preventDefault();
        navigate("detalle/" + id);
    };

    const handleFilter = (filterValue, e) => {
        e.preventDefault();
        setBarFilter(filterValue);
    };

    
    

    return (
        <div>
        {/* <Carrusel/> */}
            <Carrusel2 slides={slides} />
            <div className="filterNavigationContainer">
                <ul className="filterNavigationBarContainer">
                <li>
                    <img src="./img/menu/todo.png" alt="todo el menu" />
                    <button
                    onClick={(e) => handleFilter("", e)}
                    className="listButtonFilterBar"
                    >
                    TODOS
                    </button>
                </li>
                <li>
                    <img src="./img/menu/combos.png" alt="combos"/>
                    <button
                    onClick={(e) => handleFilter("combos", e)}
                    className="listButtonFilterBar"
                    >
                    COMBOS
                    </button>
                </li>
                <li>
                    <img src="./img/menu/hamburguesas.png" alt="hamburguesas"/>
                    <button
                    onClick={(e) => handleFilter("hamburguesas", e)}
                    className="listButtonFilterBar"
                    >
                    HAMBURGUESAS
                    </button>
                </li>
                <li>
                    <img src="./img/menu/alitas.png" alt="alitas" />
                    <button
                    onClick={(e) => handleFilter("alitas", e)}
                    className="listButtonFilterBar"
                    >
                    ALITAS
                    </button>
                </li>
                <li>
                    <img src="./img/menu/papas.png" alt="papas"/>
                    <button
                    onClick={(e) => handleFilter("papas", e)}
                    className="listButtonFilterBar"
                    >
                    PAPAS{" "}
                    </button>
                </li>
                <li>
                    <img src="./img/menu/bebidas.png" alt="bebidas"/>
                    <button
                    onClick={(e) => handleFilter("bebidas", e)}
                    className="listButtonFilterBar"
                    >
                    BEBIDAS{" "}
                    </button>
                </li>
                <li>
                    <img src="./img/menu/postres.png" alt="postres"/>
                    <button
                    onClick={(e) => handleFilter("postres", e)}
                    className="listButtonFilterBar"
                    >
                    POSTRES{" "}
                    </button>
                </li>
                </ul>
            </div>
            {/* <input type="text" value={searchTextBar} className = "searchByTextBar" onChange={ e => { setSearchTextBar(e.target.value) } } placeholder="Search Product" /> */}
            <input type="text" name="fruit" list="fruits" autoComplete="off" value={textFilter} className = "searchByTextBar"  onChange={e=>setTextFilter(e.target.value)} placeholder="Search Product" />
            <datalist id="fruits">
                <option>Hamburguesas</option>
                <option>Alitas</option>
                <option>Papas</option>
                <option>Bebidas</option>
                <option>Postres</option>
            </datalist>
            {/* animate={{ y: 1 }} transition={{ ease: "easeOut", duration: 1 }}    
                    animate={{ y: 3 }} transition={{ ease: "easeOut", duration: 2 }}
                    */}
            <motion.div
                animate={{ y: 2, x: 2 }}
                transition={{
                duration: 2,
                }}
                className="cardsContainer"
            >
            {!loading ? (
                entities
                .filter((val) => {
                    if (barFilter === " " || textFilter === " " ) {
                        return val;
                    } else if (
                        val.category.name.toLowerCase().includes(barFilter.toLowerCase())
                        && val.productName.toLowerCase().includes(textFilter.toLowerCase())){
                        return val;
                    }
                })
                .map((item, key) => {
                    
                    // si no encuentra debe retornar esto
                    // else if( val.indexOf(barFilter, textFilter) === -1){
                    //     return(
                    //         <div>
                    //             No existen Elementos
                    //         </div>
                    //     )
                    // }
                    return (
                        
                        <motion.div
                        transition={{
                            opacity: { ease: "linear" },
                            layout: { duration: 1 },
                        }}
                        className="mapContainer"
                        key={key}
                        >
                        <div className="mapImgContainer">
                            <img
                            src={item.image}
                            width="80%"
                            height="170em"
                            margin="5px"
                            className="mapImg"
                            alt="ref-home"
                            />
                            <button
                            className="btnDetailsHome"
                            onClick={(e) => handleNavigation(e, item.id)}
                            >
                            Details
                            </button>
                        </div>
                        <div className="mapInfoContainer">
                            <h2 className="homeTitle">{item.productName.toUpperCase() }</h2>
                            {/* <p>{item.description.slice(0,30)} ...</p> */}
                            <p>{item.price}$</p>
                            {/* <p>categorias:{item.category.name}</p> */}
                        </div>
                        </motion.div>
                    );
                })
            ) : (
                <Loader />
            )}
            </motion.div>
        </div>
    );
}

export default Home;
