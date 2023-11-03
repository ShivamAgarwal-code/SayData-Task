import React from "react";

import "./style.css";

function Dropdown(props) { {/* Dropdown component for notification bar This Component can be used anywhere dropdown is needed with the help of props */}
  return (
    <div
      className="dropdown"
    >
      <div className="dropdown-container">
      <div className="close"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"  onClick={() => (props.onClose ? props.onClose() : "")}>
                <path d="M7.55086 5.63616C7.16033 5.24563 6.52717 5.24563 6.13664 5.63616C5.74612 6.02668 5.74612 6.65984 6.13664 7.05037L11.0864 12.0001L6.13664 16.9499C5.74612 17.3404 5.74612 17.9736 6.13664 18.3641C6.52717 18.7546 7.16033 18.7546 7.55086 18.3641L12.5006 13.4143L17.4504 18.3641C17.8409 18.7546 18.474 18.7546 18.8646 18.3641C19.2551 17.9736 19.2551 17.3404 18.8646 16.9499L13.9148 12.0001L18.8646 7.05037C19.2551 6.65984 19.2551 6.02668 18.8646 5.63616C18.474 5.24563 17.8409 5.24563 17.4504 5.63616L12.5006 10.5859L7.55086 5.63616Z" fill="#232121" />
              </svg></div>
              <div className="Notification-Card-Container">
              {props.children}
              </div>
  
      </div>
    </div>
  );
}

export default Dropdown;
