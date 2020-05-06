import React, { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const Menu = ({navLinks}) => {
    const [open, setOpen] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    return (
        <div>
            <nav
                className="navBar"
            >
            <figure onClick={ () => { setOpen(!open) }}>
                <p style={{ color: '#d7c692'}}>{open ? 'X Menu':'≡ Menu'}</p>
            </figure>
            <div className="socials">
                <a 
                href="https://www.linkedin.com/in/raymondchuu"
                target="_blank"
                rel="noopener noreferrer"
                className="socialicon"
                ><LinkedInIcon /></a>
                &emsp;
                <a 
                href="https://www.instagram.com/raymondchuu"
                target="_blank"
                rel="noopener noreferrer"
                className="socialicon"
                ><InstagramIcon /> </a>
                &emsp;
                <a 
                href="https://www.facebook.com/raymondchuu"
                target="_blank"
                rel="noopener noreferrer"
                className="socialicon"
                ><FacebookIcon /> </a>
                &emsp;
                <a 
                href="https://www.twitter.com/raymondchuu"
                target="_blank"
                rel="noopener noreferrer"
                className="socialicon"
                ><TwitterIcon /> </a>
            </div>  
                <ul
                    className={ open ? 'active' : ''}
                >
                
                    { navLinks.map((link, index) => 
                        <li
                            key={index}
                            onMouseEnter={() => { setHoverIndex(index) }}
                            onMouseLeave={() => { setHoverIndex(-1) }}
                        >
                            { link.path === ('/appointment' || '/') ? 
                                <a
                                href={link.path === '/appointment' ? '/appointment' : '' }
                                target={link.path === '/appointment' ? '_blank' : '' }
                                rel="noopener noreferrer"
                                onClick={ () => { setOpen(!open) } }
                                style={{ color: hoverIndex === index ? '#d7c692' : '#fff'}}
                                > { link.text } </a> : 

                                <Link
                                to={link.path === '/' ? '' : link.path}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={1000}
                                onClick={link.path === '/' ? () => { setOpen(!open); scrollToTop()} : () => { setOpen(!open) }}
                                style={{ color: hoverIndex === index ? '#d7c692' : '#fff'}}
                                ignoreCancelEvents={true}
                            > { link.text }
                            </Link>
                        }

                        </li>
                    )}
                    
                </ul>
            </nav>

        </div>
    );
}

export default Menu;