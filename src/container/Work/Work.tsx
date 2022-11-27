import React, { FC, useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type WORK = [
  {
    title: string,
    description: string,
    projectLink:string,
    codeLink:string,
    imgUrl: SanityImageSource | string,
    tags: [
      tag: string
    ]
  }
];

const Work:FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState<any>({ y: 0, opacity: 1 });
  const [works, setWorks] = useState<any>()
  const [filterWork, setFilterWork] = useState<WORK>();

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setWorks(data);
      setFilterWork(data);
    });
  }, [])


  const handleWorkFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string
    ) => {
    e.preventDefault();
    setActiveFilter(item);
    setAnimateCard([{y:100, opacity: 0}]);
      
    setTimeout(() => {
      setAnimateCard([{y:0, opacity: 1}]);
    }, 500); 

    if (item === 'All') {
      setFilterWork(works)
    } else {
      setFilterWork(works?.filter((work: any) => work.tags.includes(item)));
    }    
  }

  return (
    <>
      <h2 className='head-text'>
        My Creative 
        <span> Portfolio</span>
        <br />
        Section
      </h2>

      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <button 
            key={index}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleWorkFilter(e, item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </button>
          // 後でbutton要素に変える
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'
      >
        {filterWork?.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work?.imgUrl).toString()} alt={work?.title} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className='app__work-hover app__flex'
              >
                <a href={work?.projectLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work?.codeLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content">
              <h4 className="bold-text">{work?.title}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>{work?.description}</p>

              <div className='app__work-tag app__flex'>
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(Work)