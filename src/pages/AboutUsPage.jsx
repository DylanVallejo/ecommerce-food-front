import AboutUs from "../components/AboutUs";

import React from 'react'
import {motion} from "framer-motion";


function AboutUsPage() {
  return (
    <motion.div className="aboutusContainer" initial={{x:+100, opacity:.5}} animate={{x:0, opacity:1}} exit={{x:-100, opacity: 0}}>
    <AboutUs/>
    </motion.div>
  )
}

export default AboutUsPage