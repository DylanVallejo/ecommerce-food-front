
import { NavLink } from "react-router-dom";
// import '../styles/NavBar.css'
// import PopUp from "./PopUp";
import MyContext from "../context/MyContext";
import { useContext } from "react";
// import Container from '@mui/material/Container';
import styles from "../styles/NavBar.module.scss";
// import styles from "../styles/Login.module.scss";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import HomeIcon from '@mui/icons-material/Home';
// import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// import GroupIcon from '@mui/icons-material/Group';
// import Email from '@mui/icons-material/Email';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import AddBusinessIcon from '@mui/icons-material/AddBusiness';
// import WarehouseIcon from '@mui/icons-material/Warehouse';




function NavBar() {
  
  const context = useContext(MyContext)
  
  
  console.log(context.userContext.role)
  return (
    // <Container maxWidth="xl">
    <>
    <header className={styles.headerContainer}>
      <ul className={styles.logoNavbarContainer}>
        <li className={styles.navlinks}><img src={require('../resources/logofood_k_queso.png')} alt="logo comida  " className={styles.logoNavbar}/></li>
      </ul>
      <ul className={styles.ulContainer}>
        <li className={styles.navlinks}><NavLink to="/"><button className={styles.buttonLinks}> Menu </button></NavLink></li>
        <li className={styles.navlinks}><NavLink to="/ofertas"><button className={styles.buttonLinks}>Ofertas</button></NavLink></li>
        <li className={styles.navlinks}><NavLink to="/about" ><button className={styles.buttonLinks}>About us </button></NavLink></li>
        <li className={styles.navlinks}><NavLink to="/contact" ><button className={styles.buttonLinks}>Contact Us </button></NavLink></li>
        {/* <li className="navlinks"><NavLink to="/cartj" ><button className="buttonLinks">cartj </button></NavLink></li> */}
        
        { context.userContext.role === "ADMIN" &&
          <li className={styles.navlinks}><NavLink to="/agregar" ><button className={styles.buttonLinks}>Add Product</button></NavLink></li>
        }
        {
          context.userContext.role === "ADMIN" &&
          <li className={styles.navlinks}><NavLink to="/stats" ><button className={styles.buttonLinks}>Stats</button></NavLink></li>
        }
        {
          context.userContext.role === "ADMIN" &&
          <li className={styles.navlinks}><NavLink to="/store" ><button className={styles.buttonLinks}>Handle Store</button></NavLink></li>
        }
      </ul>
      <ul className={styles.ulContainer}>
        <li className={styles.navlinks}><NavLink to="/cartj"><ShoppingCartIcon> </ShoppingCartIcon></NavLink></li>
          {/* <PopUp/>  */}
        <li className={styles.navlinks}><NavLink to="/account"><PersonIcon></PersonIcon></NavLink></li>
      </ul>
    </header>
    </>
    
  )
}

export default NavBar