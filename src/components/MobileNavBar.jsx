
import { NavLink } from "react-router-dom";
// import '../styles/NavBar.css'
// import PopUp from "./PopUp";
import MyContext from "../context/MyContext";
import { useContext } from "react";
// import Container from '@mui/material/Container';
// import styles from "../styles/Login.module.scss";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';
import Email from '@mui/icons-material/Email';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import styles from "../styles/MobileNavBar.module.scss";

function MobileNavBar() {
    
    const context = useContext(MyContext)
    
return (
    <>
    <nav className={styles.responsiveNav } >
        {/* <ul className={styles.logoNavbarContainer}>
            <li className={styles.navlinks}><img src={require('../resources/logofood_transparente.png')} alt="logo comida  " className={styles.logoNavbar}/></li>
        </ul> */}
                
        <ul className={styles.responsiveContainer}>
            <li className={styles.responsiveNavlinks}>
                <NavLink className={styles.mobileA} to="/" > 
                    <button className={styles.responsiveButtonLinks}>
                        <section>
                            <HomeIcon></HomeIcon>
                            <h6 className={styles.responsiveHeaders}>Menu</h6>
                        </section>
                    </button>
                </NavLink>
            </li>
            <li className={styles.responsiveNavlinks}>
            <NavLink className={styles.mobileA} to="/ofertas">
                <button className={styles.responsiveButtonLinks}>
                    <section >
                        <ConfirmationNumberIcon></ConfirmationNumberIcon>
                        <h6 className={styles.responsiveHeaders}>ofertas</h6> 
                    </section> 
                </button>
            </NavLink>
            </li>
            <li className={styles.responsiveNavlinks}>
            <NavLink to="/about" >
                <button className={styles.responsiveButtonLinks}> 
                    <section >
                        <GroupIcon></GroupIcon> 
                        <h6 className={styles.responsiveHeaders}>About us</h6> 
                    </section>
                </button>
            </NavLink>
            </li>
            <li className={styles.responsiveNavlinks}>
                <NavLink to="/contact" >
                    <button className={styles.responsiveButtonLinks}>
                        <section >
                            <Email></Email> 
                            <h6 className={styles.responsiveHeaders}>Contact Us</h6> 
                        </section>
                    </button>
                </NavLink>
            </li>
            {/* <li className="navlinks"><NavLink to="/cartj" ><button className="buttonLinks">cartj </button></NavLink></li> */}
            
            { context.userContext.role === "ADMIN" &&
            <li className={styles.responsiveNavlinks}>
                <NavLink className={styles.mobileA} to="/agregar" >
                    <button className={styles.responsiveButtonLinks}>
                        <section>
                            <AddBusinessIcon></AddBusinessIcon>
                            <h6 className={styles.responsiveHeaders}>Add Product</h6>
                        </section>
                    </button>
                </NavLink>
            </li>
            }
            {
            context.userContext.role === "ADMIN" &&
            <li className={styles.responsiveNavlinks}>
                <NavLink className={styles.mobileA} to="/stats" >
                    <button className={styles.responsiveButtonLinks}>  
                        <section>  
                            <QueryStatsIcon></QueryStatsIcon>  
                            <h6 className={styles.responsiveHeaders}>Stats</h6>
                        </section>
                    </button>
                </NavLink>
            </li>
            }
            {
            context.userContext.role === "ADMIN" &&
            <li className={styles.responsiveNavlinks}>
                <NavLink className={styles.mobileA} to="/store" >
                    <button className={styles.responsiveButtonLinks}>
                        <section> 
                            <WarehouseIcon></WarehouseIcon>
                            <h6 className={styles.responsiveHeaders}>Handle Store</h6>
                        </section>
                    </button>
                </NavLink>
            </li>
            }
            <li className={styles.responsiveNavlinks}>
                <NavLink className={styles.mobileA} to="/cartj">
                    <button className={styles.responsiveButtonLinks}>
                        <section>
                            <ShoppingCartIcon> </ShoppingCartIcon>
                            <h6 className={styles.responsiveHeaders}>Cart</h6>
                        </section>
                    </button>
                </NavLink>
            </li>
            <li className={styles.responsiveNavlinks}>
                <NavLink className={styles.mobileA} to="/account">
                    <button className={styles.responsiveButtonLinks}>
                        <section>
                            <PersonIcon></PersonIcon>
                            <h6 className={styles.responsiveHeaders}>Account</h6>
                        </section>
                    </button>
                </NavLink>
            </li>
        </ul>
    
    </nav>
    </>
    )
}

export default MobileNavBar