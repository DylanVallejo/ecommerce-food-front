import Detalle from "../components/Detalle";

import React from 'react'
import {motion} from "framer-motion";

function DetallePage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
    <Detalle/>
    </motion.div>
  )
}

export default DetallePage