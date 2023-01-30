import React from 'react'

function ContactUs() {
  return (
    <div >
        <h2>Ready to connect whit me?</h2>
        <form >
          <h4 >Let's connect</h4>
          <div >
            <input type="text" placeholder="Name" />
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
        </form>
    </div>
)
}

export default ContactUs

