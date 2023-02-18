import Ofertas from "../components/Ofertas";

import {motion} from "framer-motion";
import React from 'react'

function OfertasPage() {
  return (
    <motion.div initial={{width:0, opacity:0}} animate={{width:"100%", opacity:1}} exit={{x:window.innerWidth, opacity: 0}}>
    <Ofertas/>
    </motion.div>
  )
}

export default OfertasPage