import React from 'react'
import {motion} from "framer-motion";
import CategoryForm from '../components/CategoryForm';


function CategoryFomrPage() {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
            <CategoryForm/>
        </motion.div>
        
    )
}

export default CategoryFomrPage;
