
import { NavLink } from "react-router-dom";
import '../styles/NavBar.css'

function NavBar() {
    return (
        <header className="headerContainer">
          <ul>
            <li className="navlinks"><img src={require('../resources/logofood_transparente.png')} className='logoNavbar'/></li>
          </ul>
          <ul className="ulContainer">
            <li className="navlinks"><button className="buttonLinks"><NavLink to="/"> Menu </NavLink></button></li>
            <li className="navlinks"><button className="buttonLinks"><NavLink to="/ofertas">Ofertas</NavLink></button></li>
            <li className="navlinks"><button className="buttonLinks"><NavLink to="/about" >About us </NavLink></button></li>
            <li className="navlinks"><button className="buttonLinks"><NavLink to="/contact" >Contact Us </NavLink></button></li>
          </ul>
        </header>
    )
}

export default NavBar