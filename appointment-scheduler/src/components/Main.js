import React from 'react';
import Carousel from './Carousel';
import Card from '@material-ui/core/Card';
import aboutImage from '../Media/aboutBarberImage.jpg';
import serviceImage from '../Media/servicesImage.jpg';
import Grid from '@material-ui/core/Grid';
import mapLocation from '../Media/maplocation.png';
import BusinessIcon from '@material-ui/icons/Business';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import '../css/Main.css';

const Main = () => {
    return (
        <div>
            <div className="homepage">
            <Carousel />
                <div className="container">
                    <h1 className="title">Ray Cuts</h1>
                    <p>A Gentleman's Barbershop</p>
                </div>
                <div className="button">
                    <a
                        className="bookButton"
                        href="/appointment"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Book an Appointment</a>
                </div >
            </div>

            <div className="about" id='about'>
                <Card variant="outlined">
                <Grid container spacing={3}>
                    <Grid item sm={6} style={{paddingRight: '100px', paddingTop: '50px', paddingLeft: '100px', paddingBottom: '30px'}}>
                        <h1>My Story</h1>
                        <p>In 2017, I realized that nobody was offering professional grooming experiences for a reasonable price.</p>
                        <p>As a self taught barber based in Toronto, I have been cutting hair for over three years.</p>
                        <p>What are you waiting for? Book an appointment now!</p>
                    </Grid>
                    <Grid item sm={6}>
                        <img src={ aboutImage } alt="barberimage" height="100%" width="100%"/>
                    </Grid>
                </Grid>
                </Card>
            </div>


            <div className="services" id='services'>
            <Card variant="outlined">
            <Grid container spacing={3}>
                <Grid item sm={6}>
                        <img src={ serviceImage } alt="service image" height="100%" width="100%"/>
                </Grid>
                <Grid item sm={6} style={{paddingLeft: '100px', paddingTop: '50px', paddingRight: '100px', paddingBottom: '50px'}}>
            
                    <h1>Services</h1>
                    <p>
                        <span className="serviceTitle">Ray's Signature Fade<br/></span>
                        <span className="serviceDescription">Skin fade with a blurry transition. Finished off with style.</span>
                    </p>
                    <p>
                        <span className="serviceTitle">Signature Haircut<br/></span>
                        <span className="serviceDescription">Detailed consultation, followed by a precision haircut, and finished off with style.</span>
                    </p>
                    <p>
                        <span className="serviceTitle">Head Shave<br/></span>
                        <span className="serviceDescription">Razor or shaver for full head shave, then applied with after-shave soother.</span>
                    </p>
                    <p>
                        <span className="serviceTitle">Line Up<br/></span>
                        <span className="serviceDescription">Razor sharp line up to have the cleanest corners.</span>
                    </p>
                </Grid>
            </Grid>
            </Card>

            </div>
            <div className="footer">
                <div className="footcontent">
                    <h1 style={{textAlign: "left"}}>Contact me:</h1>
                    <Grid container spacing={3}>
                        <Grid item sm={3} xs={6}>
                            <img className="location" 
                            src={ mapLocation } 
                            alt="my location" 
                            />
                        </Grid>
                        <Grid item sm={3} xs={3} style={{textAlign: "left", marginLeft: "150px"}}>
                            <p>
                                <BusinessIcon/> 4190 Finch Ave E, Scarborough, ON M1S 5C2<br/>
                                <MailOutlineIcon/> raymondchu1996@gmail.com<br/>
                                <PhoneIcon/> (647) 712 - 7226
                            </p>
                        </Grid>
                        <Grid item sm={3} xs={3} style={{marginLeft: "90px"}}>
                            <p>
                                Hours of Operations:
                            </p>
                            
                            <p>
                                Monday: 8am-5pm <br/>
                                Tuesday: 8am-5pm <br/>
                                Wednesday: 8am-5pm <br/>
                                Thursday: 8am-5pm <br/>
                                Friday: 8am-5pm <br/>
                            </p>
                        </Grid>
                    </Grid>
                    <p style={{textAlign: "right"}}>©Raymond Chu 2020 <br/>Designed by Raymond Chu</p><br/>
                </div>
            </div>
            
        </div>
    );
}

export default Main;