import React from 'react'
import ContactUs from '../components/ContactUs'

import {motion} from "framer-motion";
function ContactUsPage() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
    <ContactUs/>
    </motion.div>
  )
}

export default ContactUsPage