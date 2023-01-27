
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <header class= 'container-lg'>
            <h1>navbar</h1>
                <NavLink to="/"> Menu </NavLink>
                  <NavLink to="/ofertas">Ofertas</NavLink>
                <NavLink to="/about" >About us </NavLink>
                <NavLink to="/contact" >Contac Us </NavLink>
                {/* <NavLink  to="/birth">
              Busca tu imagen
            </NavLink> */}
        </header>
    )
}

export default NavBar