import React from 'react'
import styles from '../styles/ContactUs.module.scss'

function ContactUs() {
  return (
    <div className={styles.contactContainer}>
        <h2>Ready to connect whit me?</h2>
        <form className={styles.formContainer}>
          <h4 >Let's connect</h4>
          <div className={styles.contatcInputForm}>
            <input type="text" placeholder="Name"  />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Adress" />
            <textarea 
              name="story"
              rows="5" 
              cols="33"
              placeholder='Enter text here ...'>
            </textarea>
            
            <button>Get in Touch</button>
          </div>
          <img src={require("../resources/logofood_k_queso.png")}  className={styles.contactUsImg} alt='kruger-img'/>
        </form>
    </div>
)
}

export default ContactUs

