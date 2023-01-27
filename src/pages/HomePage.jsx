import React from 'react';
import Home from '../components/Home';
import {motion} from "framer-motion";

function HomePage() {

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
        <Home />
        </motion.div>
    )
}

export default HomePage