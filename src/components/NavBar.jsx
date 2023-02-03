
import { NavLink } from "react-router-dom";
import '../styles/NavBar.css'

function NavBar() {
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
      </ul>
      <ul className="ulContainer">
        <li className="navlinks"><NavLink to="/"><i className="fa-solid fa-cart-shopping"></i></NavLink></li>
        <li className="navlinks"><NavLink to="/"><i className="fa-solid fa-user"></i></NavLink></li>
      </ul>
    </header>
  )
}

export default NavBar