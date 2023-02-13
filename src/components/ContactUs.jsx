import React from 'react'
import styles from '../styles/ContactUs.module.scss'

function ContactUs() {
  return (
    <div className={styles.contactContainer}>
      <h2>Ready to connect whit me?</h2>
      {/* <div className={styles.imgfContainer}>
        <img src={require("../resources/logofood_k_queso.png")} className={styles.contactUsImg} alt='kruger-img' /> */}
        <form className={styles.formContainer}>
          <h4 >Let's connect</h4>
          <div className={styles.contatcInputForm}>
            <div className={styles.inputBox}>
              <input type="text" required='requiered' />
              <span>first name</span>
            </div>
            <div className={styles.inputBox}>
              <input type="text" required='requiered' />
              <span>last name</span>
            </div>
            <div className={styles.inputBox}>
              <input type="email" required='requiered' />
              <span>email</span>
            </div>
            <div className={styles.inputBox}>
            <textarea
              name="story"
              rows="5"
              cols="33"
            >
            </textarea>
            <span>tu mensaje</span>
            </div>
            <button>Get in Touch</button>
        </div>
        </form>
    </div>
  )
}

export default ContactUs

