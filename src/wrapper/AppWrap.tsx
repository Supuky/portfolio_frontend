import React, { FC } from 'react';
import { NavigationDots, SocialMedia } from '../components'

type PROPS = {
  // Component: any,
  idName?: string,
  classNames?: string 
}

const AppWrap = (Component: FC<any>) => (props: PROPS) => {
  return (
    <div id={props.idName} className={`app__container ${props.classNames}`}>
      <SocialMedia  />

    <div className='app__wrapper app__flex'>
      <Component />

      <div className="copyright">
        <p className='p-text'>@2022 S&H</p>
        <p className="p-text">All rights reserved</p>
      </div>
    </div>
      <NavigationDots active={props.idName}/> 
    </div>
  )
}

export default AppWrap;