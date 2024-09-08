import React, { useState, useEffect } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { AutoComplete, Input } from 'antd'; // Import AntD components
import "./SelectPlayer.css"; // Import your CSS file

// Components
import Header, { HamburgerMenu, HeaderNav } from '../Components/Header/Header';
import SocialIcons from "../Components/SocialIcon/SocialIcons"
import ReactCustomScrollbar from "../Components/ReactCustomScrollbar"
import SideButtons from "../Components/SideButtons"

// Images
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
];

function SelectPlayer(props) {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [options, setOptions] = useState([]); // For AutoComplete
    const navigate = useNavigate();
    const url = "https://4asvstmf02.execute-api.ap-south-1.amazonaws.com/CoachLife/Playerlist";

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlayers(data);

                // Map players to options for AutoComplete
                setOptions(data.map(player => ({
                    value: player._id,
                    label: player.playerName
                })));
            } catch (error) {
                console.error('Error fetching Player data:', error);
            }
        };

        fetchPlayers();
    }, []);

    const handleSearch = (searchText) => {
        // Optionally filter players on search
        const filteredPlayers = players.filter(player =>
            player.playerName.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptions(filteredPlayers.map(player => ({
            value: player._id,
            label: player.playerName
        })));
    };

    const handlePlayerChange = (value) => {
        const selectedPlayerData = players.find(player => player._id === value);
        setSelectedPlayer(value);

        // Navigate to the dashboard when a player is selected
        navigate("/dashboard", { state: selectedPlayerData });
        props.setPlayerUpdateId(selectedPlayerData._id);
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
                                <img className="alt-logo" width="111" height="36" loading="lazy" src={logo2} alt='logo' />
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
                                                        <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/leader-board">LeaderBoard</Link></li>
                                                    </ul>
                                                </div>
                                            </ReactCustomScrollbar>
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
                            <div>
                                <h1 className="select-label">Select the Player from the list of Players</h1>
                                <AutoComplete
                                    options={options}
                                    style={{ width: 300 }}
                                    onSearch={handleSearch}
                                    onSelect={handlePlayerChange}
                                    placeholder="Select a Player"
                                    filterOption={false}
                                >
                                    <Input />
                                </AutoComplete>
                            </div>
                            <div className="left-[15px] absolute bottom-[100px] sm:bottom-[50px] md:bottom-[30px] landscape:md:bottom-0">
                                <SocialIcons theme="social-icon-style-12" className="justify-start" size="md" iconColor="dark" data={SocialIconsData} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default SelectPlayer;
