import React, { memo } from 'react'

// Libraries
import { m } from "framer-motion"

//Data
import { SocialIconsData01 } from './SocialIconsData'

// css
import "../../Assets/scss/components/_socialicons.scss"

const SocialIcons = (props) => {
    return (
        <ul className={`social-icon flex-wrap gap-y-5 p-0 ${props.theme} ${props.size} ${props.iconColor} ${props.className}`}>
            {
                props.data.map((item, i) => {
                    return (
                        props.theme !== "social-icon-style-11" ? (
                            <m.li key={i} style={{ "--social-icon-color": item.color ? item.color : "#000" }} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                                <a href={item.link} aria-label="social icon" target="_blank" rel="noreferrer">
                                    {item.name && <span className='flex brand-label'>{item.name ? item.name : "icon"}</span>}
                                    {item.icon && <i className={`${item.icon} brand-icon`}></i>}
                                    <span></span>
                                </a>
                            </m.li>
                        ) : (
                            <m.li key={i} style={{ "--social-icon-color": item.color ? item.color : "#000" }} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                                <a href={item.link} aria-label="social icon" target="_blank" rel="noreferrer">
                                    {item.socialback && <div className='social-back'><span>{item.socialback}</span></div>}
                                    <div className={`${item.position} social-front grid`}>
                                        {item.icon && <i className={item.icon}></i>}
                                        {item.name && <span>{item.name ? item.name : "icon"}</span>}
                                    </div>
                                </a>
                            </m.li>
                        )
                    )
                })
            }
        </ul>
    )
}

SocialIcons.defaultProps = {
    data: SocialIconsData01,
    theme: "social-icon-style-01",
    size: "lg",
    iconColor: "light",
    className: "justify-center",
    animationDelay: 0.2
}

export default memo(SocialIcons)
