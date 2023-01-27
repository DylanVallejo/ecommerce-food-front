import React from 'react';
import Home from '../components/Home';
import {motion} from "framer-motion";

function HomePage() {

    return (
        <motion.div initial={{width:0, opacity:0}} animate={{width:"100%", opacity:1}} exit={{x:window.innerWidth, opacity: 0}}>
        <Home />
        </motion.div>
    )
}

export default HomePage