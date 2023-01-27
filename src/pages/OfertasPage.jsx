import Ofertas from "../components/Ofertas";

import {motion} from "framer-motion";
import React from 'react'

function OfertasPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
    <Ofertas/>
    </motion.div>
  )
}

export default OfertasPage