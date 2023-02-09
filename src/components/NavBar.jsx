
import { NavLink } from "react-router-dom";
import '../styles/NavBar.css'
// import PopUp from "./PopUp";
import MyContext from "../context/MyContext";
import { useContext } from "react";


function NavBar() {
  
  const context = useContext(MyContext)
  
  
  console.log(context.userContext.role)
  return (
    <header className="headerContainer">
      <ul className="logoNavbarContainer">
        <li className="navlinks"><img src={require('../resources/logofood_transparente.png')} alt="logo comida  " className='logoNavbar'/></li>
      </ul>
      <ul className="ulContainer">
        <li className="navlinks"><NavLink to="/"><button className="buttonLinks"> Menu </button></NavLink></li>
        <li className="navlinks"><NavLink to="/ofertas"><button className="buttonLinks">Ofertas</button></NavLink></li>
        <li className="navlinks"><NavLink to="/about" ><button className="buttonLinks">About us </button></NavLink></li>
        <li className="navlinks"><NavLink to="/contact" ><button className="buttonLinks">Contact Us </button></NavLink></li>
        <li className="navlinks"><NavLink to="/cartj" ><button className="buttonLinks">cartj </button></NavLink></li>
        
        { context.userContext.role === "ADMIN" &&
          <li className="navlinks"><NavLink to="/product" ><button className="buttonLinks">Add Product</button></NavLink></li>}
          {
            context.userContext.role === "ADMIN" &&
            <li className="navlinks"><NavLink to="/stats" ><button className="buttonLinks">Stats</button></NavLink></li>
          }
      </ul>
      <ul className="ulContainer">
        <li className="navlinks"><NavLink to="/cart"><i className="fa-solid fa-cart-shopping"> </i></NavLink></li>
          {/* <PopUp/>  */}
        <li className="navlinks"><NavLink to="/account"><i className="fa-solid fa-user"></i></NavLink></li>
      </ul>
    </header>
  )
}

export default NavBar