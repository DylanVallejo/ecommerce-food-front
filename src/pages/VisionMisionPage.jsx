import React from 'react'
import {motion} from "framer-motion";
import VisionMision from '../components/VisionMision';

function VisionMisionPage() {
  return (
    <motion.div initial={{x:+100, opacity:.5}} animate={{x:0, opacity:1}} exit={{x:-100, opacity: 0}}>
    <VisionMision />
    </motion.div>
  )
}

export default VisionMisionPage