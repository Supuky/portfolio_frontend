import React, { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';


type TESTIMONIAL = [{
  name: string,
  company: string,
  feedback: string,
  imgurl: SanityImageSource
}]

type BRANDS = [{
  name:string,
  imgUrl: SanityImageSource
}]

const Testimonial:FC = () => {
  const [brands, setBrands] = useState<BRANDS>();
  const [testimonials, setTestimonials] = useState<TESTIMONIAL>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    }) 
  }, []);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  }

  return (
    <>
      {testimonials?.length && (
        <> 
          <div className="app__testimonial-item app-flex">
            <img src={urlFor(testimonials[currentIndex].imgurl).toString()} alt={testimonials[currentIndex].name} />
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">
                  {testimonials[currentIndex].name}
                </h4>
                <h5 className="bold-text">
                  {testimonials[currentIndex].company}
                </h5>
              </div>
            </div>
          </div>
          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>
            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands?.map((brand, i) => (
          // console.log(brand)
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand.name}
          >
            <img src={urlFor(brand.imgUrl).toString()} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(Testimonial);