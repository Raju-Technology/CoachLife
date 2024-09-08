import React, {useState} from "react"
import { Col, Container, Row, Navbar } from 'react-bootstrap'
import { m, AnimatePresence } from 'framer-motion';
import LoginCoverImage from "../Images/LoginCoverImage.png";
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

// Components
import Header, { HamburgerMenu, HeaderNav } from '../Components/Header/Header';
import ReactCustomScrollbar from "../Components/ReactCustomScrollbar"
import { fadeIn } from '../Functions/GlobalAnimations';
import { Checkbox, Input } from '../Components/Form/Form'
import Buttons from '../Components/Button/Buttons'
import MessageBox from '../Components/MessageBox/MessageBox'

// Images
import logo2 from "../Images/logo2.png"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

function CustomDateInput({ name, className, labelClass, placeholder }) {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <Input
                showErrorMsg={false}
                type="date"
                name={name}
                className={`${className} appearance-none`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ color: value || isFocused ? 'inherit' : 'transparent' }}
            />
            {!value && !isFocused && (
                <span className="absolute left-[20px] top-[15px]  text-[#999] pointer-events-none">
                    {placeholder}
                </span>
            )}
        </div>
    );
}

function UpdatePlayer(props) {
    console.log("playerUpdateId: ", props.playerUpdateId)

    const resetForm = (actions, recaptcha) => {
        if (actions) {
            actions.resetForm()
            actions.setStatus(true)
            actions.setSubmitting(false);
            setTimeout(() => actions.setStatus(false), 5000)
        }

        if (recaptcha) {
            recaptcha.current.reset();
            recaptcha.current.captcha.classList.remove("error");
        }
    }

    // const updatePlayerData = async (data) => {
    //     const req = await fetch("https://2w62whkj3h.execute-api.ap-south-1.amazonaws.com/CoachLife/player_update", {
    //         method: 'post',
    //         // headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data)
    //     }).then(res => res.json()).then(data => data)
    //     return await req
    // }

    const updatePlayerData = async (data) => {
        // Filter out null values from the data object
        const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== null && value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {});
    
        const req = await fetch("https://2w62whkj3h.execute-api.ap-south-1.amazonaws.com/CoachLife/player_update", {
            method: 'post',
            body: JSON.stringify(filteredData)
        }).then(res => res.json()).then(data => data);
    
        return req;
    }

    return (
        <div>
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
            <m.section className="py-[120px] lg:py-[120px] md:py-[75px] sm:py-[50px] xs:py-[80px] xxs:py-[50px]"  {...fadeIn}>
                <Container>
                    <Row>
                        <Col className='mb-[6%]'>
                            <h6 className="font-serif text-gray-500 text-center font-medium mb-[25px] lg:mb-[15px]">Player Update</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col>
                            <Formik
                                initialValues={{
                                    name: '', fatherName: '', motherName: '', dateOfBirth: '', terms_condition: false, bloodGroup: '', address: '',
                                    mobileNumber: '', alternativeMobile: '', age: '', dateOfJoining: '', standard: '', level: '', stage: '', primaryCoach: ''
                                }}
                                // validationSchema={ContactFormStyle03Schema}
                                onSubmit={async (values, actions) => {
                                    actions.setSubmitting(true)
                                    const playerData = {
                                        _id: props.playerUpdateId,
                                        playerName: values.name,
                                        fatherName: values.fatherName,
                                        motherName: values.motherName,
                                        dateOfBirth: values.dateOfBirth,
                                        bloodGroup: values.bloodGroup,
                                        address: values.address,
                                        phone: values.mobileNumber,
                                        alternativeNumber: values.alternativeMobile,
                                        age: values.age,
                                        dateOfJoining: values.dateOfJoining,
                                        standard: values.standard,
                                        level: values.level,
                                        stage: values.stage,
                                        primaryCoach: values.primaryCoach,
                                    }
                                    console.log(playerData)
                                    const response = await updatePlayerData(playerData)
                                    console.log("response", response)
                                    response.message === 'Document updated successfully.' && resetForm(actions)
                                }}
                            >
                                {({ isSubmitting, status }) => (
                                    <Form>
                                        <Row className="row-cols-1 row-cols-md-2">
                                            <Col className="mb-16 lg:mb-[25px] sm:mb-0">
                                                <Input showErrorMsg={false} type="text" name="name" className="py-[15px] px-[20px] text-md w-full border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Player Name" />
                                                <Input showErrorMsg={false} type="text" name="fatherName" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Father Name" />
                                                <Input showErrorMsg={false} type="text" name="motherName" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Mother Name" />
                                                <CustomDateInput showErrorMsg={false} name="dateOfBirth" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Select Date of Birth" />
                                                <Input showErrorMsg={false} type="text" name="bloodGroup" style={{marginTop:'25px'}} className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Blood group" />
                                                <Input showErrorMsg={false} type="text" name="address" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="address" />
                                                <Input showErrorMsg={false} type="tel" name="mobileNumber" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="sm:mb-[25px]" placeholder="Mobile number" />
                                            </Col>
                                            <Col className="mb-16 lg:mb-[25px]">
                                            <Input showErrorMsg={false} type="text" name="alternativeMobile"  className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Alternative Mobile Number" />
                                                <Input showErrorMsg={false} type="text" name="age" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Age" />
                                                <Input showErrorMsg={false} type="text" name="dateOfJoining" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Date of joining" />
                                                <Input showErrorMsg={false} type="text" name="standard" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Standard" />
                                                <Input showErrorMsg={false} type="text" name="level" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Level" />
                                                <Input showErrorMsg={false} type="text" name="stage" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Stage" />
                                                <Input showErrorMsg={false} type="text" name="primaryCoach" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Primary Coach" />
                                                {/* <Input showErrorMsg={false} type="text" name="dateOfRegistration" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Date of Registration" /> */}
                                            </Col>
                                            <Col className="text-left sm:mb-[20px]">
                                                <Checkbox type="checkbox" name="terms_condition" className="inline-block mt-[4px]" labelClass="flex items-start">
                                                    <span className="ml-[10px] text-sm w-[85%] md:w-[90%] xs:w-[85%]">I accept the terms & conditions and I understand that my data will be hold securely in accordance with the&nbsp;<Link to="/privacy" target="_blank" className="text-darkgray underline hover:text-fastblue">privacy policy</Link>.</span>
                                                </Checkbox>
                                            </Col>
                                            <Col className="text-right sm:text-center">
                                                <Buttons ariaLabel="form button" type="submit" className={`text-xs tracking-[1px] rounded-none py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""}`} themeColor={["#556fff", "#ff798e"]} size="md" color="#fff" title="Update Player" />
                                            </Col>
                                        </Row>
                                        <AnimatePresence>
                                            {status && <Row><Col xs={12}><m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="Player has been Updated Successfully!" /></m.div></Col></Row>}
                                        </AnimatePresence>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </m.section>
        </div>
    )
}

export default UpdatePlayer
