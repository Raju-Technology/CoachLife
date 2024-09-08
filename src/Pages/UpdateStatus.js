import React, { useState, useEffect } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { color, m } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "./SelectPlayer.css"; // Import your CSS file
import { Select, message } from 'antd';

//Components
import { fadeIn, fadeInLeft } from '../Functions/GlobalAnimations';
import Header, { HamburgerMenu, HeaderNav } from '../Components/Header/Header';
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import SocialIcons from "../Components/SocialIcon/SocialIcons"
import ReactCustomScrollbar from "../Components/ReactCustomScrollbar"
import { Footer } from "../Components/Footers/Footer"
import { TextAnime } from "../Components/FancyText/FancyText"
import SideButtons from "../Components/SideButtons"
import Blockquote from "../Components/Blockquote/Blockquote"

//Data
import { ProgressBarData01 } from "../Components/ProgressBar/ProgressBarData"

//Images
import RoboticsCoverImage from "../Images/RoboticsCoverImage.png"
import logo2 from "../Images/logo2.png"

const SocialIconsData = [
    {
      link: "https://www.facebook.com/",
      icon: "fab fa-facebook-f"
    },
    {
      link: "https://dribbble.com/",
      icon: "fab fa-dribbble"
    },
    {
      link: "https://twitter.com/",
      icon: "fab fa-twitter"
    },
    {
      link: "https://www.instagram.com/",
      icon: "fab fa-instagram"
    }
  ]

function UpdateStatus(props) {

    console.log(props.playerUpdateId)
    const { Option } = Select;
    const [status, setStatus] = useState(null);

    const handleChange = async (value) => {
        setStatus(value);
    
        try {
          const response = await fetch('https://bx02rwe3rd.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_active_update', {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ 
                player_id: props.playerUpdateId,
                status: value
             })
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('API response:', result);
          message.success('Status updated successfully via API!');
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          message.error('Failed to update status via API.');
        }
      };


    return (
        <div style={props.style}>
            <SideButtons />
            <Header className="absolute top-0 left-0 w-full z-10 md:bg-white header-personalportfolio">
                <HeaderNav fluid="fluid" theme="light" className="h-[100px] md:h-[70px] mr-[50px] ml-[35px] md:mx-[15px]" containerClass="md:px-0">
                    <Col lg={2} sm={6} className="col-auto ps-lg-0 me-auto md:!px-0">
                    <Link aria-label="link for" className="flex items-center" to="/">
                        <Navbar.Brand className="inline-block p-0 m-0">
                        <img className="default-logo" width="111" height="36" loading="lazy" src={logo2} alt='logo' />
                        <img className="alt-logo" width="111" height="36" loading="lazy" src={logo2}  alt='logo' />
                        <img className="mobile-logo" width="111" height="36" loading="lazy" src={logo2} alt='logo' />
                        </Navbar.Brand>
                    </Link>
                    </Col>
                    <Col className="col-auto text-end px-0">
                    <HamburgerMenu theme="light" className="w-[25%] xl:w-[40%] lg:w-[45%] md:w-[50%] sm:w-full">
                        <Row className="h-full mx-0">
                        <Col lg={12} className="p-0">
                            <Row className="h-[100vh] p-28 xs:p-12 mx-0 items-center justify-center bg-black">
                            <Col xs={12} className="hamburgermenu-modern-page text-left h-full max-h-[calc(65vh-100px)] flex-1 px-0">
                                <ReactCustomScrollbar className="h-full flex justify-center" autoHide>
                                <div>
                                  <ul className="font-serif w-full flex flex-col justify-center h-full">
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/">Login</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/registration">Registration</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/select-player">Select Player</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/update-player">Player Update</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/create-player">Create Player</Link></li>
                                  </ul>
                                </div>
                                </ReactCustomScrollbar>
                            </Col>
                            <Col className="col-12 text-left none md:block sm:hidden px-0">
                                {/* <div className="font-serif mt-[50px]">
                                <span className="mb-[10px] font-light text-xlg inline-block">Let's work together?</span>
                                <h2 className="heading-6 mb-0"><a aria-label="gmail" href="mailto:info@domain.com" className="text-[#ffeb04] border-b border-[#ffeb04] hover:text-white hover:border-white">info@domain.com</a></h2>
                                </div> */}
                            </Col>
                            </Row>
                        </Col>
                        </Row>
                    </HamburgerMenu>
                    </Col>
                </HeaderNav>
            </Header>
            <div className="md:flex md:items-center overflow-hidden relative h-[100vh] landscape:md:h-[600px]">
                <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[100vh] md:h-[650px] !bg-[50%_0] lg:bg-[right_-230px_center] md:bg-right sm:top-0 sm:bg-[right_-350px_center] landscape:bg-right" translateY={[-20, 20]} style={{ backgroundImage: `url(${RoboticsCoverImage})` }}></Parallax>
                <Container>
                    <Row className="full-screen md:h-[520px] sm:h-[100vh]">
                    <Col xl={5} md={5} className="relative flex flex-col justify-center">
                        {/* <h2 className="font-serif font-light -tracking-[2px] text-darkgray uppercase mb-[15px]">Hello,  i am</h2>
                        <div className="font-serif cd-headline push">
                        <h3 className="heading-5 mb-0 text-darkgray font-serif">
                            <TextAnime color="#232323" duration={3000} className="font-bold text-darkgray uppercase text-[60px] leading-[75px] -tracking-[5px] sm:-tracking-[.5px] lg:text-[90px] lg:leading-[80px] md:text-[70px] md:leading-[60px] sm:text-[30px] sm:leading-[28px]" animation="push" data={["Mechanical", "Machine", "Technological"]} />
                        </h3>
                        <h4 className="heading-5 mb-0 text-darkgray font-serif">
                            <TextAnime color="#232323" duration={3000} className="font-bold text-darkgray uppercase text-[60px] leading-[75px] -tracking-[5px] sm:-tracking-[.5px] lg:text-[90px] lg:leading-[80px] md:text-[70px] md:leading-[60px] sm:text-[30px] sm:leading-[28px]" animation="push" data={["Companion", "Mate", "Buddy"]} />
                        </h4>
                        </div> */}
                        <div>
                            <h5>Change the Status of the Player</h5>
                            <Select
                                placeholder="Select status"
                                onChange={handleChange}
                                style={{ width: 200 }}
                                >
                                <Option value="active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                            </Select>
                        </div>
                        <div className="left-[15px] absolute bottom-[100px] sm:bottom-[50px] md:bottom-[30px] landscape:md:bottom-0">
                            <SocialIcons theme="social-icon-style-12" className="justify-start" size="md" iconColor="dark" data={SocialIconsData} />
                        </div>
                    </Col>
                    </Row>
                </Container>
            </div>

             {/* <div style={{backgroundImage:`url(${RoboticsCoverImage})`, backgroundSize:'cover', minHeight:'100vh', maxWidth:'100%', position:'relative'}}>
               
             </div> */}

            {/* <div className="select-container">
                <h1 className="select-label">Select the Player from the list of Players</h1>
                <select className="select-dropdown" value={selectedPlayer} onChange={handlePlayerChange}>
                    <option value="">Select a Player</option>
                    {players && players.map((player, index) => (
                        <option key={index} value={player.playerId} className="select-option">{player.playerName}</option>
                    ))}
                </select>
            </div> */}

            {/* <section className="py-[160px] overflow-hidden bg-[#ffeb04] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{marginTop:"40px", backgroundColor:"yellow", padding:"50px", color:'black'}} >
              <Container>
                <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                  <Col className="col-lg-5 md:mb-20 sm:mb-16">
                    <h2 className="heading-6 font-serif text-darkgray mb-0 leading-[40px] sm:leading-[26px]">Provide <span className="font-semibold"> top gadgets, methodologies, and mechanisms </span> for a fun learning experience, introducing technical concepts gradually in a playful manner.</h2>
                  </Col>
                  <Col lg={{ span: 6, offset: 1 }}>
                    <ProgressBar theme="progressbar-style-01" data={ProgressBarData01} trailColor="transparent" height="4px" color="#232323" animation={fadeIn} />
                  </Col>
                </m.div>
              </Container>
            </section>

            <Footer className="bg-[#ffeb04] py-20" theme="light" style={{ backgroundColor:"yellow", padding:"50px", color:"black"}} >
                <Container>
                  <Row>
                    <Col lg={4} className="justify-start md:justify-center md:mb-[20px] flex items-center">
                      <span className="font-serif font-semibold text-sm uppercase text-darkgray">Call us today! +91 7448427243</span>
                    </Col>
                    <Col lg={4} className="text-center md:mb-[20px]">
                      <SocialIcons theme="social-icon-style-12" iconColor="dark" size="md" data={SocialIconsData} />
                    </Col>
                    <Col lg={4} className="text-right justify-end md:justify-center md:text-center flex items-center">
                      <p className="font-serif font-semibold text-sm uppercase text-darkgray leading-[30px]">Copyright © 2022 - TechnologyGarage</p>
                    </Col>
                  </Row>
                </Container>
            </Footer> */}

        </div>
    );
}

export default UpdateStatus;
