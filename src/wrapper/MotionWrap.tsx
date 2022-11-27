import React, { FC } from 'react';
import { motion } from 'framer-motion';

type PROPS = {
    className?: String
}

const MotionWrap = (Component: FC<any>) => (props: PROPS) => {
    return (
        <motion.div
        whileInView={{y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={`${props.className} app__flex` }
        >
            <Component/>
        </motion.div>
    )
}

export default MotionWrap;