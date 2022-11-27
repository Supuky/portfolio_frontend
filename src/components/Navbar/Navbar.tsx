import React, { FC, useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const Navbar:FC = () => {
    // rootからprppsで管理した方が良さそう
    const [toggle, setToggle] = useState(false)
  return (
    <nav className='app__navbar'>
        <div className='app__navbar__logo'>
            <img src={images.logo} alt='logo' />
        </div>
        {/* h1 maybe */}
        <ul className='app__navbar-links'>
            {
                ['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                    <li className='app__flex p-text' key={`link-${item}`}>
                        <div/>
                        <a href={`#${item}`}>{item}</a>
                    </li>
                ))
            }
        </ul>

        <div className='app__navbar-menu'>
            <HiMenuAlt4  onClick={() => setToggle(!toggle)}/> 
            {
                toggle && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.95, ease: 'easeOut' }}
                    >
                        <HiX onClick={() => setToggle(!toggle)}/>
                        <ul className='app__navbar-links'>
                            {
                                ['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                                    <li key={item}>
                                        <a href={`#${item}`} onClick={() => setToggle(!toggle)}>{item}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </motion.div>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar