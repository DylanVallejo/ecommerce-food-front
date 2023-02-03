import React from 'react'
import "../styles/ContactUs.css"

function ContactUs() {
  return (
    <div className='contactContainer'>
        <h2>Ready to connect whit me?</h2>
        <form className='formContainer'>
          <h4 >Let's connect</h4>
          <div >
            <input type="text" placeholder="Name" className='contatcInputForm' />
            <input type="text" placeholder="Last Name" className='contatcInputForm'/>
            <input type="email" placeholder="Email Adress" className='contatcInputForm'/>
            <textarea 
              className='contatcInputForm'
              name="story"
              rows="5" 
              cols="33"
              placeholder='Enter text here ...'>
            </textarea>
            
            <button>Get in Touch</button>
          </div>
          <img src={require("../resources/logofood_k_queso.png")}  className="contactUsImg" alt='kruger-img'/>
        </form>
    </div>
)
}

export default ContactUs

