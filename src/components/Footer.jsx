import React from 'react'
import '../styles/Footer.css'



function Footer() {
  return (
    <footer className='footerContainer'>
      <ul className='ulFooter'>
        <li className='liFooter'><img src={require('../resources/github-mark-white.png')}  className="githubLogo" alt="gatito"/></li>
        <li className='liFooter'><p>Copyright© 2022 Kruger Star- Todos los derechos reservados</p></li>
      </ul>
    
    </footer>
  )
}

export default Footer