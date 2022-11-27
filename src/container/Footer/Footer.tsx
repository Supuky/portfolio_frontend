/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FC, useState } from 'react';

import { images } from '../../constants';
import { AppWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer: FC = () => {
  const [formData, setFormdata] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormdata({...formData, [name]: value})
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true)
    })
  }

  return (
    <>
      <h2 className='head-text'>
        Take a coffe & chat with me
      </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@micael.com" className='p-text'></a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +1 (123) 456-789" className='p-text'>+1 (123) 456-789</a>
        </div>
      </div>
      
        {
          !isFormSubmitted ? (
            <form onSubmit={handleSubmit} action="submit" className="app__footer-form app__flex">
            <div className="app__flex">
              <input type="text" className="p-text" placeholder='Your Name' value={name} onChange={(e) => handleChangeInput(e)} name='name' />
            </div>
            <div className="app__flex">
              <input type="email" className="p-text" placeholder='Your Email' value={email} onChange={(e) => handleChangeInput(e)} name='email' />
            </div>
            <div>
              <textarea 
                className='p-text'
                placeholder='Your Message'
                value={message}
                name='message'
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <button type='button' className='p-text' >
             {loading ? 'Sending' : 'Send Message'}
            </button>
          </form>
          ) : (
            <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
          )
          
        }
          
    </>
  )
}

export default AppWrap(Footer);