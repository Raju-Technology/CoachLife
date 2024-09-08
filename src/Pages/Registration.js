import React, {useState, useEffect} from "react";
import { Form, Input, Button, message } from "antd";
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax'
import LoginCoverImage from "../Images/LoginCoverImage.png";
import logo2 from "../Images/logo2.png"

//Components
import Header, { HamburgerMenu, HeaderNav } from '../Components/Header/Header';
import ReactCustomScrollbar from "../Components/ReactCustomScrollbar"
import { TextAnime } from "../Components/FancyText/FancyText";
import SocialIcons from "../Components/SocialIcon/SocialIcons";


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

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function encryptPassword(password, shift) {
  let encryptedPassword = '';
  for (let i = 0; i < password.length; i++) {
    const charCode = password.charCodeAt(i);
    const shiftedCharCode = charCode + shift;
    encryptedPassword += String.fromCharCode(shiftedCharCode);
  }
  return encryptedPassword;
}

function Registration(props) {
  const [formWidth, setFormWidth] = useState(window.innerWidth > 600 ? '300px' : '200px');

  useEffect(() => {
    const handleResize = () => {
      setFormWidth(window.innerWidth > 600 ? '300px' : '200px');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const [form] = Form.useForm(); // Create a form instance

  const onFinish = async (values) => {
    console.log("Success:", values);

    // Encrypt the password
    const encryptedPassword = encryptPassword(values.password, 3); // Use your desired shift value
    console.log("Encrypted Password:", encryptedPassword);

    // Prepare the payload
    const payload = {
      user_name: values.username,
      coach_name: values.name,
      password: encryptedPassword,
    };

    try {
      const response = await fetch("https://0mbf4u3ja5.execute-api.ap-south-1.amazonaws.com/CoachLife/Registration", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        message.success("Registration successful!");
        form.resetFields(); // Reset the form fields
        navigate("/");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundImage: `url(${LoginCoverImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
    //   <div style={{ width: '300px', marginRight: '850px', borderRadius: '5px', marginTop: '150px' }}>
    //     <h1 style={{ color: 'white', fontSize: '38px' }}>Registration</h1>
    //     <Form
    //       {...layout}
    //       form={form} // Assign the form instance to the Form component
    //       name="basic"
    //       initialValues={{
    //         remember: true,
    //       }}
    //       onFinish={onFinish}
    //       onFinishFailed={onFinishFailed}
    //     >
    //       <Form.Item
    //         name="name"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please input your name!",
    //           },
    //         ]}
    //       >
    //         <Input placeholder="Name" style={{ width: '300px' }} />
    //       </Form.Item>

    //       <Form.Item
    //         name="username"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please input your username!",
    //           },
    //         ]}
    //       >
    //         <Input placeholder="Username" style={{ width: '300px' }} />
    //       </Form.Item>

    //       <Form.Item
    //         name="password"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please input your password!",
    //           },
    //         ]}
    //       >
    //         <Input.Password placeholder="Password" style={{ width: '300px' }} />
    //       </Form.Item>

    //       <Form.Item {...tailLayout}>
    //         <Button type="primary" htmlType="submit" style={{ background: '#0294CF', border: 'none' }}>
    //           Register
    //         </Button>
    //       </Form.Item>
    //     </Form>
    //   </div>
    // </div>
    <div style={props.style}>
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
                              <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/">home</Link></li>
                              <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/page/about-me">about</Link></li>
                              <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/page/our-services">services</Link></li>
                              <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/portfolio/portfolio-colorful-metro">portfolio</Link></li>
                              <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/blogs/blog-grid">blog</Link></li>
                              <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/page/contact-modern">contact</Link></li>
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
          <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[100vh] md:h-[650px] !bg-[50%_0] lg:bg-[right_-230px_center] md:bg-right sm:top-0 sm:bg-[right_-350px_center] landscape:bg-right" translateY={[-20, 20]} style={{ backgroundImage: `url(${LoginCoverImage})` }}></Parallax>
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
                <h1 style={{ color: 'white', fontSize: '38px' }}>Registration</h1>
                <div style={{ width: formWidth, borderRadius: '5px'}}>
                  <Form
                    {...layout}
                    form={form} // Assign the form instance to the Form component
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input placeholder="Name" style={{ width: '200px' }} />
                    </Form.Item>

                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Username" style={{ width: '200px' }} />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Password" style={{ width: '200px' }} />
                    </Form.Item>

                    <Form.Item style={{textAlign:'right'}}>
                      <Button type="primary" htmlType="submit" style={{ background: '#0294CF', border: 'none' }}>
                        Register
                      </Button>
                    </Form.Item>

                  </Form>
                </div>
                              
                <div className="left-[15px] absolute bottom-[80px] sm:bottom-[50px] md:bottom-[30px] landscape:md:bottom-0">
                  <SocialIcons theme="social-icon-style-12" className="justify-start" size="md" iconColor="data" data={SocialIconsData} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </div>
  );
}

export default Registration;
