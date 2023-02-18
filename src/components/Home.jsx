
import Carrusel2 from "./Carrusel2";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../features/data/dataSlice";
import { motion } from "framer-motion";


function Home() {

    const [barFilter, setBarFilter] = useState("");
    const [textFilter, setTextFilter] = useState("");


    const slides = [
        { url: "../img/banner/3.jpg", title: "Hamburguesa" },
        { url: "../img/banner/4.jpg", title: "Papas Fritas" },
        { url: "../img/banner/6.jpg", title: "Alitas" },
        { url: "../img/banner/7.jpg", title: "Todo" },
    ];

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { entities, loading } = useSelector((state) => state.data);
    console.log(entities)

    useEffect(() => {

        if (entities.length < 1) {
            dispatch(getData());

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
            <Carrusel2 slides={slides} />
            <div className={styles.filterNavigationContainer}>
                <ul className={styles.filterNavigationBarContainer}>
                    <li>
                        <img src="./img/menu/todo.png" alt="todo el menu" />
                        <button
                            onClick={(e) => handleFilter("", e)}
                            className={styles.listButtonFilterBar}
                        >
                            TODOS
                        </button>
                    </li>
                    <li>
                        <img src="./img/menu/combos.png" alt="combos" />
                        <button
                            onClick={(e) => handleFilter("combos", e)}
                            className={styles.listButtonFilterBar}
                        >
                            COMBOS
                        </button>
                    </li>
                    <li>
                        <img src="./img/menu/hamburguesas.png" alt="hamburguesas" />
                        <button
                            onClick={(e) => handleFilter("hamburguesas", e)}
                            className={styles.listButtonFilterBar}
                        >
                            HAMBURGUESAS
                        </button>
                    </li>
                    <li>
                        <img src="./img/menu/alitas.png" alt="alitas" />
                        <button
                            onClick={(e) => handleFilter("alitas", e)}
                            className={styles.listButtonFilterBar}
                        >
                            ALITAS
                        </button>
                    </li>
                    <li>
                        <img src="./img/menu/papas.png" alt="papas" />
                        <button
                            onClick={(e) => handleFilter("papas", e)}
                            className={styles.listButtonFilterBar}
                        >
                            PAPAS{" "}
                        </button>
                    </li>
                    <li>
                        <img src="./img/menu/bebidas.png" alt="bebidas" />
                        <button
                            onClick={(e) => handleFilter("bebidas", e)}
                            className={styles.listButtonFilterBar}
                        >
                            BEBIDAS{" "}
                        </button>
                    </li>
                    <li>
                        <img src="./img/menu/postres.png" alt="postres" />
                        <button
                            onClick={(e) => handleFilter("postres", e)}
                            className={styles.listButtonFilterBar}
                        >
                            POSTRES{" "}
                        </button>
                    </li>
                </ul>
            </div>
            <input type="text" name="fruit" list="fruits" autoComplete="off" value={textFilter} className={styles.searchByTextBar} onChange={e => setTextFilter(e.target.value)} placeholder="Search Product" />
            <datalist id="fruits">
                <option>Hamburguesas</option>
                <option>Alitas</option>
                <option>Papas</option>
                <option>Bebidas</option>
                <option>Postres</option>
            </datalist>
            <motion.div
                animate={{ y: 2, x: 2 }}
                transition={{
                    duration: 2,
                }}
                className={styles.cardsContainer}
            >
                {!loading ? (
                    entities
                        .filter((val) => {
                            if (barFilter === " " || textFilter === " ") {
                                return val;
                            } else if (
                                val.category.name.toLowerCase().includes(barFilter.toLowerCase())
                                && val.productName.toLowerCase().includes(textFilter.toLowerCase())) {
                                return val;
                            }
                        })
                        .map((item, key) => {

                            return (
                                <motion.div
                                    transition={{
                                        opacity: { ease: "linear" },
                                        layout: { duration: 1 },
                                    }}
                                    className={styles.mapContainer}
                                    key={key}
                                >
                                    <div className={styles.mapImgContainer}>
                                        <img
                                            src={item.image}
                                            // width="80%"
                                            // height="170em"
                                            // margin="5px"
                                            className={styles.mapImg}
                                            alt="ref-home"
                                        />
                                        <button
                                            className={styles.btnDetailsHome}
                                            onClick={(e) => handleNavigation(e, item.id)}
                                        >
                                            Details
                                        </button>
                                    </div>
                                    <div className={styles.mapInfoContainer}>
                                        <h2 className={styles.homeTitle}>{item.productName.toUpperCase()}</h2>
                                        <p>{item.price}$</p>
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
