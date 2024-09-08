import React, { memo, useState } from 'react'

// Libraries
import { Alert } from 'react-bootstrap'
import { PropTypes } from "prop-types"

const MessageBox = (props) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert className={`${props.theme}${props.className ? ` ${props.className}` : ""}`} variant={props.variant} onClose={() => setShow(false)} dismissible={props.dismissible}>
        {props.message}
      </Alert>
    );
  }
}

MessageBox.defaultProps = {
  className: "",
  theme: "message-box01",
}

export default MessageBox