import AboutUs from "../components/AboutUs";

import React from 'react'
import {motion} from "framer-motion";

function AboutUsPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
    <AboutUs/>
    </motion.div>
  )
}

export default AboutUsPage