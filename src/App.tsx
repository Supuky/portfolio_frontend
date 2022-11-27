import React, { FC } from 'react';

import { About, Footer, Header, Skills, Testimonial, Work } from './container';
import { Navbar } from './components';

import './App.scss';

const App: FC = () => {
  return (
    <div className='app'>
      <Navbar />
      <Header idName='home'  />
      <About idName='about' classNames='app__whitebg'/>
      <Work idName='work' classNames='app__primarybg'/>
      <Skills idName='skills' classNames='app__whitebg'/>
      <Testimonial idName='testimonial' classNames='app__primarybg' />
      <Footer idName='contact' classNames='app__whitebg'/>
    </div>
  )
}

export default App