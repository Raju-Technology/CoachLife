import React, { memo } from 'react'

//Libraries
import { m } from "framer-motion";

//css
import "../../Assets/scss/components/_blockquote.scss"

const Blockquote = (props) => {
    return (
        <m.blockquote className={`${props.theme}${props.className ? ` ${props.className}` : ""}`} {...props.animation}>
            {props.icon && <i className={props.icon}></i>}
            {props.heading && <h5>{props.heading}</h5>}
            {props.title && <h6>{props.title}</h6>}
            {props.author && <span className="text-basecolor">{props.author}</span>}
        </m.blockquote>
    )
}

Blockquote.defaultProps = {
    author: "",
    theme: "blockquote-style-01",
    heading: "",
    title: "",
    icon: ""
}

export default memo(Blockquote)
