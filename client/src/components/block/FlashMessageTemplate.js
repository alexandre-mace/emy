import React from 'react'

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const FlashMessageTemplate = ({ style, options, message, close }) => (
    <div style={style} className="flashMessage">
        {options.type === 'info' && '! '}
        {options.type === 'success' && ':) '}
        {options.type === 'error' && ':( '}
        {message}
        <button onClick={close}>X</button>
    </div>
)

export default FlashMessageTemplate
