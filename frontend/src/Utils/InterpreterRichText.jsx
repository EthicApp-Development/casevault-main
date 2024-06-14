import React from "react"

const InterpreterRichText = ({htmlContent}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>
    )
}

export default InterpreterRichText