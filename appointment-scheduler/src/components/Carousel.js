import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import '../css/Carousel.css';

const slides = [
    {
        id: 0,
        url: '0Jw6Hkp/Homepage1.png'
    },
    {
        id: 1,
        url: 'wdqt3tJ/Homepage2.jpg'
    },
    {
        id: 2,
        url: '3sNcxKx/Homepage3.jpg'
    }
];

const Carousel = () => {
    const [index, setIndex] = useState(0)
    const transitions = useTransition(slides[index], item => item.id, {
        from: { opacity: 0 }, 
        enter: { opacity: 1 }, 
        leave: { opacity: 0 },
        config: config.molasses,
    })
    useEffect(() => void setInterval(() => setIndex(state => (state + 1) % 3), 6000), [])
    return (
      transitions.map(({ item, props, key }) => (
        <animated.div
            key={key}
            className="bg"
            style={{ ...props, backgroundImage: `url(https://i.ibb.co/${item.url})` }}
        />
      ))
    );
}

export default Carousel 