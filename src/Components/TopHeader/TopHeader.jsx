import React from 'react'
import './style.css'
function TopHeader(props) { {/* Welcome Component */}
    return (
        <>
            <div className="TopHeader">
                <div className="WelcomeBox">
                    <div className="WelcomeHeading">Welcome Shakirat</div>
                    <div className="WelcomeFooter">Upload your audio and Video to covert to text</div>
                </div>
                <button className="Transcribe" onClick={() => (props.onClick ? props.onClick() : "")}>Transcribe File</button>
            </div>
        </>
    )
}

export default TopHeader
