import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type ABOUT = [
  {
    title: string,
    description: string,
    imgUrl: SanityImageSource | string
  }
]

const About: FC = () => {
  const [abouts, setAbouts] = useState<ABOUT>();
  
  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setAbouts(data);
    });
  }, []);
  
  return (
    <>
      <div className='app__header app__flex'>
        <h2 className='head-text'>
          I Know That
          <span>Good Development</span>
          <br />
          mean
          <span>Good Business</span>
        </h2>

        <div className='app__profiles'>
          {abouts?.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className='app__profile-item'
              key={about?.title + index}
            >
              <img src={urlFor(about?.imgUrl).toString()} alt={about?.title} />
              <h2 className='bold-text' style={{ marginTop: 20 }}>
                {about?.title}
              </h2>
              <p className='p-text' style={{ marginTop: 10 }}>
                {about?.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About)
);